import { useState } from 'react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { PermissionGuard } from '../PermissionGuard';
import { PERMISSIONS } from '../../utils/roles';

export const OrderDocuments = ({ orderId, documents = [] }) => {
  const [docs, setDocs] = useState(documents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    type: 'receipt',
    file: null,
  });

  const handleAddDocument = () => {
    if (newDoc.name && newDoc.file) {
      const doc = {
        id: docs.length + 1,
        name: newDoc.name,
        type: newDoc.type,
        fileName: newDoc.file.name,
        date: new Date().toLocaleDateString(),
        size: `${(newDoc.file.size / 1024).toFixed(2)} KB`,
      };
      setDocs([...docs, doc]);
      setNewDoc({ name: '', type: 'receipt', file: null });
      setIsModalOpen(false);
    }
  };

  const handleDeleteDocument = (docId) => {
    setDocs(docs.filter(d => d.id !== docId));
  };

  return (
    <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">📄 Documents</h3>
        <PermissionGuard permission={PERMISSIONS.ADD_ORDER_DOCUMENT}>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            ➕ Add Document
          </Button>
        </PermissionGuard>
      </div>

      {/* Documents List */}
      {docs.length === 0 ? (
        <p className="text-aeco-light-text/50 dark:text-aeco-dark-text/50 text-sm">
          No documents yet
        </p>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-aeco-light-bg dark:bg-aeco-dark-bg rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-lg">📎</span>
                <div className="flex-1">
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                    {doc.fileName} • {doc.size} • {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  📥 Download
                </Button>
                <PermissionGuard permission={PERMISSIONS.UPDATE_WASTE_ORDER}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    🗑️
                  </Button>
                </PermissionGuard>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Document"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDocument}>
              Upload
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Document Name</label>
            <input
              type="text"
              placeholder="Invoice, Receipt, etc"
              value={newDoc.name}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Document Type</label>
            <select
              value={newDoc.type}
              onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option value="receipt">Receipt (สลิป)</option>
              <option value="invoice">Invoice (ใบแจ้งหนี้)</option>
              <option value="contract">Contract (สัญญา)</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload File</label>
            <input
              type="file"
              onChange={(e) => setNewDoc({ ...newDoc, file: e.target.files?.[0] })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDocuments;
