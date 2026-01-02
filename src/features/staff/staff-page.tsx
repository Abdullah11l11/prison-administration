import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import type { Staff } from '@/types';
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

export function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: staff, isLoading, error } = useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const response = await apiClient.get<Staff[]>('/api/staff');
      return response.data;
    },
  });

  const filteredStaff = useMemo(() => {
    if (!staff) return [];
    if (!searchQuery) return staff;

    const query = searchQuery.toLowerCase();
    return staff.filter(
      (member) =>
        member.fullName.toLowerCase().includes(query) ||
        member.position.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
    );
  }, [staff, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading staff</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">Manage staff members and their information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Staff Members</CardTitle>
          <CardDescription>A list of all staff members in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, position, or email..."
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
          ) : filteredStaff.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No staff members found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.fullName}</TableCell>
                    <TableCell>{member.nationalId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.position}</Badge>
                    </TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.status === 'Active' ? 'success' : 'secondary'}>
                        {member.status}
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
