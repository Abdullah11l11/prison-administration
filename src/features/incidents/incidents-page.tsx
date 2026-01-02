import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Incident } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { formatDateTime } from '@/lib/utils';

export function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const response = await apiClient.get<Incident[]>('/api/incidents');
      return response.data;
    },
  });

  const filteredIncidents = useMemo(() => {
    if (!incidents) return [];
    if (!searchQuery) return incidents;

    const query = searchQuery.toLowerCase();
    return incidents.filter(
      (i) =>
        i.incidentType.toLowerCase().includes(query) ||
        i.severity.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query)
    );
  }, [incidents, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading incidents</h3>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
        <p className="text-muted-foreground">Track and manage security incidents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>A list of all reported incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type, severity, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No incidents found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Prisoner ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.incidentId}</TableCell>
                    <TableCell>{incident.prisonerId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{incident.incidentType}</Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(incident.incidentDate)}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                    <TableCell>
                      <Badge variant={incident.status === 'Closed' ? 'secondary' : 'default'}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
