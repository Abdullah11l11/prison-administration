import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Prisoner, Cell, Staff, Incident } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, UserCog, AlertTriangle, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const { data: prisoners } = useQuery({
    queryKey: ['prisoners'],
    queryFn: async () => {
      const response = await apiClient.get<Prisoner[]>('/api/prisoners');
      return response.data;
    },
  });

  const { data: cells } = useQuery({
    queryKey: ['cells'],
    queryFn: async () => {
      const response = await apiClient.get<Cell[]>('/api/cells');
      return response.data;
    },
  });

  const { data: staff } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const response = await apiClient.get<Staff[]>('/api/staff');
      return response.data;
    },
  });

  const { data: incidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const response = await apiClient.get<Incident[]>('/api/incidents');
      return response.data;
    },
  });

  const totalCapacity = cells?.reduce((sum, cell) => sum + cell.capacity, 0) || 0;
  const totalOccupancy = cells?.reduce((sum, cell) => sum + cell.currentOccupancy, 0) || 0;
  const occupancyRate = totalCapacity > 0 ? ((totalOccupancy / totalCapacity) * 100).toFixed(1) : 0;

  const activeStaff = staff?.filter((s) => s.status === 'Active').length || 0;
  const openIncidents = incidents?.filter((i) => i.status === 'Open').length || 0;

  const stats = [
    {
      title: 'Total Prisoners',
      value: prisoners?.length || 0,
      description: `${prisoners?.filter((p) => p.riskLevel === 'High').length || 0} high risk`,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Cells Occupancy',
      value: `${occupancyRate}%`,
      description: `${totalOccupancy} / ${totalCapacity} occupied`,
      icon: Building2,
      color: 'text-green-600',
    },
    {
      title: 'Active Staff',
      value: activeStaff,
      description: `${staff?.length || 0} total staff members`,
      icon: UserCog,
      color: 'text-purple-600',
    },
    {
      title: 'Open Incidents',
      value: openIncidents,
      description: `${incidents?.length || 0} total incidents`,
      icon: AlertTriangle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of prison administration system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Breakdown of prisoners by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['High', 'Medium', 'Low'].map((level) => {
                const count = prisoners?.filter((p) => p.riskLevel === level).length || 0;
                const percentage = prisoners?.length
                  ? ((count / prisoners.length) * 100).toFixed(0)
                  : 0;
                return (
                  <div key={level} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{level} Risk</span>
                      <span className="text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full ${
                          level === 'High'
                            ? 'bg-red-500'
                            : level === 'Medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">System Status</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Prisoner Count</p>
                  <p className="text-xs text-muted-foreground">
                    {prisoners?.length || 0} currently incarcerated
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Incident Reports</p>
                  <p className="text-xs text-muted-foreground">
                    {openIncidents} incidents require attention
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
