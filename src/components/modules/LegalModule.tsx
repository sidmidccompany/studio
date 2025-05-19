"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, AlertCircle, Download, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LegalModule: React.FC = () => {
  const { firCases, addFIRCase, updateFIRCaseStatus } = useAppContext();
  const { toast } = useToast();
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [showNewFIRForm, setShowNewFIRForm] = useState(false);
  const [newFIRData, setNewFIRData] = useState({
    seizureId: '', labReportId: '', violationType: '', accused: '', location: '', details: ''
  });

  const handleFileSystemIntegration = (caseId: string, system: string) => {
    toast({ title: "System Integration", description: `${system} integration initiated for case ${caseId}.` });
    // In a real app, this would interact with an external system.
  };

  const handleFIRSubmitToSystem = (firCase: any) => {
    updateFIRCaseStatus(firCase.id, 'submitted');
    toast({ title: "FIR Submitted", description: `FIR for case ${firCase.id} submitted to e-FIR system.`});
  };

  const handleCreateNewFIR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFIRData.labReportId || !newFIRData.violationType || !newFIRData.accused || !newFIRData.location) {
      toast({ title: "Error", description: "Please fill all required fields for the new FIR.", variant: "destructive" });
      return;
    }
    addFIRCase(newFIRData);
    toast({ title: "FIR Created", description: "New FIR drafted successfully." });
    setShowNewFIRForm(false);
    setNewFIRData({ seizureId: '', labReportId: '', violationType: '', accused: '', location: '', details: '' });
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'submitted': return 'secondary';
      case 'pending-court': return 'outline';
      case 'closed': return 'default'; // consider a success variant
      default: return 'default';
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>FIR Cases</CardTitle>
            <CardDescription>Manage and track First Information Reports.</CardDescription>
          </div>
          <Button onClick={() => setShowNewFIRForm(true)}>Create New FIR</Button>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
          {firCases.length === 0 && <p className="text-muted-foreground">No FIR cases found.</p>}
          {firCases.map((firCase) => (
            <div
              key={firCase.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-card"
              onClick={() => setSelectedCase(firCase)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-primary">{firCase.id}</h4>
                  <p className="text-sm text-muted-foreground">Lab Report: {firCase.labReportId}</p>
                  <p className="text-sm text-muted-foreground">Violation: {firCase.violationType}</p>
                  <p className="text-sm text-muted-foreground">Accused: {firCase.accused}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(firCase.status)}>{firCase.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Legal Actions & Details</CardTitle>
          <CardDescription>Details and available actions for the selected case.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedCase ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold text-lg text-primary mb-2">{selectedCase.id}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Seizure ID:</span> {selectedCase.seizureId || 'N/A'}</p>
                  <p><span className="font-medium">Lab Report:</span> {selectedCase.labReportId}</p>
                  <p><span className="font-medium">Violation:</span> {selectedCase.violationType}</p>
                  <p><span className="font-medium">Accused:</span> {selectedCase.accused}</p>
                  <p><span className="font-medium">Location:</span> {selectedCase.location}</p>
                  <p><span className="font-medium">Status:</span> <Badge variant={getStatusBadgeVariant(selectedCase.status)}>{selectedCase.status}</Badge></p>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Button onClick={() => handleFIRSubmitToSystem(selectedCase)} className="w-full" variant="outline" disabled={selectedCase.status !== 'draft'}>
                  <Upload className="mr-2 h-4 w-4" /> Submit to e-FIR System
                </Button>
                <Button onClick={() => handleFileSystemIntegration(selectedCase.id, 'License Suspension')} className="w-full" variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" /> Initiate License Suspension
                </Button>
                <Button onClick={() => handleFileSystemIntegration(selectedCase.id, 'Court Filing')} className="w-full" variant="outline">
                  <Scale className="mr-2 h-4 w-4" /> Prepare Court Filing
                </Button>
                <Button onClick={() => handleFileSystemIntegration(selectedCase.id, 'Document Download')} className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Legal Documents
                </Button>
              </div>
            </div>
          ) : showNewFIRForm ? (
            <form onSubmit={handleCreateNewFIR} className="space-y-4">
              <h4 className="font-semibold text-lg text-primary">Create New FIR</h4>
              <div><Label htmlFor="fir_seizureId">Seizure ID (Optional)</Label><Input id="fir_seizureId" value={newFIRData.seizureId} onChange={e => setNewFIRData({...newFIRData, seizureId: e.target.value})} /></div>
              <div><Label htmlFor="fir_labReportId">Lab Report ID</Label><Input id="fir_labReportId" value={newFIRData.labReportId} onChange={e => setNewFIRData({...newFIRData, labReportId: e.target.value})} required /></div>
              <div><Label htmlFor="fir_violationType">Violation Type</Label><Input id="fir_violationType" value={newFIRData.violationType} onChange={e => setNewFIRData({...newFIRData, violationType: e.target.value})} required /></div>
              <div><Label htmlFor="fir_accused">Accused Party</Label><Input id="fir_accused" value={newFIRData.accused} onChange={e => setNewFIRData({...newFIRData, accused: e.target.value})} required /></div>
              <div><Label htmlFor="fir_location">Location of Offense</Label><Input id="fir_location" value={newFIRData.location} onChange={e => setNewFIRData({...newFIRData, location: e.target.value})} required /></div>
              <div><Label htmlFor="fir_details">Case Details</Label><Textarea id="fir_details" value={newFIRData.details} onChange={e => setNewFIRData({...newFIRData, details: e.target.value})} /></div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Save Draft FIR</Button>
                <Button type="button" variant="outline" onClick={() => setShowNewFIRForm(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Scale className="mx-auto mb-4 h-12 w-12" />
              <p>Select a case or create a new FIR.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalModule;
