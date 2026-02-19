// src/services/notifyService.js
import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID_TECH_JOB_ALERT;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RAZORPAY_TECH_JOB_ALERT;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_TECH_JOB_ALERT;

export const notifyPurchase = ({ resourceId, resourceTitle, buyerName, buyerEmail, amount }) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    resource_id:    resourceId,
    resource_title: resourceTitle,
    buyer_name:     buyerName,
    buyer_email:    buyerEmail,
    amount:         amount,
  }, PUBLIC_KEY);
};