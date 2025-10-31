import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import './PaystackPayment.css'; // Assuming you have a CSS file for styling
const PaystackPayment = ({ amount, email, reference, onSuccess, onClose }) => {
    const config = {
        reference,
        email,
        amount: amount * 100, // Paystack uses kobo
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_...', // Use env
    };

    const initializePayment = usePaystackPayment(config);

    const handlePay = () => {
        initializePayment({
            onSuccess: (response) => {
                console.log('Paystack raw response:', response);
                onSuccess(response); // Must pass full response
            },
            onClose,
        });
    };

    return (
        <div className="payment-modal-backdrop">
            <div className="payment-modal">
                <div className="modal-header">
                    <h3>Complete Your Payment</h3>
                    <button
                        onClick={onClose}
                        className="close-btn"
                        aria-label="Close payment modal"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="amount-display">
                        <span className="currency">₦</span>
                        <span className="amount">{amount.toLocaleString()}</span>
                    </div>
                    <p className="description">
                        You're about to join <strong>Affiliate Academy</strong>
                    </p>
                </div>

                <div className="modal-actions">
                    <button onClick={handlePay} className="paystack-btn">
                        <i className="bi bi-credit-card"></i>
                        Pay with Paystack
                    </button>
                    <button onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </div>

                <div className="secure-notice">
                    <i className="bi bi-shield-check"></i>
                    <span>Secured by Paystack • SSL Encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default PaystackPayment;