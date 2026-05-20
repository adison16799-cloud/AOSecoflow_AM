import { useState } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { OrderDocuments } from '../components/dashboard/OrderDocuments';
import { PermissionGuard } from '../components/PermissionGuard';
import { exportToPDF, exportToExcel } from '../utils/exporters';
import { validators, validateForm } from '../utils/validators';
import { PERMISSIONS } from '../utils/roles';

const mockWasteOrders = [
  { 
    id: 1, 
    orderId: 'WO-001', 
    date: '2024-05-20', 
    location: 'QSNSS', 
    waste: '450', 
    vendor: 'Green Waste Co.', 
    status: 'Completed',
    documents: [
      { id: 1, name: 'Receipt', type: 'receipt', fileName: 'receipt_001.pdf', date: '2024-05-20', size: '245 KB' }
    ]
  },
  { 
    id: 2, 
    orderId: 'WO-002', 
    date: '2024-05-19', 
    location: 'QSNSS', 
    waste: '320', 
    vendor: 'Eco Recycling', 
    status: 'Pending',
    documents: []
  },
  { 
    id: 3, 
    orderId: 'WO-003', 
    date: '2024-05-18', 
    location: 'QSNSS', 
    waste: '180', 
    vendor: 'Clean Earth', 
    status: 'In Progress',
    documents: []
  },
];

const tableColumns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'date', label: 'Date' },
  { key: 'location', label: 'Location' },
  { key: 'waste', label: 'Waste (kg)' },
  { key: 'vendor', label: 'Vendor' },
  {
    key: 'status',
    label: 'Status',
    render: (status) => {
      const colors = {
        'Completed': 'bg-aeco-success/20 text-aeco-success',
        'Pending': 'bg-aeco-warning/20 text-aeco-warning',
        'In Progress': 'bg-aeco-cyan/20 text-aeco-cyan',
      };
      return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[status]}`}>
          {status}
        </span>
      );
    },
  },
];

export const WasteOrders = () => {
  const [orders, setOrders] = useState(mockWasteOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    orderId: '',
    date: '',
    location: 'QSNSS',
    waste: '',
    vendor: '',
    status: 'Pending',
  });

  const validationRules = {
    orderId: [(val) => validators.required(val, 'Order ID')],
    date: [(val) => validators.required(val, 'Date')],
    waste: [
      (val) => validators.required(val, 'Waste Amount'),
      (val) => validators.number(val),
      (val) => validators.positive(val),
    ],
    vendor: [(val) => validators.required(val, 'Vendor')],
  };

  const handleAddOrder = () => {
    const formErrors = validateForm(formData, validationRules);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const newOrder = {
        id: orders.length + 1,
        ...formData,
        documents: [],
      };
      setOrders([newOrder, ...orders]);
      setFormData({
        orderId: '',
        date: '',
        location: 'QSNSS',
        waste: '',
        vendor: '',
        status: 'Pending',
      });
      setIsModalOpen(false);
    }
  };

  const handleExportPDF = () => {
    exportToPDF(orders, tableColumns, 'waste-orders.pdf');
  };

  const handleExportExcel = () => {
    exportToExcel(orders, tableColumns, 'waste-orders.xlsx');
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (newStatus) => {
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: newStatus } : o
    ));
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const handleDelete = (order) => {
    setOrders(orders.filter(o => o.id !== order.id));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">♻️ Waste Orders</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Record & manage waste sales and documents
          </p>
        </div>
        <div className="flex gap-2">
          <PermissionGuard permission={PERMISSIONS.EXPORT_WASTE_ORDERS}>
            <Button variant="secondary" onClick={handleExportPDF}>
              📄 PDF
            </Button>
            <Button variant="secondary" onClick={handleExportExcel}>
              📊 Excel
            </Button>
          </PermissionGuard>

          <PermissionGuard permission={PERMISSIONS.CREATE_WASTE_ORDER}>
            <Button onClick={() => setIsModalOpen(true)}>
              ➕ New Order
            </Button>
          </PermissionGuard>
        </div>
      </div>

      {/* Table with Action Button */}
      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-aeco-light-border dark:border-aeco-dark-border bg-aeco-light-bg dark:bg-aeco-dark-bg/50">
                {tableColumns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-aeco-light-border dark:border-aeco-dark-border hover:bg-aeco-light-bg dark:hover:bg-aeco-dark-bg/50"
                >
                  {tableColumns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(order[col.key]) : order[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <Button size="sm" onClick={() => handleViewDetails(order)}>
                      📋 Details
                    </Button>
                    <PermissionGuard permission={PERMISSIONS.DELETE_WASTE_ORDER}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(order)}
                      >
                        🗑️
                      </Button>
                    </PermissionGuard>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Waste Order"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddOrder}>
              Create Order
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Order ID"
            placeholder="WO-004"
            value={formData.orderId}
            error={errors.orderId}
            onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
          />
          <Input
            label="Date"
            type="date"
            value={formData.date}
            error={errors.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            label="Waste Amount (kg)"
            placeholder="450"
            value={formData.waste}
            error={errors.waste}
            onChange={(e) => setFormData({ ...formData, waste: e.target.value })}
          />
          <Input
            label="Vendor"
            placeholder="Green Waste Co."
            value={formData.vendor}
            error={errors.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Order Details: ${selectedOrder.orderId}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60">Order ID</label>
                <p className="font-semibold">{selectedOrder.orderId}</p>
              </div>
              <div>
                <label className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60">Date</label>
                <p className="font-semibold">{selectedOrder.date}</p>
              </div>
              <div>
                <label className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60">Waste Amount</label>
                <p className="font-semibold">{selectedOrder.waste} kg</p>
              </div>
              <div>
                <label className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60">Vendor</label>
                <p className="font-semibold">{selectedOrder.vendor}</p>
              </div>
            </div>

            {/* Update Status */}
            <PermissionGuard permission={PERMISSIONS.UPDATE_WASTE_ORDER}>
              <div>
                <label className="block text-sm font-medium mb-2">Update Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border border-aeco-cyan"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </PermissionGuard>

            {/* Documents */}
            <OrderDocuments orderId={selectedOrder.orderId} documents={selectedOrder.documents} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WasteOrders;
