import { useState, useEffect } from 'react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { BarChart } from '../components/dashboard/BarChart';
import { LineChart } from '../components/dashboard/LineChart';
import { PieChart } from '../components/dashboard/PieChart';
import { DataTable } from '../components/common/DataTable';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertCircle, Package, Droplet, Leaf, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { language, t } = useLanguage();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with Firebase data
  const mockData = {
    kpis: {
      totalOrders: 125,
      totalWeight: 45800,
      esgScore: 84.4,
      co2Avoided: 31.2,
      recyclingRate: 20.7,
    },
    monthlyTrend: [
      { month: 'Jan', waste: 3200, recycled: 640 },
      { month: 'Feb', waste: 3800, recycled: 760 },
      { month: 'Mar', waste: 4100, recycled: 820 },
      { month: 'Apr', waste: 3900, recycled: 780 },
      { month: 'May', waste: 4500, recycled: 900 },
    ],
    wasteComposition: [
      { name: language === 'en' ? 'Plastic' : 'พลาสติก', value: 35, percentage: 28 },
      { name: language === 'en' ? 'Paper' : 'กระดาษ', value: 28, percentage: 22 },
      { name: language === 'en' ? 'Glass' : 'แก้ว', value: 25, percentage: 20 },
      { name: language === 'en' ? 'Metal' : 'โลหะ', value: 20, percentage: 16 },
      { name: language === 'en' ? 'Organic' : 'วัสดุอินทรีย์', value: 17, percentage: 14 },
    ],
  };

  const mockTableData = [
    { id: 1, vendor: 'Green Waste Co.', type: language === 'en' ? 'Hauler' : 'ขนส่ง', status: 'Active', collected: '450 kg' },
    { id: 2, vendor: 'Eco Recycling', type: language === 'en' ? 'Recycler' : 'รีไซเคิล', status: 'Active', collected: '320 kg' },
    { id: 3, vendor: 'Clean Earth', type: language === 'en' ? 'Processor' : 'แปรรูป', status: 'Inactive', collected: '180 kg' },
  ];

  const tableColumns = [
    { key: 'vendor', label: language === 'en' ? 'Vendor Name' : 'ชื่อผู้ขายขยะ' },
    { key: 'type', label: language === 'en' ? 'Type' : 'ประเภท' },
    {
      key: 'status',
      label: language === 'en' ? 'Status' : 'สถานะ',
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'Active' ? 'bg-aeco-success/20 text-aeco-success' : 'bg-aeco-danger/20 text-aeco-danger'}`}>
          {status === 'Active' ? (language === 'en' ? 'Active' : 'ใช้งานอยู่') : (language === 'en' ? 'Inactive' : 'ไม่ใช้งาน')}
        </span>
      ),
    },
    { key: 'collected', label: language === 'en' ? 'Collected' : 'รวบรวม' },
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{language === 'en' ? 'Loading dashboard...' : 'กำลังโหลด...'}</p>
        </div>
      </div>
    );
  }

  const translations = {
    en: {
      dashboard: 'Dashboard',
      wasteManagement: 'Waste Management Overview',
      totalOrders: 'Total Orders',
      totalWeight: 'Total Weight',
      thisMonth: 'This Month',
      monthlyTrend: 'Monthly Waste Collection Trend',
      wasteComposition: 'Waste Composition (by Type)',
      esgPerformance: 'ESG Performance',
      esgScore: 'ESG Score',
      co2Avoided: 'CO₂ Avoided',
      recyclingRate: 'Recycling Rate',
      lastUpdate: 'Last Updated',
      vendorPerformance: 'Vendor Performance',
    },
    th: {
      dashboard: 'แดชบอร์ด',
      wasteManagement: 'ภาพรวมการจัดการขยะ',
      totalOrders: 'จำนวนใบสั่งซื้อทั้งหมด',
      totalWeight: 'น้ำหนักขยะทั้งหมด',
      thisMonth: 'เดือนนี้',
      monthlyTrend: 'แนวโน้มการเก็บรวบรวมขยะรายเดือน',
      wasteComposition: 'องค์ประกอบของขยะ (ตามประเภท)',
      esgPerformance: 'ประสิทธิภาพ ESG',
      esgScore: 'คะแนน ESG',
      co2Avoided: 'CO₂ ที่หลีกเลี่ยง',
      recyclingRate: 'อัตราการรีไซเคิล',
      lastUpdate: 'อัปเดตล่าสุด',
      vendorPerformance: 'ประสิทธิภาพผู้ขายขยะ',
    },
  };

  const t_dash = translations[language];

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-6 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          {t_dash.dashboard}
        </h1>
        <p className="text-slate-400">{t_dash.wasteManagement}</p>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* ===== KPI CARDS SECTION (4 Cards: Business-Focused) ===== */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Total Orders */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{t_dash.totalOrders}</p>
                  <p className="text-slate-500 text-xs">{t_dash.thisMonth}</p>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Package className="text-cyan-400" size={24} />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-cyan-400">{dashboardData?.kpis.totalOrders}</p>
                <p className="text-green-400 text-sm font-semibold mb-1">↑ 12%</p>
              </div>
              <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* KPI 2: Total Weight */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-emerald-400/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{t_dash.totalWeight}</p>
                  <p className="text-slate-500 text-xs">{t_dash.thisMonth}</p>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Droplet className="text-emerald-400" size={24} />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-emerald-400">
                  {(dashboardData?.kpis.totalWeight / 1000).toFixed(1)}
                  <span className="text-lg text-slate-400">T</span>
                </p>
                <p className="text-green-400 text-sm font-semibold mb-1">↑ 8%</p>
              </div>
              <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: '62%' }}></div>
              </div>
            </div>

            {/* KPI 3: CO2 Avoided (ESG) */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{t_dash.co2Avoided}</p>
                  <p className="text-slate-500 text-xs">ESG {language === 'en' ? 'Metric' : 'ตัวชี้วัด'}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Leaf className="text-green-400" size={24} />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-green-400">
                  {dashboardData?.kpis.co2Avoided}
                  <span className="text-lg text-slate-400">T</span>
                </p>
                <p className="text-green-400 text-sm font-semibold mb-1">↑ 5%</p>
              </div>
              <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* KPI 4: ESG Score */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{t_dash.esgScore}</p>
                  <p className="text-slate-500 text-xs">{language === 'en' ? 'Overall Rating' : 'คะแนนรวม'}</p>
                </div>
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <TrendingUp className="text-amber-400" size={24} />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-amber-400">
                  {dashboardData?.kpis.esgScore}
                  <span className="text-lg text-slate-400">/100</span>
                </p>
              </div>
              <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CHARTS SECTION ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Monthly Waste Trend */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
              {t_dash.monthlyTrend}
            </h3>
            <BarChart data={dashboardData?.monthlyTrend || []} />
          </div>

          {/* Chart 2: Waste Composition Pie */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
              {t_dash.wasteComposition}
            </h3>
            <PieChart data={dashboardData?.wasteComposition || []} />
          </div>

          {/* Chart 3: ESG Performance Trend */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              {t_dash.esgPerformance}
            </h3>
            <LineChart data={dashboardData?.monthlyTrend || []} />
          </div>
        </section>

        {/* ===== VENDOR PERFORMANCE TABLE ===== */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🏢</span>
            {t_dash.vendorPerformance}
          </h2>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
            <DataTable columns={tableColumns} data={mockTableData} />
          </div>
        </section>

        {/* Last Update Info */}
        <div className="text-center text-sm text-slate-500 flex items-center justify-center gap-2">
          <AlertCircle size={16} />
          {t_dash.lastUpdate}: {new Date().toLocaleString(language === 'th' ? 'th-TH' : 'en-US')}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
