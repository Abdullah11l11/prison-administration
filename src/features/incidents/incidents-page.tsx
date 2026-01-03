import { useMemo, useState } from "react";
import type { Incident } from "@/types";
import { useDeleteIncident, useIncidents } from "./hooks";
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
import { IncidentFormDialog } from "./incident-form-dialog";

export function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: incidents, isLoading, error } = useIncidents();
  const { mutateAsync: deleteIncident } = useDeleteIncident();

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
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by type, severity, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={() => {
                setEditingIncident(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              Add Incident
            </Button>
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
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingIncident(incident);
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
                                `Delete incident "${incident.incidentId}"? This cannot be undone.`
                              )
                            ) {
                              return;
                            }
                            try {
                              setDeletingId(incident.id);
                              await deleteIncident(incident.id);
                            } finally {
                              setDeletingId(null);
                            }
                          }}
                          disabled={deletingId === incident.id}
                        >
                          {deletingId === incident.id && (
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

      <IncidentFormDialog
        open={dialogOpen}
        mode={editingIncident ? "edit" : "create"}
        incident={editingIncident}
        onClose={() => {
          setDialogOpen(false);
          setEditingIncident(null);
        }}
      />
    </div>
  );
}
