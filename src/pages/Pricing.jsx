import { useState } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { PermissionGuard } from '../components/PermissionGuard';
import { validators, validateForm } from '../utils/validators';
import { PERMISSIONS } from '../utils/roles';

const mockPricing = [
  { id: 1, category: 'Plastic', unit: 'kg', price: '15', currency: 'THB', status: 'Active', lastUpdated: '2024-05-20' },
  { id: 2, category: 'Glass', unit: 'kg', price: '12', currency: 'THB', status: 'Active', lastUpdated: '2024-05-20' },
  { id: 3, category: 'Metal', unit: 'kg', price: '25', currency: 'THB', status: 'Active', lastUpdated: '2024-05-15' },
  { id: 4, category: 'Paper', unit: 'kg', price: '8', currency: 'THB', status: 'Active', lastUpdated: '2024-05-10' },
  { id: 5, category: 'Organic', unit: 'kg', price: '5', currency: 'THB', status: 'Inactive', lastUpdated: '2024-05-05' },
];

const tableColumns = [
  { key: 'category', label: 'Waste Category' },
  { key: 'unit', label: 'Unit' },
  { key: 'price', label: 'Price' },
  { key: 'currency', label: 'Currency' },
  { key: 'lastUpdated', label: 'Last Updated' },
  {
    key: 'status',
    label: 'Status',
    render: (status) => (
      <Badge variant={status === 'Active' ? 'success' : 'danger'}>
        {status}
      </Badge>
    ),
  },
];

export const Pricing = () => {
  const [prices, setPrices] = useState(mockPricing);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    category: '',
    unit: 'kg',
    price: '',
    currency: 'THB',
    status: 'Active',
  });

  const validationRules = {
    category: [(val) => validators.required(val, 'Category')],
    price: [
      (val) => validators.required(val, 'Price'),
      (val) => validators.number(val),
      (val) => validators.positive(val),
    ],
  };

  const handleOpenModal = (price = null) => {
    if (price) {
      setFormData({
        category: price.category,
        unit: price.unit,
        price: price.price,
        currency: price.currency,
        status: price.status,
      });
      setIsEditMode(true);
    } else {
      setFormData({
        category: '',
        unit: 'kg',
        price: '',
        currency: 'THB',
        status: 'Active',
      });
      setIsEditMode(false);
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSavePrice = () => {
    const formErrors = validateForm(formData, validationRules);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      if (isEditMode) {
        // Update existing
        setPrices(prices.map(p =>
          p.category === formData.category
            ? { ...p, ...formData, lastUpdated: new Date().toLocaleDateString() }
            : p
        ));
      } else {
        // Create new
        const newPrice = {
          id: prices.length + 1,
          ...formData,
          lastUpdated: new Date().toLocaleDateString(),
        };
        setPrices([newPrice, ...prices]);
      }
      
      setIsModalOpen(false);
      setFormData({
        category: '',
        unit: 'kg',
        price: '',
        currency: 'THB',
        status: 'Active',
      });
    }
  };

  const handleDelete = (price) => {
    setPrices(prices.filter(p => p.id !== price.id));
  };

  const handleToggleStatus = (price) => {
    const newStatus = price.status === 'Active' ? 'Inactive' : 'Active';
    setPrices(prices.map(p =>
      p.id === price.id ? { ...p, status: newStatus } : p
    ));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">💰 Waste Pricing</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Manage waste category prices and rates
          </p>
        </div>
        <PermissionGuard permission={PERMISSIONS.EDIT_PRICING}>
          <Button onClick={() => handleOpenModal()}>
            ➕ Add Price
          </Button>
        </PermissionGuard>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">Total Categories</p>
          <p className="text-2xl font-bold">{prices.length}</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">Active</p>
          <p className="text-2xl font-bold text-aeco-success">{prices.filter(p => p.status === 'Active').length}</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">Average Price</p>
          <p className="text-2xl font-bold text-aeco-cyan">
            ฿{(prices.reduce((sum, p) => sum + parseInt(p.price), 0) / prices.length).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Pricing Table */}
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
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price) => (
                <tr
                  key={price.id}
                  className="border-b border-aeco-light-border dark:border-aeco-dark-border hover:bg-aeco-light-bg dark:hover:bg-aeco-dark-bg/50"
                >
                  {tableColumns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(price[col.key]) : price[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <PermissionGuard permission={PERMISSIONS.EDIT_PRICING}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleOpenModal(price)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        size="sm"
                        variant={price.status === 'Active' ? 'warning' : 'success'}
                        onClick={() => handleToggleStatus(price)}
                      >
                        {price.status === 'Active' ? '🔴 Deactivate' : '🟢 Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(price)}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? 'Edit Price' : 'Add New Price'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrice}>
              {isEditMode ? 'Update' : 'Add'} Price
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Waste Category"
            placeholder="e.g., Plastic, Glass, Metal"
            value={formData.category}
            error={errors.category}
            disabled={isEditMode}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
              >
                <option>kg</option>
                <option>ton</option>
                <option>bag</option>
                <option>piece</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
              >
                <option>THB</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>

          <Input
            label="Price"
            type="number"
            placeholder="0.00"
            value={formData.price}
            error={errors.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Pricing;
