import type { LucideIcon } from 'lucide-react';

export interface UserRoles {
  FIELD_OFFICER: string;
  DAO: string;
  LEGAL_OFFICER: string;
  LAB_COORDINATOR: string;
  HQ_MONITORING: string;
  DISTRICT_ADMIN: string;
  FARMER: string; 
  DEALER: string;
}

export type UserRole = UserRoles[keyof UserRoles];

export interface TabDefinition {
  id: string;
  icon: LucideIcon;
  text: string;
  ariaLabel: string;
  allowedRoles: UserRole[];
  hiddenInSidebar?: boolean; 
  subTabs?: TabDefinition[]; // For potential future nested navigation
}

export interface ProductDetails {
  activeIngredient?: string;
  composition?: string;
  varieties?: string[];
  packaging: string[];
  batchFormat?: string;
  commonCounterfeitMarkers?: string[];
  hologramFeatures?: string[];
  bagColor?: string;
  subsidizedRate?: number;
  mrp: number | { [key: string]: number };
}

export interface ProductBrand {
  [productName: string]: ProductDetails;
}

export interface ProductCategory {
  [brandName: string]: ProductBrand;
}

export interface ProductDatabase {
  pesticides: ProductCategory;
  fertilizers: ProductCategory;
  seeds: ProductCategory;
}

export interface InspectionTask {
  id: string;
  officer: string;
  date: string;
  location: string;
  targetType: string;
  equipment: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Seizure {
  id: string;
  company: string;
  product: string;
  batchNumber: string;
  authenticityScore: number;
  issues: string[];
  recommendation: string;
  geoLocation: string;
  timestamp: string;
  quantity?: string;
  estimatedValue?: string;
  witnessName?: string;
  evidencePhotos?: string[];
  videoEvidence?: string;
  status: 'pending' | 'dispatched' | 'lab-received' | 'report-generated' | 'fir-filed';
}

export interface LabSample extends Seizure {
  sampleType: string;
  labDestination: string;
  status: 'in-transit' | 'received' | 'testing' | 'completed' | 'violation' | 'compliant'; // Extended from Seizure status
}

export interface FIRCase {
  id: string;
  seizureId?: string; // Link to seizure
  labReportId: string;
  violationType: string;
  accused: string;
  location: string;
  status: 'draft' | 'submitted' | 'pending-court' | 'closed';
  details?: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

// For Form Renderer Module
export type FormData = Record<string, any>;

export interface AppContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  allowedTabs: TabDefinition[];
  
  inspectionTasks: InspectionTask[];
  addInspectionTask: (task: Omit<InspectionTask, 'id' | 'status'>) => void;
  
  seizures: Seizure[];
  addSeizure: (seizure: Omit<Seizure, 'id' | 'status'>) => void;
  updateSeizureStatus: (seizureId: string, status: Seizure['status']) => void;
  
  labSamples: LabSample[];
  addLabSample: (sample: Omit<LabSample, 'id' | 'status'>) => void;
  updateLabSampleStatus: (sampleId: string, status: LabSample['status']) => void;
  
  firCases: FIRCase[];
  addFIRCase: (firCase: Omit<FIRCase, 'id' | 'status'>) => void;
  updateFIRCaseStatus: (caseId: string, status: FIRCase['status']) => void;

  // State for Forms Portal integration
  selectedFormType: string | null;
  setSelectedFormType: (formType: string | null) => void;
  
  // To handle navigation from catalog to form renderer
  navigateToForm: (formType: string) => void; 
}
