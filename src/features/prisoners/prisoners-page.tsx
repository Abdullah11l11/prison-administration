import { useMemo, useState } from "react";
import type { Prisoner } from "@/types";
import { usePrisoners } from "./hooks";
import { PrisonerDetails } from "./prisoner-details";
import { PrisonerFormDialog } from "./prisoner-form-dialog";
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
import { formatDate } from "@/lib/utils";

export function PrisonersPage() {
  const { data: prisoners, isLoading, error } = usePrisoners();
  const [selectedPrisoner, setSelectedPrisoner] = useState<Prisoner | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPrisoner, setEditingPrisoner] = useState<Prisoner | null>(
    null
  );

  const filteredPrisoners = useMemo(() => {
    if (!prisoners) return [];
    if (!searchQuery) return prisoners;

    const query = searchQuery.toLowerCase();
    return prisoners.filter(
      (prisoner) =>
        prisoner.fullName.toLowerCase().includes(query) ||
        prisoner.nationalId.toLowerCase().includes(query) ||
        prisoner.status.toLowerCase().includes(query)
    );
  }, [prisoners, searchQuery]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">
            Error loading prisoners
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prisoners</h1>
        <p className="text-muted-foreground">
          Manage prisoner information and records
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Prisoners</CardTitle>
          <CardDescription>
            A list of all prisoners in the system with their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={() => {
                setEditingPrisoner(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              Add Prisoner
            </Button>
          </div>

          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredPrisoners.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "No prisoners found matching your search"
                    : "No prisoners found"}
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Cell</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrisoners.map((prisoner) => (
                  <TableRow
                    key={prisoner.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedPrisoner(prisoner)}
                  >
                    <TableCell className="font-medium">
                      {prisoner.fullName}
                    </TableCell>
                    <TableCell>{prisoner.nationalId}</TableCell>
                    <TableCell>{prisoner.gender}</TableCell>
                    <TableCell>{formatDate(prisoner.admissionDate)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{prisoner.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(prisoner.riskLevel)}>
                        {prisoner.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{prisoner.currentCellId}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(event) => {
                          event.stopPropagation();
                          setEditingPrisoner(prisoner);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" aria-hidden />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <PrisonerDetails
        prisoner={selectedPrisoner}
        open={!!selectedPrisoner}
        onClose={() => setSelectedPrisoner(null)}
      />

      <PrisonerFormDialog
        open={dialogOpen}
        mode={editingPrisoner ? "edit" : "create"}
        prisoner={editingPrisoner}
        onClose={() => {
          setDialogOpen(false);
          setEditingPrisoner(null);
        }}
      />
    </div>
  );
}
