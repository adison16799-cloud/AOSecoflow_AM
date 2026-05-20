import { useState } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';

const mockVendors = [
  { id: 1, name: 'Green Waste Co.', type: 'Hauler', phone: '02-xxx-xxxx', email: 'info@greenwaste.com', rating: 4.8, status: 'Active' },
  { id: 2, name: 'Eco Recycling', type: 'Recycler', phone: '02-yyy-yyyy', email: 'contact@ecorecycle.com', rating: 4.6, status: 'Active' },
  { id: 3, name: 'Clean Earth', type: 'Processor', phone: '02-zzz-zzzz', email: 'support@cleanearth.com', rating: 4.5, status: 'Inactive' },
];

const tableColumns = [
  { key: 'name', label: 'Vendor Name' },
  { key: 'type', label: 'Type' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  {
    key: 'rating',
    label: 'Rating',
    render: (rating) => (
      <span className="text-aeco-warning font-semibold">⭐ {rating}</span>
    ),
  },
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

export const Vendors = () => {
  const [vendors, setVendors] = useState(mockVendors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hauler',
    phone: '',
    email: '',
    status: 'Active',
  });

  const handleAddVendor = () => {
    if (formData.name && formData.phone && formData.email) {
      const newVendor = {
        id: vendors.length + 1,
        ...formData,
        rating: 4.5,
      };
      setVendors([newVendor, ...vendors]);
      setFormData({ name: '', type: 'Hauler', phone: '', email: '', status: 'Active' });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (vendor) => {
    setVendors(vendors.filter(v => v.id !== vendor.id));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">🏢 Vendors</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Manage waste management service providers
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          ➕ Add Vendor
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={tableColumns}
        data={vendors}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Vendor"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVendor}>
              Add Vendor
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Vendor Name"
            placeholder="Company Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option>Hauler</option>
              <option>Recycler</option>
              <option>Processor</option>
            </select>
          </div>
          <Input
            label="Phone"
            placeholder="02-xxx-xxxx"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="info@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Vendors;
