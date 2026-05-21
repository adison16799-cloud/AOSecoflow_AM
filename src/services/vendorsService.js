import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// ดึง vendors ทั้งหมด
export const getVendors = async () => {
  try {
    const collectionRef = collection(db, 'vendors');
    const snapshot = await getDocs(collectionRef);
    const vendors = [];
    
    snapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return vendors;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

// ดึง vendors ที่ Active
export const getActiveVendors = async () => {
  try {
    const collectionRef = collection(db, 'vendors');
    const q = query(collectionRef, where('status', '==', 'Active'));
    const snapshot = await getDocs(q);
    const vendors = [];
    
    snapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return vendors;
  } catch (error) {
    console.error('Error fetching active vendors:', error);
    throw error;
  }
};

// ดึง vendor โดย ID
export const getVendorById = async (vendorId) => {
  try {
    const collectionRef = collection(db, 'vendors');
    const q = query(collectionRef, where('name', '==', vendorId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error('Error fetching vendor:', error);
    throw error;
  }
};

export default {
  getVendors,
  getActiveVendors,
  getVendorById,
};
