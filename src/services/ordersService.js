import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

// ดึง orders ทั้งหมด
export const getOrders = async () => {
  try {
    const collectionRef = collection(db, 'waste_orders');
    const snapshot = await getDocs(collectionRef);
    const orders = [];
    
    snapshot.forEach((docSnap) => {
      orders.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    
    return orders.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// ดึง orders โดย status
export const getOrdersByStatus = async (status) => {
  try {
    const collectionRef = collection(db, 'waste_orders');
    const q = query(collectionRef, where('status', '==', status));
    const snapshot = await getDocs(q);
    const orders = [];
    
    snapshot.forEach((docSnap) => {
      orders.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw error;
  }
};

// สร้าง order ใหม่
export const createOrder = async (orderData) => {
  try {
    const collectionRef = collection(db, 'waste_orders');
    const newOrder = {
      ...orderData,
      createdAt: Timestamp.now(),
      documents: [],
    };
    
    const docRef = await addDoc(collectionRef, newOrder);
    return {
      id: docRef.id,
      ...newOrder,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// แก้ไข order
export const updateOrder = async (orderId, updateData) => {
  try {
    const docRef = doc(db, 'waste_orders', orderId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// ลบ order
export const deleteOrder = async (orderId) => {
  try {
    const docRef = doc(db, 'waste_orders', orderId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Real-time listener สำหรับ orders
export const subscribeToOrders = (callback) => {
  try {
    const collectionRef = collection(db, 'waste_orders');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const orders = [];
      snapshot.forEach((docSnap) => {
        orders.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      });
      callback(orders);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to orders:', error);
    throw error;
  }
};

export default {
  getOrders,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
  subscribeToOrders,
};
