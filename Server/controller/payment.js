
import fetch from 'node-fetch';
import { supabase } from '../utils/supabaseClient.js';

export const verifyPaystack = async (req, res) => {
  const { reference } = req.params;

  console.log('Verifying Paystack reference:', reference);

  if (!reference || !/^[a-zA-Z0-9_-]+$/.test(reference)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or missing reference.',
    });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log('Paystack response:', result);

    if (!response.ok || !result.status || result.data.status !== 'success') {
      return res.status(400).json({
        success: false,
        message: result.data?.gateway_response || 'Payment failed',
      });
    }

    const { data } = result;

    // SAVE TO SUPABASE with FIXED column names
    const { error: dbError } = await supabase
      .from('transactions')
      .upsert(
        {
          reference: data.reference,
          email: data.customer.email,
          amount: data.amount,
          currency: data.currency,
          status: data.status,
          gateway_response: data.gateway_response,
          paid_at: data.paid_at,
          metadata: data.metadata,
          customer_data: data.customer,           // ← FIXED
          authorization_data: data.authorization, // ← FIXED
        },
        { onConflict: 'reference' }
      );

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to save transaction.',
      });
    }

    console.log('Transaction saved successfully'); // Debug

    return res.status(200).json({
      success: true,
      message: 'Payment verified and saved.',
      data: {
        reference: data.reference,
        email: data.customer.email,
        amount: data.amount / 100,
        currency: data.currency,
      },
    });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error.',
    });
  }
};