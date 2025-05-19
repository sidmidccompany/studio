"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, CheckCircle, AlertTriangle, RotateCcw, UserCircle } from 'lucide-react';
import { StatCard } from '@/components/StatCard'; // Using existing StatCard
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface ActivityItemProps {
  action: string;
  form: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'updated' | 'processed' | 'review';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ action, form, time, status }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
    approved: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100",
    rejected: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100",
    updated: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100",
    processed: "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100",
    review: "bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100",
  };

  return (
    <li className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div>
        <p className="font-medium text-foreground">{action}: {form}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </li>
  );
};


const FormsDashboardModule: React.FC = () => {
  const [pendingCount, setPendingCount] = useState(12);
  const [processingAll, setProcessingAll] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const chartColor = isDarkMode ? '#A5B4FC' : '#4F46E5';
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
  const textColor = isDarkMode ? '#D1D5DB' : '#4B5563';


  const handleProcessAllPending = () => {
    setProcessingAll(true);
    // Simulate processing delay
    setTimeout(() => {
      setPendingCount(0);
      setProcessingAll(false);
      setSuccessMessage("All pending forms have been processed successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 2000);
  };
  
  const submissionStatsData = [
    { name: 'Jan', submitted: 30, approved: 25, rejected: 3 },
    { name: 'Feb', submitted: 45, approved: 38, rejected: 5 },
    { name: 'Mar', submitted: 60, approved: 50, rejected: 7 },
    { name: 'Apr', submitted: 50, approved: 42, rejected: 4 },
    { name: 'May', submitted: 70, approved: 60, rejected: 6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Forms Dashboard</h2>
        <Button
          onClick={handleProcessAllPending}
          disabled={pendingCount === 0 || processingAll}
          variant={pendingCount === 0 || processingAll ? 'secondary' : 'default'}
        >
          {processingAll ? (
            <>
              <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Process All Pending (${pendingCount})`
          )}
        </Button>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pending Forms" value={pendingCount.toString()} icon={<FileText />} color="yellow" trend="+5 today"/>
        <StatCard title="Submitted Forms" value="60" icon={<UserCircle />} color="green" trend="120 total" />
        <StatCard title="Rejected Forms" value="3" icon={<AlertTriangle />} color="red" trend="-2 this week" />
        <StatCard title="Under Review" value="7" icon={<FileText />} color="blue" trend="+1 from yesterday" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on form submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-0">
              {pendingCount === 0 && !processingAll && successMessage ? (
                <ActivityItem action="Bulk Processed" form="All Pending Forms" time="Just now" status="processed" />
              ) : (
                <ActivityItem action="Submitted" form="Fertilizer Sale License Application" time="2 hours ago" status="pending" />
              )}
              <ActivityItem action="Approved" form="Form A1 - Memorandum of Intimation" time="Yesterday" status="approved" />
              <ActivityItem action="Returned for Correction" form="Insecticide Manufacturing Inspection" time="2 days ago" status="rejected" />
              <ActivityItem action="Updated" form="Form IV - Insecticide Analyst Report" time="3 days ago" status="review" />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Submission Statistics</CardTitle>
            <CardDescription>Monthly trends in form submissions and processing.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-2">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={textColor} fontSize={12} />
                <YAxis stroke={textColor} fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? 'hsl(var(--card))' : 'hsl(var(--background))',
                    borderColor: isDarkMode ? 'hsl(var(--border))' : 'hsl(var(--border))',
                    color: isDarkMode ? 'hsl(var(--card-foreground))' : 'hsl(var(--foreground))'
                  }} 
                />
                <Legend wrapperStyle={{fontSize: "12px"}} />
                <Bar dataKey="submitted" fill="hsl(var(--chart-1))" name="Submitted" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="hsl(var(--chart-2))" name="Approved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" fill="hsl(var(--chart-3))" name="Rejected" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormsDashboardModule;
