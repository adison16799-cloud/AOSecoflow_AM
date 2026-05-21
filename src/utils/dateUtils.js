export const formatFirestoreDate = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US');
    }
    
    if (typeof timestamp === 'string') {
      return new Date(timestamp).toLocaleDateString('en-US');
    }
    
    return new Date(timestamp).toLocaleDateString('en-US');
  } catch {
    return '';
  }
};

export default { formatFirestoreDate };
