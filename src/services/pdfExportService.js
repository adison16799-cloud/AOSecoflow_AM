import jsPDF from 'jspdf';

export const exportOrderPDF = (order, signatures) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('AOSecoflow Order Document', 20, 20);
  
  doc.setDrawColor(6, 182, 212);
  doc.line(20, 25, 190, 25);
  
  doc.setFontSize(12);
  let yPosition = 35;
  
  doc.text(`Order ID: ${order.orderId}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Date: ${order.date}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Location: ${order.location}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Waste Amount: ${order.waste} kg`, 20, yPosition);
  yPosition += 10;
  doc.text(`Vendor: ${order.vendor}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Status: ${order.status}`, 20, yPosition);
  
  yPosition += 20;
  doc.setFontSize(14);
  doc.text('Signatures', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(11);
  doc.text(`Seller: ${signatures.sellerSignedBy || 'Not signed'}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Vendor: ${signatures.vendorSignedBy || 'Not signed'}`, 20, yPosition);
  
  doc.setFontSize(9);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 20, doc.internal.pageSize.height - 10);
  
  doc.save(`Order_${order.orderId}.pdf`);
};

export default { exportOrderPDF };
