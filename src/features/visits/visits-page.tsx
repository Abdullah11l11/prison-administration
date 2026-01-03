import { useMemo, useState } from "react";
import type { Visit } from "@/types";
import { useDeleteVisit, useVisits } from "./hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, Pencil, Plus, Search } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { VisitFormDialog } from "./visit-form-dialog";

export function VisitsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: visits, isLoading, error } = useVisits();
  const { mutateAsync: deleteVisit } = useDeleteVisit();

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
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={() => {
                setEditingVisit(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              Add Visit
            </Button>
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
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingVisit(visit);
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" aria-hidden />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={async () => {
                            if (
                              !window.confirm(
                                `Delete visit "${visit.visitId}"? This cannot be undone.`
                              )
                            ) {
                              return;
                            }
                            try {
                              setDeletingId(visit.id);
                              await deleteVisit(visit.id);
                            } finally {
                              setDeletingId(null);
                            }
                          }}
                          disabled={deletingId === visit.id}
                        >
                          {deletingId === visit.id && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                          )}
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <VisitFormDialog
        open={dialogOpen}
        mode={editingVisit ? "edit" : "create"}
        visit={editingVisit}
        onClose={() => {
          setDialogOpen(false);
          setEditingVisit(null);
        }}
      />
    </div>
  );
}
