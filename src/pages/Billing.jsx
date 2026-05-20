import { useState } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MetricCard } from '../components/dashboard/MetricCard';

const mockBillings = [
  { id: 1, invoiceNo: 'INV-001', vendor: 'Green Waste Co.', amount: '15,450', date: '2024-05-20', dueDate: '2024-06-20', status: 'Paid' },
  { id: 2, invoiceNo: 'INV-002', vendor: 'Eco Recycling', amount: '12,300', date: '2024-05-15', dueDate: '2024-06-15', status: 'Pending' },
  { id: 3, invoiceNo: 'INV-003', vendor: 'Clean Earth', amount: '8,900', date: '2024-05-10', dueDate: '2024-06-10', status: 'Overdue' },
];

const tableColumns = [
  { key: 'invoiceNo', label: 'Invoice No.' },
  { key: 'vendor', label: 'Vendor' },
  { key: 'amount', label: 'Amount (THB)' },
  { key: 'date', label: 'Date' },
  { key: 'dueDate', label: 'Due Date' },
  {
    key: 'status',
    label: 'Status',
    render: (status) => {
      const variants = {
        'Paid': 'success',
        'Pending': 'warning',
        'Overdue': 'danger',
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
    },
  },
];

export const Billing = () => {
  const [billings] = useState(mockBillings);

  const totalAmount = billings.reduce((sum, b) => {
    const amount = parseInt(b.amount.replace(/,/g, ''));
    return sum + amount;
  }, 0);

  const paidAmount = billings
    .filter(b => b.status === 'Paid')
    .reduce((sum, b) => sum + parseInt(b.amount.replace(/,/g, '')), 0);

  const pendingAmount = billings
    .filter(b => b.status === 'Pending' || b.status === 'Overdue')
    .reduce((sum, b) => sum + parseInt(b.amount.replace(/,/g, '')), 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">💳 Billing</h1>
        <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
          Invoice management and payment tracking
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon="💰"
          title="Total Invoices"
          value={`${totalAmount.toLocaleString()}`}
          unit="THB"
          variant="cyan"
        />
        <MetricCard
          icon="✅"
          title="Paid"
          value={`${paidAmount.toLocaleString()}`}
          unit="THB"
          trend={{ value: 100, isPositive: true }}
          variant="success"
        />
        <MetricCard
          icon="⏳"
          title="Pending"
          value={`${pendingAmount.toLocaleString()}`}
          unit="THB"
          variant="warning"
        />
      </div>

      {/* Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Invoices</h2>
          <Button>📥 Export PDF</Button>
        </div>
        <DataTable columns={tableColumns} data={billings} />
      </div>
    </div>
  );
};

export default Billing;
