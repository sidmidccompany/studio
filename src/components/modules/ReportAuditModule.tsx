
"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSearch, Download, Activity, CheckSquare, AlertOctagon, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReportMetric { label: string; value: string | number; icon: React.ReactNode; }
interface ReportData { title: string; description: string; metrics: ReportMetric[]; }

const ReportAuditModule: React.FC = () => {
  const { inspectionTasks, seizures, firCases, labSamples } = useAppContext();
  const { toast } = useToast();
  const [selectedReportType, setSelectedReportType] = useState<string>('daily');

  const generateReportData = (type: string): ReportData => {
    switch (type) {
      case 'daily':
        return {
          title: 'Daily Activity Report',
          description: 'Summary of activities performed today.',
          metrics: [
            { label: 'Inspections Completed', value: inspectionTasks.filter(t => new Date(t.date).toDateString() === new Date().toDateString()).length, icon: <CheckSquare className="h-5 w-5 text-blue-500" /> },
            { label: 'Samples Collected Today', value: labSamples.filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString()).length, icon: <Activity className="h-5 w-5 text-purple-500" /> },
            { label: 'New Seizures', value: seizures.filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString()).length, icon: <AlertOctagon className="h-5 w-5 text-yellow-500" /> },
            { label: 'New FIRs Drafted', value: firCases.filter(f => f.status === 'draft' && new Date().toDateString() === new Date().toDateString()).length, icon: <FileSearch className="h-5 w-5 text-red-500" /> }
          ]
        };
      case 'weekly':
        // Simplified for demo
        const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return {
          title: 'Weekly Performance Report',
          description: 'Performance overview for the last 7 days.',
          metrics: [
            { label: 'Total Inspections', value: inspectionTasks.filter(t => new Date(t.date) > oneWeekAgo).length, icon: <CheckSquare className="h-5 w-5 text-blue-500" /> },
            { label: 'Compliance Rate', value: '92.5%', icon: <Activity className="h-5 w-5 text-green-500" /> }, // Mocked
            { label: 'High-Risk Areas Flagged', value: 3, icon: <AlertOctagon className="h-5 w-5 text-yellow-500" /> }, // Mocked
            { label: 'Avg. Officer Efficiency', value: '89%', icon: <FileSearch className="h-5 w-5 text-purple-500" /> } // Mocked
          ]
        };
      case 'monthly':
         const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return {
          title: 'Monthly Analytics Report',
          description: 'In-depth analytics for the past month.',
          metrics: [
            { label: 'Total Seizures', value: seizures.filter(s => new Date(s.timestamp) > oneMonthAgo).length, icon: <AlertOctagon className="h-5 w-5 text-yellow-500" /> },
            { label: 'Lab Violation Confirmations', value: labSamples.filter(s => s.status === 'violation' && new Date(s.timestamp) > oneMonthAgo).length, icon: <Activity className="h-5 w-5 text-red-500" /> },
            { label: 'Legal Actions Initiated', value: firCases.filter(f => f.status !== 'draft' && new Date().getMonth() === new Date(f.seizureId ? (seizures.find(s => s.id === f.seizureId)?.timestamp || 0) : 0).getMonth()).length, icon: <FileSearch className="h-5 w-5 text-blue-500" /> },
            { label: 'Est. Value of Seized Goods', value: `₹${seizures.filter(s => new Date(s.timestamp) > oneMonthAgo).reduce((acc, s) => acc + (parseFloat(s.estimatedValue?.replace('₹','') || '0')),0).toLocaleString()}`, icon: <DollarSign className="h-5 w-5 text-green-500" /> }
          ]
        };
      default:
        return { title: 'Select Report Type', description: '', metrics: [] };
    }
  };
  
  const currentReportData = generateReportData(selectedReportType);

  const handleGenerateReport = () => {
    toast({ title: "Report Generated", description: `${currentReportData.title} has been generated.` });
    // In a real app, this might fetch data and format it.
  };

  const handleExportData = (format: string) => {
    toast({ title: "Export Started", description: `Exporting ${currentReportData.title} as ${format}.` });
    // In a real app, this would trigger a file download.
  };

  // Mock audit trail data
  const auditTrail = [
    { time: '10:30 AM', action: 'Sample LAB-001 results uploaded', user: 'LabTech01', details: 'Violation confirmed' },
    { time: '09:45 AM', action: 'FIR-002 status updated to Submitted', user: 'LegalOfficer02', details: 'Submitted to e-FIR portal' },
    { time: 'Yesterday', action: 'Seizure SEZ-003 logged', user: 'FieldOfficer03', details: 'Location: Sangli Market' },
    { time: '2 days ago', action: 'Inspection INS-005 completed', user: 'FieldOfficer01', details: 'Target: Kolhapur Retailer' },
  ];

  return (
    <Tabs defaultValue="reports" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="audit">Audit Trail</TabsTrigger>
      </TabsList>
      <TabsContent value="reports">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Generation</CardTitle>
              <CardDescription>Select and generate various operational reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger><SelectValue placeholder="Select Report Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Activity Report</SelectItem>
                  <SelectItem value="weekly">Weekly Performance Report</SelectItem>
                  <SelectItem value="monthly">Monthly Analytics Report</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleGenerateReport} className="w-full">
                <FileSearch className="mr-2 h-4 w-4" /> View Report
              </Button>
              <Button onClick={() => handleExportData('PDF')} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export as PDF
              </Button>
              <Button onClick={() => handleExportData('Excel')} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export as Excel
              </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{currentReportData.title}</CardTitle>
              <CardDescription>{currentReportData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentReportData.metrics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentReportData.metrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-muted/50 flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{metric.icon}</div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Select a report type to view data.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="audit">
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Chain of Custody & Audit Trail</CardTitle>
            <CardDescription>Review system activity and data handling logs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
            {auditTrail.map((entry, index) => (
              <div key={index} className="p-3 border rounded-lg bg-card flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">Details: {entry.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                  <p className="text-xs font-semibold">by {entry.user}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ReportAuditModule;
