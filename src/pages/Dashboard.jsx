import { useState } from 'react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { BarChart } from '../components/dashboard/BarChart';
import { LineChart } from '../components/dashboard/LineChart';
import { PieChart } from '../components/dashboard/PieChart';
import { DataTable } from '../components/common/DataTable';
import { useLanguage } from '../contexts/LanguageContext';

const mockMetrics = [
  { id: 1, icon: '♻️', title: 'Total Waste Collected', value: '2,450', unit: 'kg', trend: { value: 12, isPositive: true }, variant: 'cyan' },
  { id: 2, icon: '🌍', title: 'Recycling Rate', value: '78', unit: '%', trend: { value: 5, isPositive: true }, variant: 'success' },
  { id: 3, icon: '🏢', title: 'Active Vendors', value: '24', unit: '', trend: { value: 3, isPositive: true }, variant: 'warning' },
  { id: 4, icon: '💰', title: 'Revenue', value: '45,600', unit: 'THB', trend: { value: 8, isPositive: true }, variant: 'danger' },
];

const mockChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 500 },
  { name: 'Mar', value: 450 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 750 },
];

const mockPieData = [
  { name: 'Plastic', value: 35 },
  { name: 'Glass', value: 25 },
  { name: 'Metal', value: 20 },
  { name: 'Other', value: 20 },
];

const mockTableData = [
  { id: 1, vendor: 'Green Waste Co.', type: 'Hauler', status: 'Active', collected: '450 kg' },
  { id: 2, vendor: 'Eco Recycling', type: 'Recycler', status: 'Active', collected: '320 kg' },
  { id: 3, vendor: 'Clean Earth', type: 'Processor', status: 'Inactive', collected: '180 kg' },
];

const tableColumns = [
  { key: 'vendor', label: 'Vendor Name' },
  { key: 'type', label: 'Type' },
  {
    key: 'status',
    label: 'Status',
    render: (status) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Active' ? 'bg-aeco-success/20 text-aeco-success' : 'bg-aeco-danger/20 text-aeco-danger'}`}>
        {status}
      </span>
    ),
  },
  { key: 'collected', label: 'Collected' },
];

export const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={mockChartData} title="📊 Monthly Waste Collection" />
        <PieChart data={mockPieData} title="🥧 Waste Composition" />
      </div>

      {/* Line Chart */}
      <LineChart data={mockChartData} title="📈 Recycling Rate Trend" />

      {/* Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">🏢 Vendor Performance</h2>
        <DataTable columns={tableColumns} data={mockTableData} />
      </div>
    </div>
  );
};

export default Dashboard;
