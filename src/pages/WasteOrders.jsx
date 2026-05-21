import { useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { PermissionGuard } from '../components/PermissionGuard';
import { getVendors } from '../services/vendorsService';
import { getWasteTypes } from '../services/wasteTypesService';
import { validators, validateForm } from '../utils/validators';
import { PERMISSIONS } from '../utils/roles';

export const WasteOrders = () => {
  const [vendors, setVendors] = useState([]);
  const [wasteTypes, setWasteTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    orderId: '',
    date: new Date().toISOString().split('T')[0],
    location: 'QSNSS',
    waste: '',
    vendor: '',
    wasteType: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vendorsData, wasteTypesData] = await Promise.all([
          getVendors(),
          getWasteTypes(),
        ]);
        setVendors(vendorsData);
        setWasteTypes(wasteTypesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validationRules = {
    orderId: [(val) => validators.required(val, 'Order ID')],
    date: [(val) => validators.required(val, 'Date')],
    waste: [
      (val) => validators.required(val, 'Waste Amount'),
      (val) => validators.number(val),
      (val) => validators.positive(val),
    ],
    vendor: [(val) => validators.required(val, 'Vendor')],
    wasteType: [(val) => validators.required(val, 'Waste Type')],
  };

  const handleAddOrder = async () => {
    const formErrors = validateForm(formData, validationRules);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        setSuccessMessage('✅ Order created successfully!');
        
        setFormData({
          orderId: '',
          date: new Date().toISOString().split('T')[0],
          location: 'QSNSS',
          waste: '',
          vendor: '',
          wasteType: '',
          status: 'Pending',
        });
        
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMessage('');
        }, 1500);
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">♻️ Waste Orders</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Record & manage waste sales
          </p>
        </div>
        <PermissionGuard permission={PERMISSIONS.CREATE_WASTE_ORDER}>
          <Button onClick={() => setIsModalOpen(true)}>
            ➕ New Order
          </Button>
        </PermissionGuard>
      </div>

      {successMessage && (
        <div className="bg-aeco-success/20 border border-aeco-success text-aeco-success px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6">
        <p className="text-center text-aeco-light-text/60 dark:text-aeco-dark-text/60">
          Click "New Order" to create a waste order
        </p>
      </div>

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

          <div>
            <label className="block text-sm font-medium mb-2">Waste Type *</label>
            <select
              value={formData.wasteType}
              onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option value="">Select Waste Type</option>
              {wasteTypes.map((type) => (
                <option key={type.id} value={type.categoryEn || type.category}>
                  {type.icon || '♻️'} {type.categoryEn || type.category}
                </option>
              ))}
            </select>
            {errors.wasteType && <p className="text-red-500 text-xs mt-1">{errors.wasteType}</p>}
          </div>

          <Input
            label="Waste Amount (kg)"
            type="number"
            placeholder="450"
            value={formData.waste}
            error={errors.waste}
            onChange={(e) => setFormData({ ...formData, waste: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Vendor *</label>
            <select
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border"
            >
              <option value="">Select Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
            {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor}</p>}
          </div>

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
    </div>
  );
};

export default WasteOrders;
