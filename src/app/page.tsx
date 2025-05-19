"use client";

import React from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { TopHeader } from '@/components/TopHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

// Import modules
import DashboardModule from '@/components/modules/DashboardModule';
import InspectionPlanningModule from '@/components/modules/InspectionPlanningModule';
import FieldExecutionModule from '@/components/modules/FieldExecutionModule';
import SeizureLoggingModule from '@/components/modules/SeizureLoggingModule';
import LegalModule from '@/components/modules/LegalModule';
import LabInterfaceModule from '@/components/modules/LabInterfaceModule';
import ReportAuditModule from '@/components/modules/ReportAuditModule';
import CropReportModule from '@/components/modules/CropReportModule';
import PlantingScheduleModule from '@/components/modules/PlantingScheduleModule';

// New Agri Shield Forms Portal Modules
import FormsDashboardModule from '@/components/modules/FormsDashboardModule';
import FormsCatalogModule from '@/components/modules/FormsCatalogModule';
import FormRendererModule from '@/components/modules/FormRendererModule';
import FormSubmissionsModule from '@/components/modules/FormSubmissionsModule';
import FormReportsModule from '@/components/modules/FormReportsModule';
import FormSettingsModule from '@/components/modules/FormSettingsModule'; // Assuming this is the new settings


export default function AgriShieldPage() {
  const { activeTab, setActiveTab, allowedTabs, userRole, selectedFormType } = useAppContext();

  const renderActiveModule = () => {
    switch (activeTab) {
      // Agri Shield Core / Adapted CropSafeAI Modules
      case 'agri-shield-dashboard':
        return <DashboardModule />;
      case 'inspection-planning':
        return <InspectionPlanningModule />;
      case 'field-execution':
        return <FieldExecutionModule />;
      case 'seizure-logging':
        return <SeizureLoggingModule />;
      case 'legal-module':
        return <LegalModule />;
      case 'lab-interface':
        return <LabInterfaceModule />;
      case 'system-audit': // Renamed from report-audit
        return <ReportAuditModule />;
      case 'crop-health-report':
        return <CropReportModule />;
      case 'planting-schedule':
        return <PlantingScheduleModule />;
      
      // New Forms Portal Modules
      case 'forms-dashboard':
        return <FormsDashboardModule />;
      case 'forms-catalog':
        return <FormsCatalogModule />;
      case 'form-renderer':
        return selectedFormType ? <FormRendererModule formType={selectedFormType} /> : <FormsCatalogModule />; // Fallback to catalog if no form type
      case 'form-submissions':
        return <FormSubmissionsModule />;
      case 'form-reports':
        return <FormReportsModule />;
      case 'settings': // Assuming 'settings' tab maps to FormSettingsModule for now
        return <FormSettingsModule />;
      default:
        return <DashboardModule />; // Fallback to main dashboard
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar variant="sidebar" collapsible="icon" side="left">
        <SidebarHeader className="p-4 items-center justify-center border-b border-sidebar-border">
            <Image src="https://placehold.co/120x40.png?text=AgriShield" width={120} height={40} alt="Agri Shield Logo" data-ai-hint="logo agri shield" className="group-data-[collapsible=icon]:hidden"/>
            <Image src="https://placehold.co/32x32.png?text=AS" width={32} height={32} alt="Agri Shield Icon" data-ai-hint="logo shield" className="hidden group-data-[collapsible=icon]:block"/>
        </SidebarHeader>
        <ScrollArea className="flex-1">
          <SidebarContent>
            <SidebarMenu>
              {allowedTabs.filter(tab => !tab.hiddenInSidebar).map((tab) => (
                <SidebarMenuItem key={tab.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(tab.id)}
                    isActive={activeTab === tab.id}
                    tooltip={{content: tab.text, side: 'right', className: 'bg-primary text-primary-foreground'}}
                  >
                    <tab.icon />
                    <span>{tab.text}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        {/* Add SidebarFooter if needed */}
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveModule()}
        </main>
      </SidebarInset>
    </div>
  );
}
