"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, RotateCcw, Eye, Edit3, Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAppContext } from '@/components/providers/app-provider';
import { useToast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  type: string;
  date: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Pending Update';
}

const initialSubmissions: Submission[] = [
  { id: "FL-2024-0123", type: "Fertilizer Sale License", date: "15 May 2024", status: "Pending" },
  { id: "FA1-2024-0456", type: "Form A1 - Memorandum", date: "10 May 2024", status: "Under Review" },
  { id: "IR-2024-0789", type: "Inspection Report - Fertilizer", date: "05 May 2024", status: "Approved" },
  { id: "FV-2024-0321", type: "Form V - Inspector Forms", date: "28 Apr 2024", status: "Rejected" },
  { id: "FIV-2024-0654", type: "Form IV - Analyst Report", date: "20 Apr 2024", status: "Approved" }
];

const FormSubmissionsModule: React.FC = () => {
  const { navigateToForm } = useAppContext();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [statusFilter, setStatusFilter] = useState("All");
  const [formTypeFilter, setFormTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [processingBatch, setProcessingBatch] = useState(false);
  const [showBatchAlert, setShowBatchAlert] = useState(false);

  const pendingCount = useMemo(() => submissions.filter(s => s.status === "Pending").length, [submissions]);

  const handleBatchProcess = () => {
    setProcessingBatch(true);
    setTimeout(() => {
      const updatedSubmissions = submissions.map(submission => 
        submission.status === "Pending" ? { ...submission, status: "Under Review" as const } : submission
      );
      setSubmissions(updatedSubmissions);
      setProcessingBatch(false);
      setShowBatchAlert(true);
      toast({ title: "Batch Process Complete", description: "Pending submissions moved to 'Under Review'." });
      setTimeout(() => setShowBatchAlert(false), 5000);
    }, 2000);
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const matchesStatus = statusFilter === "All" || submission.status === statusFilter;
      const matchesFormType = formTypeFilter === "All" || submission.type.includes(formTypeFilter); // Simplified type match
      const matchesSearch = submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            submission.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesFormType && matchesSearch;
    });
  }, [submissions, statusFilter, formTypeFilter, searchQuery]);

  const getStatusBadgeVariant = (status: Submission['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Pending': return 'default'; // yellow-ish via theme
      case 'Under Review': return 'secondary'; // blue-ish via theme
      case 'Approved': return 'default'; // green-ish via theme, consider a specific "success" variant if added
      case 'Rejected': return 'destructive';
      case 'Pending Update': return 'outline'; // purple-ish via theme
      default: return 'default';
    }
  };
  
  const getStatusColorClass = (status: Submission['status']): string => {
    // For direct text color if Badge component doesn't convey enough
    switch (status) {
      case 'Pending': return 'text-yellow-600 dark:text-yellow-400';
      case 'Under Review': return 'text-blue-600 dark:text-blue-400';
      case 'Approved': return 'text-green-600 dark:text-green-400';
      case 'Rejected': return 'text-red-600 dark:text-red-400';
      case 'Pending Update': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-foreground';
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Form Submissions</h2>
        <Button
          onClick={handleBatchProcess}
          disabled={pendingCount === 0 || processingBatch}
          variant={pendingCount === 0 || processingBatch ? 'secondary' : 'default'}
        >
          {processingBatch ? (
            <><RotateCcw className="mr-2 h-4 w-4 animate-spin" />Processing...</>
          ) : (
            `Process All Pending (${pendingCount})`
          )}
        </Button>
      </div>

      {showBatchAlert && (
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300">
           <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle>Batch Processed!</AlertTitle>
          <AlertDescription>All pending submissions have been moved to 'Under Review'.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search submissions..."
                className="pl-10 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Pending Update">Pending Update</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Filter by form type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Form Types</SelectItem>
                  <SelectItem value="Fertilizer Sale License">Fertilizer License</SelectItem>
                  <SelectItem value="Form A1 - Memorandum">Form A1</SelectItem>
                  <SelectItem value="Inspection Report - Fertilizer">Inspection Report</SelectItem>
                  {/* Add other form types as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form ID</TableHead>
                <TableHead>Form Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length > 0 ? filteredSubmissions.map(submission => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell>{submission.type}</TableCell>
                  <TableCell>{submission.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(submission.status)} className={getStatusColorClass(submission.status)}>
                        {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => navigateToForm(submission.id.split('-')[0].toLowerCase() + 'License' + `?id=${submission.id}`)} className="mr-2"> {/* Simplified navigation */}
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    {(submission.status === 'Rejected' || submission.status === 'Pending Update') && (
                      <Button variant="ghost" size="sm" onClick={() => navigateToForm(submission.id.split('-')[0].toLowerCase() + 'License' + `?id=${submission.id}&edit=true`)}>
                        <Edit3 className="h-4 w-4 mr-1" /> Update
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No submissions match your current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="pt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing {filteredSubmissions.length} of {submissions.length} submissions.</p>
            {/* Add pagination controls here if needed */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSubmissionsModule;
