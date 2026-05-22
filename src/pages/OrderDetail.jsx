import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { SignaturePad } from '../components/common/SignaturePad';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../contexts/AuthContext';
import { saveSellerSignature, saveVendorSignature } from '../services/signatureService';
import { exportOrderPDF } from '../services/pdfExportService';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const OrderDetail = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureType, setSignatureType] = useState(null);
  const [signatures, setSignatures] = useState({
    sellerSigned: false,
    vendorSigned: false,
    sellerSignedBy: null,
    vendorSignedBy: null,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderRef = doc(db, 'waste_orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrder({ id: orderSnap.id, ...orderData });

          setSignatures({
            sellerSigned: !!orderData.sellerSignature,
            vendorSigned: !!orderData.vendorSignature,
            sellerSignedBy: orderData.sellerSignedBy || null,
            vendorSignedBy: orderData.vendorSignedBy || null,
          });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleOpenSignature = (type) => {
    setSignatureType(type);
    setShowSignatureModal(true);
  };

  const handleSignatureSave = async (signatureData) => {
    try {
      if (signatureType === 'seller') {
        await saveSellerSignature(orderId, signatureData, user.email);
        setSignatures({ ...signatures, sellerSigned: true, sellerSignedBy: user.email });
      } else if (signatureType === 'vendor') {
        await saveVendorSignature(orderId, signatureData, user.email);
        setSignatures({ ...signatures, vendorSigned: true, vendorSignedBy: user.email });
      }
      setShowSignatureModal(false);
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  const handleExportPDF = () => {
    exportOrderPDF(order, signatures);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p>Order not found</p>
      </div>
    );
  }

  const canSellerSign = order.status === 'In Progress';
  const canVendorSign = signatures.sellerSigned && order.status === 'In Progress';
  const isBothSigned = signatures.sellerSigned && signatures.vendorSigned;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Order Details</h1>
        <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60 text-lg">
          {order?.orderId}
        </p>
      </div>

      {/* Info Cards - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Order ID</p>
          <p className="text-xl font-bold mt-2">{order?.orderId}</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Date</p>
          <p className="text-xl font-bold mt-2">{order?.date}</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Waste Amount</p>
          <p className="text-xl font-bold mt-2">{order?.waste} kg</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Status</p>
          <Badge variant={order?.status === 'In Progress' ? 'warning' : 'success'} className="mt-2">
            {order?.status}
          </Badge>
        </div>
      </div>

      {/* More Info - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Location</p>
          <p className="text-lg font-bold mt-2">{order?.location}</p>
        </div>
        <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-4">
          <p className="text-xs text-aeco-light-text/60 dark:text-aeco-dark-text/60 uppercase">Vendor</p>
          <p className="text-lg font-bold mt-2">{order?.vendor}</p>
        </div>
      </div>

      {/* Signature Section */}
      {order?.status === 'In Progress' && (
        <div className="space-y-6">
          {/* Seller Signature */}
          <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">🖊️ Seller Signature</h2>
              <Badge variant={signatures.sellerSigned ? 'success' : 'warning'}>
                {signatures.sellerSigned ? '✅ Signed' : '⏳ Pending'}
              </Badge>
            </div>

            {signatures.sellerSigned ? (
              <div className="space-y-2">
                <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                  Signed by: <span className="font-bold text-aeco-light-text dark:text-aeco-dark-text">{signatures.sellerSignedBy}</span>
                </p>
              </div>
            ) : canSellerSign ? (
              <Button onClick={() => handleOpenSignature('seller')}>
                🖊️ Sign as Seller
              </Button>
            ) : (
              <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                Waiting for seller signature...
              </p>
            )}
          </div>

          {/* Vendor Signature */}
          <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">🖊️ Vendor Signature</h2>
              <Badge variant={signatures.vendorSigned ? 'success' : 'warning'}>
                {signatures.vendorSigned ? '✅ Signed' : '⏳ Pending'}
              </Badge>
            </div>

            {!signatures.sellerSigned ? (
              <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                Waiting for seller signature first...
              </p>
            ) : signatures.vendorSigned ? (
              <div className="space-y-2">
                <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                  Signed by: <span className="font-bold text-aeco-light-text dark:text-aeco-dark-text">{signatures.vendorSignedBy}</span>
                </p>
              </div>
            ) : canVendorSign ? (
              <Button onClick={() => handleOpenSignature('vendor')}>
                🖊️ Sign as Vendor
              </Button>
            ) : (
              <p className="text-sm text-aeco-light-text/60 dark:text-aeco-dark-text/60">
                Waiting for vendor signature...
              </p>
            )}
          </div>

          {/* Export Button */}
          {isBothSigned && (
            <Button 
              className="w-full bg-aeco-success hover:bg-aeco-success/90" 
              onClick={handleExportPDF}
            >
              📥 Export as PDF with Signatures
            </Button>
          )}
        </div>
      )}

      {/* Signature Modal */}
      <Modal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        title={signatureType === 'seller' ? 'Seller Signature' : 'Vendor Signature'}
        size="lg"
      >
        <SignaturePad
          onSign={handleSignatureSave}
          onCancel={() => setShowSignatureModal(false)}
          label={signatureType === 'seller' ? 'Sign as Seller' : 'Sign as Vendor'}
        />
      </Modal>
    </div>
  );
};

export default OrderDetail;
