import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// ดึง waste types ทั้งหมด
export const getWasteTypes = async () => {
  try {
    const collectionRef = collection(db, 'waste_types');
    const snapshot = await getDocs(collectionRef);
    const wasteTypes = [];
    
    snapshot.forEach((doc) => {
      wasteTypes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return wasteTypes;
  } catch (error) {
    console.error('Error fetching waste types:', error);
    throw error;
  }
};

// ดึง waste type โดย category
export const getWasteTypeByCategory = async (category) => {
  try {
    const collectionRef = collection(db, 'waste_types');
    const q = query(collectionRef, where('category', '==', category));
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
    console.error('Error fetching waste type:', error);
    throw error;
  }
};

export default {
  getWasteTypes,
  getWasteTypeByCategory,
};
