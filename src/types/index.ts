export interface Cell {
  id: number;
  cellId: number;
  blockName: string;
  securityLevel: string;
  cellNumber: string;
  capacity: number;
  currentOccupancy: number;
  cellType: string;
  notes: string;
}

export interface Staff {
  id: number;
  staffId: number;
  fullName: string;
  nationalId: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  notes: string;
}

export interface UserAccount {
  id: number;
  userId: number;
  staffId: number;
  username: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
}

export interface Prisoner {
  id: number;
  prisonerId: number;
  fullName: string;
  nationalId: string;
  gender: string;
  dateOfBirth: string;
  admissionDate: string;
  status: string;
  riskLevel: string;
  currentCellId: number;
  notes: string;
}

export interface CellAssignment {
  id: number;
  assignmentId: number;
  prisonerId: number;
  cellId: number;
  startDate: string;
  endDate: string | null;
  reason: string;
}

export interface Case {
  id: number;
  caseId: number;
  caseNumber: string;
  courtName: string;
  caseType: string;
  status: string;
  openDate: string;
  closeDate: string | null;
}

export interface CrimeRecord {
  id: number;
  crimeId: number;
  prisonerId: number;
  caseId: number;
  crimeTitle: string;
  crimeDetails: string;
  crimeDate: string;
  sentenceYears: number;
  sentenceMonths: number;
  sentenceStart: string;
  sentenceEnd: string;
  status: string;
}

export interface Visitor {
  id: number;
  visitorId: number;
  fullName: string;
  nationalId: string;
  phone: string;
  relationshipToPrisoner: string;
  notes: string;
}

export interface Visit {
  id: number;
  visitId: number;
  prisonerId: number;
  visitorId: number;
  visitDate: string;
  visitType: string;
  status: string;
  notes: string;
}

export interface Incident {
  id: number;
  incidentId: number;
  prisonerId: number;
  reportedByStaffId: number;
  incidentType: string;
  incidentDate: string;
  description: string;
  severity: string;
  actionTaken: string;
  status: string;
}

export interface HealthRecord {
  id: number;
  healthRecordId: number;
  prisonerId: number;
  recordType: string;
  recordDate: string;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  status: string;
  notes: string;
}

export interface Document {
  id: number;
  documentId: number;
  prisonerId: number;
  caseId: number;
  documentType: string;
  filePath: string;
  uploadedBy: number;
  uploadedAt: string;
  notes: string;
}

export type ApiResponse<T> = {
  data: T;
  status: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
