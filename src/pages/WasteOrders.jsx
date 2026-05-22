import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { PermissionGuard } from '../components/PermissionGuard';
import { getVendors } from '../services/vendorsService';
import { getWasteTypes } from '../services/wasteTypesService';
import { validators, validateForm } from '../utils/validators';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { PERMISSIONS } from '../utils/roles';

export const WasteOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
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
        
        // ดึง Waste Orders จาก Firestore
        const ordersRef = collection(db, 'waste_orders');
        const ordersSnap = await getDocs(ordersRef);
        const ordersData = [];
        ordersSnap.forEach((doc) => {
          ordersData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setOrders(ordersData);

        // ดึง Vendors
        const vendorsData = await getVendors();
        setVendors(vendorsData);

        // ดึง Waste Types
        const wasteTypesData = await getWasteTypes();
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

  const handleViewDetail = (orderId) => {
    navigate(`/waste-orders/${orderId}`);
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
            Record & manage waste sales ({orders.length} total)
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

      {orders.length === 0 ? (
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-8 text-center">
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            No waste orders yet. Click "New Order" to create one.
          </p>
        </div>
      ) : (
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-aeco-light-border dark:border-aeco-dark-border bg-aeco-light-bg dark:bg-aeco-dark-bg/50">
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Location</th>
                  <th className="px-4 py-3 text-left font-semibold">Waste (kg)</th>
                  <th className="px-4 py-3 text-left font-semibold">Vendor</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-aeco-light-border dark:border-aeco-dark-border hover:bg-aeco-light-bg dark:hover:bg-aeco-dark-bg/50"
                  >
                    <td className="px-4 py-3 font-medium">{order.orderId}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{order.location}</td>
                    <td className="px-4 py-3">{order.waste}</td>
                    <td className="px-4 py-3">{order.vendor}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === 'Completed' ? 'bg-aeco-success/20 text-aeco-success' :
                        order.status === 'In Progress' ? 'bg-aeco-cyan/20 text-aeco-cyan' :
                        'bg-aeco-warning/20 text-aeco-warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(order.id)}
                        className="px-3 py-1 text-sm rounded-lg border border-aeco-cyan text-aeco-cyan hover:bg-aeco-cyan/10"
                      >
                        👁️ View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
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
