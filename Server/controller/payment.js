
import fetch from 'node-fetch';

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

    const { customer, amount, currency } = result.data;

    // SUCCESS – NO DB UPDATE HERE
    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully.',
      data: {
        email: customer.email,
        amount: amount / 100,
        currency,
        reference,
      },
    });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during verification.',
    });
  }
};