import { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { PermissionGuard } from '../components/PermissionGuard';
import { getVendors } from '../services/vendorsService';
import { PERMISSIONS } from '../utils/roles';

const tableColumns = [
  { key: 'name', label: 'Vendor Name' },
  { key: 'type', label: 'Type' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
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
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hauler',
    phone: '',
    email: '',
    status: 'Active',
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const data = await getVendors();
        setVendors(data);
      } catch (error) {
        console.error('Failed to load vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleAddVendor = () => {
    if (formData.name && formData.phone && formData.email) {
      setFormData({ name: '', type: 'Hauler', phone: '', email: '', status: 'Active' });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (vendor) => {
    setVendors(vendors.filter(v => v.id !== vendor.id));
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading vendors...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">🏢 Vendors</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Manage waste management service providers ({vendors.length} total)
          </p>
        </div>
        <PermissionGuard permission={PERMISSIONS.CREATE_VENDOR}>
          <Button onClick={() => setIsModalOpen(true)}>
            ➕ Add Vendor
          </Button>
        </PermissionGuard>
      </div>

      <DataTable
        columns={tableColumns}
        data={vendors}
        onDelete={handleDelete}
      />

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
