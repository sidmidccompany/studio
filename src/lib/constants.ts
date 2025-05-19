import type { TabDefinition, ProductDatabase, UserRoles } from '@/lib/types';
import { 
  BarChart3, Calendar, Camera, Package, Scale, Building, FileSearch, ShieldAlert, Timer, FileText, LayoutDashboard, Archive, Settings2, BarChart2, ClipboardList
} from 'lucide-react';

export const USER_ROLES: UserRoles = {
  FIELD_OFFICER: 'Field Officer',
  DAO: 'District Agricultural Officer',
  LEGAL_OFFICER: 'Legal Officer',
  LAB_COORDINATOR: 'Lab Coordinator',
  HQ_MONITORING: 'HQ Monitoring Cell',
  DISTRICT_ADMIN: 'District Admin',
  FARMER: 'Farmer', // Added for form portal context
  DEALER: 'Dealer/Retailer' // Added for form portal context
};

export const TABS: TabDefinition[] = [
  // Agri Shield Core Modules (adapted from CropSafeAI)
  { 
    id: 'agri-shield-dashboard', 
    icon: LayoutDashboard, 
    text: 'Agri Shield Dashboard',
    ariaLabel: 'View Agri Shield monitoring dashboard',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  // Forms Portal Modules
  {
    id: 'forms-dashboard',
    icon: BarChart2, // Changed from BarChart3 to differentiate
    text: 'Forms Dashboard',
    ariaLabel: 'View Forms Dashboard',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.FARMER, USER_ROLES.DEALER, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  {
    id: 'forms-catalog',
    icon: FileText,
    text: 'Forms Catalog',
    ariaLabel: 'Browse and select forms',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.FARMER, USER_ROLES.DEALER, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  {
    id: 'form-renderer', // This might be hidden from sidebar but navigable
    icon: FileText, // Placeholder, might not be shown
    text: 'Fill Form',
    ariaLabel: 'Fill out a selected form',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.FARMER, USER_ROLES.DEALER, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN],
    hiddenInSidebar: true, // Custom property to hide from sidebar
  },
  {
    id: 'form-submissions',
    icon: Archive,
    text: 'Form Submissions',
    ariaLabel: 'View and manage form submissions',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.FARMER, USER_ROLES.DEALER, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  {
    id: 'form-reports',
    icon: ClipboardList,
    text: 'Form Reports',
    ariaLabel: 'Generate and view reports from form data',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN]
  },
  // AI and Operational Modules (from CropSafeAI, adjusted)
  {
    id: 'crop-health-report',
    icon: ShieldAlert,
    text: 'AI Crop Health',
    ariaLabel: 'Generate AI Crop Health Report',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.HQ_MONITORING, USER_ROLES.FIELD_OFFICER]
  },
  {
    id: 'planting-schedule',
    icon: Timer,
    text: 'AI Planting Schedule',
    ariaLabel: 'Create AI Planting Schedule',
    allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.DISTRICT_ADMIN, USER_ROLES.FARMER]
  },
  { 
    id: 'inspection-planning', 
    icon: Calendar, 
    text: 'Inspection Planning',
    ariaLabel: 'Plan inspection visits',
    allowedRoles: [USER_ROLES.DISTRICT_ADMIN, USER_ROLES.DAO]
  },
  { 
    id: 'field-execution', 
    icon: Camera, 
    text: 'Field Execution',
    ariaLabel: 'Execute field inspections',
    allowedRoles: [USER_ROLES.FIELD_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'seizure-logging', 
    icon: Package, 
    text: 'Seizure Logging',
    ariaLabel: 'Log seized items',
    allowedRoles: [USER_ROLES.FIELD_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'legal-module', 
    icon: Scale, 
    text: 'Legal Module',
    ariaLabel: 'Legal enforcement actions',
    allowedRoles: [USER_ROLES.LEGAL_OFFICER, USER_ROLES.DAO]
  },
  { 
    id: 'lab-interface', 
    icon: Building, 
    text: 'Lab Interface',
    ariaLabel: 'Lab sample tracking',
    allowedRoles: [USER_ROLES.LAB_COORDINATOR, USER_ROLES.DAO]
  },
  { 
    id: 'system-audit', // Renamed from report-audit for clarity
    icon: FileSearch, 
    text: 'System Audit',
    ariaLabel: 'View system reports and audit logs',
    allowedRoles: [USER_ROLES.HQ_MONITORING, USER_ROLES.DAO, USER_ROLES.DISTRICT_ADMIN]
  },
  {
    id: 'settings',
    icon: Settings2,
    text: 'Settings',
    ariaLabel: 'Manage application settings',
     allowedRoles: [USER_ROLES.DAO, USER_ROLES.FIELD_OFFICER, USER_ROLES.FARMER, USER_ROLES.DEALER, USER_ROLES.HQ_MONITORING, USER_ROLES.DISTRICT_ADMIN, USER_ROLES.LEGAL_OFFICER, USER_ROLES.LAB_COORDINATOR]
  }
];

export const PRODUCT_DATABASE: ProductDatabase = {
  pesticides: {
    'UPL': {
      'Saaf': {
        activeIngredient: 'Carbendazim 12% + Mancozeb 63%',
        packaging: ['100g', '250g', '500g'],
        batchFormat: 'UPL-SAAF-YYYYMM-XXXXX',
        commonCounterfeitMarkers: ['Poor print quality', 'Wrong shade of green', 'Missing hologram'],
        mrp: { '100g': 120, '250g': 280, '500g': 520 }
      },
      'Ulala': {
        activeIngredient: 'Flonicamid 50% WG',
        packaging: ['100g', '500g'],
        batchFormat: 'UPL-ULA-YYYYMM-XXXXX',
        mrp: { '100g': 650, '500g': 3100 }
      },
    },
    'Bayer': {
      'Confidor': {
        activeIngredient: 'Imidacloprid 17.8% SL',
        packaging: ['50ml', '100ml', '250ml', '500ml'],
        hologramFeatures: ['3D hologram', 'Color-changing ink', 'Microtext'],
        mrp: { '50ml': 165, '100ml': 320, '250ml': 785, '500ml': 1550 }
      },
    },
  },
  fertilizers: {
    'IFFCO': {
      'DAP': {
        composition: '18-46-0',
        packaging: ['50kg'],
        bagColor: 'Green with IFFCO logo',
        subsidizedRate: 1350,
        mrp: 1350
      },
    },
  },
  seeds: {
    'Mahyco': {
      'Bt Cotton': {
        varieties: ['MECH-162', 'MECH-184'],
        packaging: ['450g'],
        mrp: { '450g': 930 }
      }
    },
  }
};
