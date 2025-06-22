import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/loader/loader';
import api from '@/utils/api';

interface Metrics {
  totalCreated: number;
  active: number;
  expired: number;
  totalIssued: number;
  percentIssued: number;
  currencyBreakdown: Record<string, number>;
  recentActions: { voucher: { name: string }; user: { email: string }; updatedAt: string }[];
}

const DashboardStats: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await api.getDashboardMetrics()
        console.log("metrics",response.data);
        setMetrics(response?.data?.data?.metrics);
      } catch (err: any) {
        setError(err.message || 'Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <p><LoadingSpinner/></p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!metrics) return null;

  return (
    <div className="space-y-8">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.totalCreated}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.active}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.expired}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.totalIssued}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percent Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.percentIssued.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Currency Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Object.entries(metrics.currencyBreakdown).map(([currency, count]) => (
            <Badge key={currency} className="px-3 py-1">
              {currency}: {count}
            </Badge>
          ))}
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Recent Voucher Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.recentActions.map((act, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{act.voucher.name}</p>
                <p className="text-sm text-gray-600">{act.user.email}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(act.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;