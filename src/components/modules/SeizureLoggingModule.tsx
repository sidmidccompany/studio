"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, FileText, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const SeizureLoggingModule: React.FC = () => {
  const { seizures, updateSeizureStatus, addFIRCase } = useAppContext();
  const { toast } = useToast();
  const [selectedSeizure, setSelectedSeizure] = useState<any | null>(null);

  const handleGenerateMemo = (seizure: any) => {
    toast({ title: "Memo Generated", description: `Seizure memo generated for ${seizure.id}.` });
    // In a real app, this would trigger a PDF generation.
  };

  const handleDispatchToLab = (seizure: any) => {
    updateSeizureStatus(seizure.id, 'dispatched');
    toast({ title: "Dispatched to Lab", description: `Sample ${seizure.id} dispatched to lab.`});
  };

  const handleInitiateLegalAction = (seizure: any) => {
     addFIRCase({
        seizureId: seizure.id,
        labReportId: `REQ-${seizure.id}`, // Placeholder until actual lab report
        violationType: seizure.issues.join(', ') || 'Suspected Counterfeit',
        accused: 'Unknown Dealer/Retailer',
        location: seizure.geoLocation,
      });
    updateSeizureStatus(seizure.id, 'fir-filed');
    toast({ title: "Legal Action Initiated", description: `FIR process started for ${seizure.id}.`});
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'dispatched': return 'secondary';
      case 'lab-received': return 'outline';
      case 'report-generated': return 'default';
      case 'fir-filed': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Active Seizures</CardTitle>
          <CardDescription>List of all currently active seizures.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
          {seizures.length === 0 && <p className="text-muted-foreground">No active seizures.</p>}
          {seizures.map((seizure) => (
            <div
              key={seizure.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-card"
              onClick={() => setSelectedSeizure(seizure)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-primary">{seizure.id} - {seizure.company} {seizure.product}</h4>
                  <p className="text-sm text-muted-foreground">Location: {seizure.geoLocation}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {seizure.quantity || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">Time: {new Date(seizure.timestamp).toLocaleString()}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(seizure.status)}>{seizure.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Seizure Details & Actions</CardTitle>
          <CardDescription>View details and take actions on selected seizure.</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSeizure ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg text-primary">{selectedSeizure.id}</h4>
                <p className="text-sm text-muted-foreground">{selectedSeizure.company} - {selectedSeizure.product}</p>
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Batch:</span> {selectedSeizure.batchNumber}</p>
                <div className="flex items-center">
                  <span className="font-medium mr-1">Authenticity:</span> 
                  {selectedSeizure.authenticityScore > 50 ? 
                    <CheckCircle className="text-green-500 h-4 w-4 mr-1" /> : 
                    <AlertTriangle className="text-red-500 h-4 w-4 mr-1" />}
                  <span className={selectedSeizure.authenticityScore > 50 ? 'text-green-600' : 'text-red-600'}>
                    {selectedSeizure.authenticityScore}% ({selectedSeizure.recommendation})
                  </span>
                </div>
                <p><span className="font-medium">Est. Value:</span> {selectedSeizure.estimatedValue || 'N/A'}</p>
              </div>
              
              {selectedSeizure.issues && selectedSeizure.issues.length > 0 && (
                <div>
                  <p className="font-medium text-destructive">Issues Detected:</p>
                  <ul className="list-disc list-inside text-destructive text-sm">
                    {selectedSeizure.issues.map((issue: string, index: number) => <li key={index}>{issue}</li>)}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2 pt-4 border-t mt-4">
                <Button onClick={() => handleGenerateMemo(selectedSeizure)} className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Generate Seizure Memo
                </Button>
                <Button 
                  onClick={() => handleDispatchToLab(selectedSeizure)} 
                  className="w-full" 
                  variant="outline"
                  disabled={selectedSeizure.status === 'dispatched' || selectedSeizure.status === 'lab-received' || selectedSeizure.status === 'report-generated' || selectedSeizure.status === 'fir-filed'}
                >
                  <Send className="mr-2 h-4 w-4" /> Dispatch to Lab
                </Button>
                <Button 
                  onClick={() => handleInitiateLegalAction(selectedSeizure)} 
                  className="w-full" 
                  variant="destructive"
                  disabled={selectedSeizure.status === 'fir-filed'}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Initiate Legal Action
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="mx-auto mb-4 h-12 w-12" />
              <p>Select a seizure to view details and actions.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeizureLoggingModule;
