import { useMemo, useState } from "react";
import type { Cell } from "@/types";
import { useCells } from "./hooks";
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
import { CellFormDialog } from "./cell-form-dialog";

export function CellsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<Cell | null>(null);

  const { data: cells, isLoading, error } = useCells();

  const filteredCells = useMemo(() => {
    if (!cells) return [];
    if (!searchQuery) return cells;

    const query = searchQuery.toLowerCase();
    return cells.filter(
      (cell) =>
        cell.cellNumber.toLowerCase().includes(query) ||
        cell.blockName.toLowerCase().includes(query) ||
        cell.securityLevel.toLowerCase().includes(query)
    );
  }, [cells, searchQuery]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Error loading cells</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cells</h1>
        <p className="text-muted-foreground">Manage cell information and occupancy</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Cells</CardTitle>
          <CardDescription>Overview of all cells and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by cell number, block, or security level..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              onClick={() => {
                setEditingCell(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" aria-hidden />
              Add Cell
            </Button>
          </div>

          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredCells.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No cells found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cell Number</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Security Level</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCells.map((cell) => (
                  <TableRow key={cell.id}>
                    <TableCell className="font-medium">{cell.cellNumber}</TableCell>
                    <TableCell>{cell.blockName}</TableCell>
                    <TableCell>{cell.cellType}</TableCell>
                    <TableCell>
                      <Badge variant={cell.securityLevel === 'High' ? 'destructive' : 'default'}>
                        {cell.securityLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{cell.capacity}</TableCell>
                    <TableCell>
                      <span className={cell.currentOccupancy >= cell.capacity ? 'text-destructive font-medium' : ''}>
                        {cell.currentOccupancy}/{cell.capacity}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cell.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCell(cell);
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

      <CellFormDialog
        open={dialogOpen}
        mode={editingCell ? "edit" : "create"}
        cell={editingCell}
        onClose={() => {
          setDialogOpen(false);
          setEditingCell(null);
        }}
      />
    </div>
  );
}
