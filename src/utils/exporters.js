import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, columns, filename = 'export.pdf') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const lineHeight = 7;
  let yPosition = margin;

  // Title
  doc.setFont('helvetica', 'b');
  doc.setFontSize(16);
  doc.text(filename.replace('.pdf', ''), pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Table Headers
  doc.setFont('helvetica', 'b');
  doc.setFillColor(6, 182, 212);
  doc.setTextColor(255, 255, 255);

  const columnWidth = (pageWidth - 2 * margin) / columns.length;
  columns.forEach((col, i) => {
    doc.rect(margin + i * columnWidth, yPosition - 5, columnWidth, 8, 'F');
    doc.text(col.label, margin + i * columnWidth + 2, yPosition, { maxWidth: columnWidth - 4 });
  });

  yPosition += 10;

  // Table Data
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  data.forEach((row) => {
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    columns.forEach((col, i) => {
      doc.text(String(row[col.key] || ''), margin + i * columnWidth + 2, yPosition, { maxWidth: columnWidth - 4 });
    });

    yPosition += lineHeight;
  });

  doc.save(filename);
};

export const exportToExcel = (data, columns, filename = 'export.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((row) => {
      const excelRow = {};
      columns.forEach((col) => {
        excelRow[col.label] = row[col.key];
      });
      return excelRow;
    })
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
};

export default { exportToPDF, exportToExcel };
