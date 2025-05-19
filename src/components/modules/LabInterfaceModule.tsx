"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, QrCode, AlertTriangle, CheckCircle, Upload, Microscope } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const LabInterfaceModule: React.FC = () => {
  const { labSamples, updateLabSampleStatus, addFIRCase, updateSeizureStatus } = useAppContext();
  const { toast } = useToast();
  const [selectedSample, setSelectedSample] = useState<any | null>(null);
  const [testResult, setTestResult] = useState('');
  const [resultNotes, setResultNotes] = useState('');

  const handleResultUpload = () => {
    if (!selectedSample || !testResult) {
      toast({ title: "Error", description: "Please select a sample and a test result.", variant: "destructive" });
      return;
    }
    updateLabSampleStatus(selectedSample.id, testResult as any);
    toast({ title: "Result Uploaded", description: `Lab results uploaded for sample ${selectedSample.id}. Notes: ${resultNotes}` });

    if (testResult === 'violation') {
      toast({ title: "Violation Confirmed!", description: "Legal alert will be sent. FIR process should be initiated.", variant: "destructive" });
      // Optionally auto-trigger FIR draft or alert relevant dept.
      // Check if an FIR already exists for this seizure, if not, create one
      // This logic might be better placed in a backend or a more central state management effect
      addFIRCase({
        seizureId: selectedSample.seizureId || selectedSample.id, // Use seizureId if available from sample, else sampleId
        labReportId: selectedSample.id,
        violationType: 'Lab Confirmed Violation: ' + (selectedSample.issues?.join(', ') || 'Counterfeit Product'),
        accused: selectedSample.accused || 'Unknown Dealer/Retailer',
        location: selectedSample.geoLocation,
        details: `Lab result: Violation. Notes: ${resultNotes}`
      });
      // Update original seizure status as well
      if(selectedSample.seizureId) updateSeizureStatus(selectedSample.seizureId, 'report-generated');
      else updateSeizureStatus(selectedSample.id, 'report-generated');
    } else if (testResult === 'compliant') {
       if(selectedSample.seizureId) updateSeizureStatus(selectedSample.seizureId, 'report-generated');
       else updateSeizureStatus(selectedSample.id, 'report-generated');
    }

    setSelectedSample(null); // Clear selection
    setTestResult('');
    setResultNotes('');
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'in-transit': return 'default';
      case 'received': return 'secondary';
      case 'testing': return 'outline';
      case 'completed': return 'default'; // consider success variant
      case 'violation': return 'destructive';
      case 'compliant': return 'default'; // consider success variant
      default: return 'default';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Lab Sample Queue</CardTitle>
          <CardDescription>Track samples sent for laboratory testing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
          {labSamples.length === 0 && <p className="text-muted-foreground">No samples in the lab queue.</p>}
          {labSamples.map((sample) => (
            <div
              key={sample.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-card"
              onClick={() => { setSelectedSample(sample); setTestResult(sample.status); setResultNotes('');}}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-primary">{sample.id} - {sample.company} {sample.product}</h4>
                  <p className="text-sm text-muted-foreground">Type: {sample.sampleType}</p>
                  <p className="text-sm text-muted-foreground">Source: {sample.location || 'Field Collection'}</p>
                  <p className="text-sm text-muted-foreground">Lab: {sample.labDestination}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(sample.status)}>{sample.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lab Testing Interface</CardTitle>
          <CardDescription>Upload and manage test results for samples.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSample ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold text-lg text-primary mb-2">Sample: {selectedSample.id}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Product:</span> {selectedSample.company} {selectedSample.product}</p>
                  <p><span className="font-medium">Batch:</span> {selectedSample.batchNumber}</p>
                  <p><span className="font-medium">Current Status:</span> <Badge variant={getStatusBadgeVariant(selectedSample.status)}>{selectedSample.status}</Badge></p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg text-center bg-card">
                <QrCode className="mx-auto mb-2 h-16 w-16 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Scan barcode to verify sample ID: {selectedSample.id}</p>
              </div>
              
              <div>
                <Label htmlFor="testResult">Test Result</Label>
                <Select value={testResult} onValueChange={setTestResult}>
                  <SelectTrigger id="testResult"><SelectValue placeholder="Select Result" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="testing"><Microscope className="inline h-4 w-4 mr-2" />Currently Testing</SelectItem>
                    <SelectItem value="compliant"><CheckCircle className="inline h-4 w-4 mr-2 text-green-500" />Product Compliant</SelectItem>
                    <SelectItem value="violation"><AlertTriangle className="inline h-4 w-4 mr-2 text-red-500" />Violation Confirmed</SelectItem>
                    <SelectItem value="inconclusive"><AlertTriangle className="inline h-4 w-4 mr-2 text-yellow-500" />Inconclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resultNotes">Result Notes / Report Summary</Label>
                <Textarea id="resultNotes" value={resultNotes} onChange={(e) => setResultNotes(e.target.value)} placeholder="Enter observations, chemical analysis summary, etc." />
              </div>
              
              <Button onClick={handleResultUpload} className="w-full" disabled={!testResult}>
                <Upload className="mr-2 h-4 w-4" /> Upload Test Result
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="mx-auto mb-4 h-12 w-12" />
              <p>Select a sample to manage lab testing and results.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabInterfaceModule;

