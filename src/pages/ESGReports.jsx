import { MetricCard } from '../components/dashboard/MetricCard';
import { BarChart } from '../components/dashboard/BarChart';
import { LineChart } from '../components/dashboard/LineChart';
import { PieChart } from '../components/dashboard/PieChart';
import { Button } from '../components/common/Button';

const esgData = [
  { name: 'Jan', value: 320 },
  { name: 'Feb', value: 380 },
  { name: 'Mar', value: 450 },
  { name: 'Apr', value: 520 },
  { name: 'May', value: 650 },
];

const wasteComposition = [
  { name: 'Plastic', value: 40 },
  { name: 'Glass', value: 25 },
  { name: 'Metal', value: 20 },
  { name: 'Organic', value: 15 },
];

export const ESGReports = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">🌍 ESG & Reports</h1>
          <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
            Environmental, Social, and Governance metrics
          </p>
        </div>
        <Button>📊 Generate Report</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon="♻️"
          title="Total Recycled"
          value="3,250"
          unit="kg"
          trend={{ value: 15, isPositive: true }}
          variant="success"
        />
        <MetricCard
          icon="🌱"
          title="CO₂ Reduced"
          value="1,840"
          unit="kg"
          trend={{ value: 12, isPositive: true }}
          variant="success"
        />
        <MetricCard
          icon="📈"
          title="Recycling Rate"
          value="78"
          unit="%"
          trend={{ value: 8, isPositive: true }}
          variant="cyan"
        />
        <MetricCard
          icon="⭐"
          title="ESG Score"
          value="8.5"
          unit="/10"
          variant="warning"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={esgData} title="📊 Monthly Waste Recycled" />
        <PieChart data={wasteComposition} title="🥧 Material Composition" />
      </div>

      {/* Trend */}
      <LineChart data={esgData} title="📈 ESG Performance Trend" />

      {/* Sustainability Goals */}
      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">🎯 Sustainability Goals</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>Increase Recycling Rate</span>
              <span className="text-aeco-cyan font-semibold">78%</span>
            </div>
            <div className="w-full bg-aeco-light-border dark:bg-aeco-dark-border rounded-full h-2">
              <div className="bg-aeco-cyan h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Reduce Carbon Emissions</span>
              <span className="text-aeco-success font-semibold">65%</span>
            </div>
            <div className="w-full bg-aeco-light-border dark:bg-aeco-dark-border rounded-full h-2">
              <div className="bg-aeco-success h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Vendor Compliance</span>
              <span className="text-aeco-warning font-semibold">92%</span>
            </div>
            <div className="w-full bg-aeco-light-border dark:bg-aeco-dark-border rounded-full h-2">
              <div className="bg-aeco-warning h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGReports;
