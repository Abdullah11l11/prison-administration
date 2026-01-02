import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Visit } from '@/types';
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

export function VisitsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: visits, isLoading, error } = useQuery({
    queryKey: ['visits'],
    queryFn: async () => {
      const response = await apiClient.get<Visit[]>('/api/visits');
      return response.data;
    },
  });

  const filteredVisits = useMemo(() => {
    if (!visits) return [];
    if (!searchQuery) return visits;

    const query = searchQuery.toLowerCase();
    return visits.filter(
      (v) =>
        v.visitType.toLowerCase().includes(query) ||
        v.status.toLowerCase().includes(query)
    );
  }, [visits, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading visits</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visits</h1>
        <p className="text-muted-foreground">Manage prisoner visitation records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Visits</CardTitle>
          <CardDescription>A list of all scheduled and completed visits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type or status..."
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
          ) : filteredVisits.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No visits found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visit ID</TableHead>
                  <TableHead>Prisoner ID</TableHead>
                  <TableHead>Visitor ID</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium">{visit.visitId}</TableCell>
                    <TableCell>{visit.prisonerId}</TableCell>
                    <TableCell>{visit.visitorId}</TableCell>
                    <TableCell>{formatDateTime(visit.visitDate)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{visit.visitType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={visit.status === 'Completed' ? 'success' : 'default'}>
                        {visit.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{visit.notes || '-'}</TableCell>
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
