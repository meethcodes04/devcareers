// src/services/paymentService.js

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const createOrder = async (amount, metadata = {}) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: metadata
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create order');
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id:   paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature:  paymentData.razorpay_signature,
        resourceId:          paymentData.resourceId,
        userName:            paymentData.userName,
        userEmail:           paymentData.userEmail,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Payment verification failed');
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const initiatePayment = (orderData, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }

    const razorpayOptions = {
      key:         orderData.key,
      amount:      orderData.order.amount,
      currency:    orderData.order.currency,
      name:        options.name || 'DevCareers',
      description: options.description || 'Purchase',
      order_id:    orderData.order.id,
      prefill: {
        name:    options.prefill?.name || '',
        email:   options.prefill?.email || '',
        contact: options.prefill?.contact || '',
      },
      theme: {
        color: options.theme?.color || '#d97706',
      },
      handler: function (response) {
        resolve(response);
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user'));
        },
      },
    };

    const rzp = new window.Razorpay(razorpayOptions);
    rzp.open();
  });
};

export const processPayment = async (amount, metadata = {}, checkoutOptions = {}) => {
  try {
    // Step 1: Create order
    const orderData = await createOrder(amount, metadata);

    // Step 2: Open Razorpay checkout
    const paymentResponse = await initiatePayment(orderData, checkoutOptions);

    // Step 3: Verify — pass resourceId, userName, userEmail along
    const verificationResult = await verifyPayment({
      ...paymentResponse,
      resourceId: metadata.resourceId,
      userName:   metadata.userName,
      userEmail:  metadata.userEmail,
    });

    return {
      success: true,
      ...verificationResult,
      paymentResponse,
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};