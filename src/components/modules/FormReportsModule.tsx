"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';
import { useTheme } from 'next-themes';

const submissionData = [
  { type: 'Fertilizer License', count: 120 },
  { type: 'Form A1', count: 85 },
  { type: 'Inspection Reports', count: 60 },
  { type: 'Form V (Insecticide)', count: 45 },
  { type: 'Form IV (Analyst)', count: 30 },
];

const approvalData = [
  { name: 'Approved', value: 250, fill: 'hsl(var(--chart-1))' },
  { name: 'Pending', value: 60, fill: 'hsl(var(--chart-2))' },
  { name: 'Rejected', value: 30, fill: 'hsl(var(--chart-3))' },
];

const monthlyTrendData = [
  { month: 'Jan', submissions: 25, approvals: 20 },
  { month: 'Feb', submissions: 30, approvals: 22 },
  { month: 'Mar', submissions: 45, approvals: 35 },
  { month: 'Apr', submissions: 40, approvals: 30 },
  { month: 'May', submissions: 55, approvals: 48 },
];


const FormReportsModule: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
  const textColor = isDarkMode ? '#D1D5DB' : '#4B5563';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Form Reports & Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Submissions by Type</CardTitle>
            <CardDescription>Breakdown of submitted forms by their type.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionData} layout="vertical" margin={{ left: 30, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" stroke={textColor} fontSize={12} />
                <YAxis dataKey="type" type="category" stroke={textColor} fontSize={12} width={150} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                    borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                    color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" name="Submissions" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Approval Statistics</CardTitle>
            <CardDescription>Overall status of form approvals.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={approvalData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}
                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {approvalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                    borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                    color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                  }}
                />
                <Legend wrapperStyle={{fontSize: "12px"}} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Submission Trends</CardTitle>
          <CardDescription>Track submissions and approvals over time.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} />
               <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                    borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                    color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                  }}
                />
              <Legend wrapperStyle={{fontSize: "12px"}} />
              <Bar dataKey="submissions" fill="hsl(var(--chart-4))" name="Submissions" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approvals" fill="hsl(var(--chart-5))" name="Approvals" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Reports</CardTitle>
          <CardDescription>Configure and download specific reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select>
                <SelectTrigger id="reportType"><SelectValue placeholder="Select Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="submissions">Form Submissions</SelectItem>
                  <SelectItem value="approvals">Approval Statistics</SelectItem>
                  <SelectItem value="inspections">Inspection Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select>
                <SelectTrigger id="dateRange"><SelectValue placeholder="Select Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger id="format"><SelectValue placeholder="Select Format" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" /> Generate and Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormReportsModule;
