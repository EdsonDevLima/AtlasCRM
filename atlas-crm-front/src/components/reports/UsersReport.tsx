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
import api from '../../service/api';
import type { ICustomer } from '../../types/customers';
import Styles from './Reports.module.css';

type ChartData = {
  week: string;
  customers: number;
};

type PieData = {
  name: string;
  value: number;
};

const PIE_COLORS = ['#1f7a3f', '#2f9e52', '#e0b300', '#1c2b42'];

export function UsersReport() {
  const [isOpen, setIsOpen] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([
    { week: 'Primeira Semana', customers: 0 },
    { week: 'Segunda Semana', customers: 0 },
    { week: 'Terceira Semana', customers: 0 },
    { week: 'Quarta Semana', customers: 0 },
  ]);
  const [pieData, setPieData] = useState<PieData[]>([]);

  const [allCustomers, setAllCustomers] = useState<ICustomer[]>([]);

  const getCustomers = async () => {
    try {
      const response = await api.get("user/customers");
      const data = response.data.items as ICustomer[] || [];
      setAllCustomers(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
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
    getCustomers();
  }, []);

  useEffect(() => {
    if (allCustomers.length === 0) return;

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const start30DaysAgo = new Date();
    start30DaysAgo.setDate(now.getDate() - 30);
    start30DaysAgo.setHours(0, 0, 0, 0);

    const newChartData: ChartData[] = [
      { week: 'Primeira', customers: 0 },
      { week: 'Segunda', customers: 0 },
      { week: 'Terceira', customers: 0 },
      { week: 'Quarta', customers: 0 },
    ];

    allCustomers.forEach(customer => {
      const createdAt = parseDate(customer.createdAt || '');

      if (createdAt >= start30DaysAgo && createdAt <= now) {
        const diffInMs = createdAt.getTime() - start30DaysAgo.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const weekIndex = Math.min(Math.floor(diffInDays / 7), 3);

        newChartData[weekIndex].customers += 1;
      }
    });

    setChartData(newChartData);
    setPieData(
      newChartData.map((item) => ({
        name: item.week,
        value: item.customers,
      }))
    );
  }, [allCustomers]);

  const totalCustomers = chartData.reduce((sum, item) => sum + item.customers, 0);
  const peakWeek = chartData.reduce(
    (best, current) => (current.customers > best.customers ? current : best),
    chartData[0]
  );

  return (
    <div className={Styles.reportContainer}>
      <h3 
        className={Styles.reportTitle} 
        onClick={() => setIsOpen(!isOpen)}
      >
        Relatório de clientes por semana 
        <span className={`${Styles.arrow} ${isOpen ? Styles.arrowOpen : ''}`}>
          ▼
        </span>
      </h3>
      
      <div className={`${Styles.chartWrapper} ${isOpen ? Styles.chartOpen : ''}`}>
        <div className={Styles.reportSummary}>
          <div>
            <span>Total no período</span>
            <strong>{totalCustomers}</strong>
          </div>
          <div>
            <span>Semana mais forte</span>
            <strong>{peakWeek.week}</strong>
          </div>
        </div>

        <div className={Styles.dualChartGrid}>
          <div className={Styles.chartPanel}>
            <h4 className={Styles.chartLabel}>Clientes por semana</h4>
            <div className={Styles.chartInner}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="customers"
                    name="Clientes cadastrados na semana"
                    fill="#2c399dff"
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
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`customers-cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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
