"use client";

import React from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { StatCard } from '@/components/StatCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Calendar, Package, Building, Scale, UserCheck, BarChartHorizontal } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, AreaChart, Area } from 'recharts';
import { useTheme } from 'next-themes';

const DashboardModule: React.FC = () => {
  const { seizures, labSamples, firCases, inspectionTasks } = useAppContext();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const performanceData = [
    { month: 'Jan', inspections: 23, violations: 8, seizures: 5 },
    { month: 'Feb', inspections: 26, violations: 15, seizures: 12 },
    { month: 'Mar', inspections: 29, violations: 12, seizures: 11 },
    { month: 'Apr', inspections: 31, violations: 8, seizures: 7 },
    { month: 'May', inspections: 32, violations: 15, seizures: 13 },
  ];
  
  const officerPerformance = [
    { name: 'Ram Kumar', inspections: 45, seizures: 8, compliance: 92 },
    { name: 'Priya Sharma', inspections: 52, seizures: 12, compliance: 89 },
    { name: 'Suresh Patil', inspections: 38, seizures: 5, compliance: 95 },
    { name: 'Anjali Singh', inspections: 41, seizures: 7, compliance: 91 },
    { name: 'Vikram Reddy', inspections: 49, seizures: 10, compliance: 88 },
  ];
  
  const hotspotData = [
    { area: 'Kolhapur', riskLevel: 85, violations: 22 },
    { area: 'Sangli', riskLevel: 72, violations: 18 },
    { area: 'Solapur', riskLevel: 68, violations: 15 },
    { area: 'Ahmednagar', riskLevel: 78, violations: 20 },
    { area: 'Pune', riskLevel: 65, violations: 12 },
  ];

  const totalInspections = inspectionTasks.length;
  const activeSeizures = seizures.filter(s => s.status === 'pending' || s.status === 'dispatched' || s.status === 'lab-received').length;
  const pendingLabSamples = labSamples.filter(s => s.status === 'in-transit' || s.status === 'received' || s.status === 'testing').length;
  const openFirCases = firCases.filter(c => c.status !== 'closed').length;
  const complianceRate = totalInspections > 0 ? ((totalInspections - seizures.length) / totalInspections * 100).toFixed(1) + "%" : "N/A";

  const chartColor = isDarkMode ? '#A5B4FC' : '#4F46E5'; // Tailwind indigo-400 / indigo-600
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB'; // Tailwind gray-700 / gray-200
  const textColor = isDarkMode ? '#D1D5DB' : '#4B5563'; // Tailwind gray-300 / gray-600

  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive dark:bg-destructive/20 dark:text-red-400">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Escalation Alert: 3 Pending FIRs</AlertTitle>
        <AlertDescription>
          Lab reports confirmed violations. Immediate legal action required for seized samples LAB-001, LAB-003, LAB-007.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Inspections" value={totalInspections.toString()} trend="+12%" icon={<Calendar />} color="blue" />
        <StatCard title="Active Seizures" value={activeSeizures.toString()} trend="+8%" icon={<Package />} color="yellow" />
        <StatCard title="Pending Lab Samples" value={pendingLabSamples.toString()} trend="5 new" icon={<Building />} color="purple" />
        <StatCard title="Open FIR Cases" value={openFirCases.toString()} trend="3 filed" icon={<Scale />} color="red" />
        <StatCard title="Compliance Rate" value={complianceRate} trend="+2.3%" icon={<UserCheck />} color="green" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Inspection Trends</CardTitle>
            <CardDescription>Overview of inspections, violations, and seizures over the past months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" stroke={textColor} fontSize={12} />
                <YAxis stroke={textColor} fontSize={12} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                    borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                    color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                  }} 
                />
                <Legend wrapperStyle={{fontSize: "12px"}}/>
                <Area type="monotone" dataKey="inspections" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Inspections" />
                <Area type="monotone" dataKey="violations" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Violations" />
                <Area type="monotone" dataKey="seizures" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} name="Seizures" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Officer-wise Performance</CardTitle>
            <CardDescription>Key performance indicators for field officers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Officer</TableHead>
                  <TableHead className="text-right">Inspections</TableHead>
                  <TableHead className="text-right">Seizures</TableHead>
                  <TableHead className="text-right">Compliance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officerPerformance.slice(0,4).map((officer) => (
                  <TableRow key={officer.name}>
                    <TableCell className="font-medium">{officer.name}</TableCell>
                    <TableCell className="text-right">{officer.inspections}</TableCell>
                    <TableCell className="text-right">{officer.seizures}</TableCell>
                    <TableCell className={`text-right font-semibold ${officer.compliance > 90 ? 'text-green-500' : 'text-yellow-500'}`}>{officer.compliance}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>High-Risk Area Identification</CardTitle>
          <CardDescription>Areas with notable risk levels and violation counts.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hotspotData} layout="vertical" margin={{ right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" stroke={textColor} fontSize={12} />
              <YAxis dataKey="area" type="category" stroke={textColor} fontSize={12} width={80} />
              <RechartsTooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                  borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                  color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                 }} 
              />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="riskLevel" fill={chartColor} name="Risk Level %" barSize={15} />
              <Bar dataKey="violations" fill="#FFB347" name="Violations" barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardModule;
