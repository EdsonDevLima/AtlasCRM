import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { IProducts } from '../../types/products';
import api from '../../service/api';
import Styles from './Reports.module.css';

type ChartData = {
  week: string;
  entry: number;
};

type PieData = {
  name: string;
  value: number;
};

const PIE_COLORS = ['#1f7a3f', '#2f9e52', '#e0b300', '#1c2b42'];

export function ProductEntryReport() {
  const [isOpen, setIsOpen] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([
    { week: 'Primeira Semana', entry: 0 },
    { week: 'Segunda Semana', entry: 0 },
    { week: 'Terceira Semana', entry: 0 },
    { week: 'Quarta Semana', entry: 0 },
    
  ]);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);

  const getProducts = async () => {
    const response = await api.get('products/all');
    const items = (response.data.items as IProducts[]) || [];
    setAllProducts(items);
  };

  const parseDate = (dateString: string): Date => {
    let date = new Date(dateString);

    if (isNaN(date.getTime()) && dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        date = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      }
    }

    return date;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const start30DaysAgo = new Date();
    start30DaysAgo.setDate(now.getDate() - 30);
    start30DaysAgo.setHours(0, 0, 0, 0);

    const newChartData = [
      { week: 'Primeira', entry: 0 },
      { week: 'Segunda', entry: 0 },
      { week: 'Terceira', entry: 0 },
      { week: 'Quarta', entry: 0 },
    ];

    allProducts.forEach(product => {
      const createdAt = parseDate(product.createdAt || "");

      if (createdAt >= start30DaysAgo && createdAt <= now) {
        const diffInMs = createdAt.getTime() - start30DaysAgo.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const weekIndex = Math.min(Math.floor(diffInDays / 7), 3);

        newChartData[weekIndex].entry += 1;
      }
    });

    setChartData(newChartData);
    setPieData(
      newChartData.map((item) => ({
        name: item.week,
        value: item.entry,
      }))
    );
  }, [allProducts]);

  const totalEntries = chartData.reduce((sum, item) => sum + item.entry, 0);
  const peakWeek = chartData.reduce((best, current) =>
    current.entry > best.entry ? current : best
  , chartData[0]);

  return (
    <div className={Styles.reportContainer}>
      <h3 
        className={Styles.reportTitle} 
        onClick={() => setIsOpen(!isOpen)}
      >
        Relatório de entrada por semana 
        <span className={`${Styles.arrow} ${isOpen ? Styles.arrowOpen : ''}`}>
          ▼
        </span>
        </h3>
      
      <div className={`${Styles.chartWrapper} ${isOpen ? Styles.chartOpen : ''}`}>
        <div className={Styles.reportSummary}>
          <div>
            <span>Total no período</span>
            <strong>{totalEntries}</strong>
          </div>
          <div>
            <span>Semana mais forte</span>
            <strong>{peakWeek.week}</strong>
          </div>
        </div>

        <div className={Styles.dualChartGrid}>
          <div className={Styles.chartPanel}>
            <h4 className={Styles.chartLabel}>Entradas por semana</h4>
            <div className={Styles.chartInner}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="entry"
                    name="Produtos que entraram na semana"
                    fill="#4CAF50"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={Styles.chartPanel}>
            <h4 className={Styles.chartLabel}>Distribuição circular</h4>
            <div className={Styles.chartInner}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={3}
                    stroke="#ffffff"
                    strokeWidth={2}
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`entry-cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
