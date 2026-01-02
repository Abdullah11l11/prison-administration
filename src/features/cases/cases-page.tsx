import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { Case } from '@/types';
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
import { formatDate } from '@/lib/utils';

export function CasesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cases, isLoading, error } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const response = await apiClient.get<Case[]>('/api/cases');
      return response.data;
    },
  });

  const filteredCases = useMemo(() => {
    if (!cases) return [];
    if (!searchQuery) return cases;

    const query = searchQuery.toLowerCase();
    return cases.filter(
      (c) =>
        c.caseNumber.toLowerCase().includes(query) ||
        c.courtName.toLowerCase().includes(query) ||
        c.caseType.toLowerCase().includes(query)
    );
  }, [cases, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading cases</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
        <p className="text-muted-foreground">Manage legal cases and court records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
          <CardDescription>A list of all legal cases in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by case number, court, or type..."
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
          ) : filteredCases.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No cases found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Open Date</TableHead>
                  <TableHead>Close Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.caseNumber}</TableCell>
                    <TableCell>{c.courtName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{c.caseType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.status === 'Open' ? 'default' : 'secondary'}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(c.openDate)}</TableCell>
                    <TableCell>{c.closeDate ? formatDate(c.closeDate) : '-'}</TableCell>
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
