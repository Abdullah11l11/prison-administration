import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { HealthRecord } from '@/types';
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

export function HealthRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: healthRecords, isLoading, error } = useQuery({
    queryKey: ['health-records'],
    queryFn: async () => {
      const response = await apiClient.get<HealthRecord[]>('/api/health-records');
      return response.data;
    },
  });

  const filteredRecords = useMemo(() => {
    if (!healthRecords) return [];
    if (!searchQuery) return healthRecords;

    const query = searchQuery.toLowerCase();
    return healthRecords.filter(
      (r) =>
        r.recordType.toLowerCase().includes(query) ||
        r.diagnosis.toLowerCase().includes(query) ||
        r.treatment.toLowerCase().includes(query)
    );
  }, [healthRecords, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading health records</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Records</h1>
        <p className="text-muted-foreground">Manage prisoner health and medical records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Health Records</CardTitle>
          <CardDescription>Medical records and health checkups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type, diagnosis, or treatment..."
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
          ) : filteredRecords.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No health records found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Prisoner ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.healthRecordId}</TableCell>
                    <TableCell>{record.prisonerId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.recordType}</Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(record.recordDate)}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Open' ? 'default' : 'secondary'}>
                        {record.status}
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
