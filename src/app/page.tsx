
"use client";

import React from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { useSidebar, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { Shield, LogOut } from 'lucide-react';
import { TopHeader } from '@/components/TopHeader';
import { Button } from '@/components/ui/button';

// Dynamically import modules to enable code splitting and improve initial load time
const DashboardModule = React.lazy(() => import('@/components/modules/DashboardModule'));
const InspectionPlanningModule = React.lazy(() => import('@/components/modules/InspectionPlanningModule'));
const FieldExecutionModule = React.lazy(() => import('@/components/modules/FieldExecutionModule'));
const SeizureLoggingModule = React.lazy(() => import('@/components/modules/SeizureLoggingModule'));
const LegalModule = React.lazy(() => import('@/components/modules/LegalModule'));
const LabInterfaceModule = React.lazy(() => import('@/components/modules/LabInterfaceModule'));
const ReportAuditModule = React.lazy(() => import('@/components/modules/ReportAuditModule'));
const CropReportModule = React.lazy(() => import('@/components/modules/CropReportModule'));
const PlantingScheduleModule = React.lazy(() => import('@/components/modules/PlantingScheduleModule'));


export default function AgriShieldProPage() {
  const { activeTab, setActiveTab, allowedTabs } = useAppContext();
  const { open: sidebarOpen, toggleSidebar } = useSidebar();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardModule />;
      case 'inspection-planning': return <InspectionPlanningModule />;
      case 'field-execution': return <FieldExecutionModule />;
      case 'seizure-logging': return <SeizureLoggingModule />;
      case 'legal-module': return <LegalModule />;
      case 'lab-interface': return <LabInterfaceModule />;
      case 'report-audit': return <ReportAuditModule />;
      case 'crop-health-report': return <CropReportModule />;
      case 'planting-schedule': return <PlantingScheduleModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar>
        <SidebarHeader className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-sidebar-primary" />
            {sidebarOpen && <h1 className="font-bold text-xl text-sidebar-foreground">CropSafeAI</h1>}
          </div>
           {/* SidebarTrigger is usually placed outside or in TopHeader for mobile */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {allowedTabs.map(tab => (
              <SidebarMenuItem key={tab.id}>
                <SidebarMenuButton
                  onClick={() => setActiveTab(tab.id)}
                  isActive={activeTab === tab.id}
                  aria-label={tab.ariaLabel}
                  tooltip={sidebarOpen ? undefined : tab.text}
                  className="justify-start"
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {sidebarOpen && <span>{tab.text}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className="justify-start"
                tooltip={sidebarOpen ? undefined : "Logout"}
              >
                <LogOut className="h-5 w-5 mr-2" />
                {sidebarOpen && <span>Logout</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <React.Suspense fallback={<div className="flex justify-center items-center h-full"><p>Loading module...</p></div>}>
            {renderContent()}
          </React.Suspense>
        </main>
      </SidebarInset>
    </div>
  );
}
