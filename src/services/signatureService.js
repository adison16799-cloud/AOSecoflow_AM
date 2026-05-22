import { db } from '../config/firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

export const saveSellerSignature = async (orderId, signatureData, email) => {
  try {
    const orderRef = doc(db, 'waste_orders', orderId);
    await updateDoc(orderRef, {
      sellerSignature: signatureData,
      sellerSignedAt: Timestamp.now(),
      sellerSignedBy: email,
    });
    return true;
  } catch (error) {
    console.error('Error saving seller signature:', error);
    throw error;
  }
};

export const saveVendorSignature = async (orderId, signatureData, email) => {
  try {
    const orderRef = doc(db, 'waste_orders', orderId);
    await updateDoc(orderRef, {
      vendorSignature: signatureData,
      vendorSignedAt: Timestamp.now(),
      vendorSignedBy: email,
    });
    return true;
  } catch (error) {
    console.error('Error saving vendor signature:', error);
    throw error;
  }
};

export const getOrderSignatures = async (order) => {
  return {
    sellerSigned: !!order.sellerSignature,
    vendorSigned: !!order.vendorSignature,
    sellerSignedAt: order.sellerSignedAt,
    vendorSignedAt: order.vendorSignedAt,
    sellerSignedBy: order.sellerSignedBy,
    vendorSignedBy: order.vendorSignedBy,
  };
};

export default {
  saveSellerSignature,
  saveVendorSignature,
  getOrderSignatures,
};
