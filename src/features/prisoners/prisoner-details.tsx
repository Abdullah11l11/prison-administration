import { Prisoner } from '@/types';
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface PrisonerDetailsProps {
  prisoner: Prisoner | null;
  open: boolean;
  onClose: () => void;
}

export function PrisonerDetails({ prisoner, open, onClose }: PrisonerDetailsProps) {
  if (!prisoner) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
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
    <Sheet open={open} onClose={onClose}>
      <SheetClose onClose={onClose} />
      <SheetHeader>
        <SheetTitle>{prisoner.fullName}</SheetTitle>
        <SheetDescription>Prisoner ID: {prisoner.nationalId}</SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
            Basic Information
          </h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
              <dd className="mt-1 text-sm">{prisoner.gender}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
              <dd className="mt-1 text-sm">{formatDate(prisoner.dateOfBirth)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Admission Date</dt>
              <dd className="mt-1 text-sm">{formatDate(prisoner.admissionDate)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="mt-1 text-sm">
                <Badge variant="outline">{prisoner.status}</Badge>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
            Security Information
          </h3>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Risk Level</dt>
              <dd className="mt-1 text-sm">
                <Badge variant={getRiskColor(prisoner.riskLevel)}>
                  {prisoner.riskLevel}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Current Cell ID</dt>
              <dd className="mt-1 text-sm">{prisoner.currentCellId}</dd>
            </div>
          </dl>
        </div>

        {prisoner.notes && (
          <div>
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Notes</h3>
            <p className="text-sm text-muted-foreground">{prisoner.notes}</p>
          </div>
        )}
      </div>
    </Sheet>
  );
}
