"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Fingerprint, Camera, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { PRODUCT_DATABASE } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";

const FieldExecutionModule: React.FC = () => {
  const { addSeizure, addLabSample } = useAppContext();
  const { toast } = useToast();
  
  const [activeDevice, setActiveDevice] = useState<string | null>(null);
  const [bodyCamActive, setBodyCamActive] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [batchNumberInput, setBatchNumberInput] = useState('');
  
  const companies = Object.keys(PRODUCT_DATABASE.pesticides); // Example, can be expanded

  const handleDeviceActivation = (device: string) => {
    setActiveDevice(device);
    if (device === 'bodycam') {
      setBodyCamActive(prev => !prev);
      toast({ title: "Body Cam Status", description: `Body cam ${!bodyCamActive ? 'activated' : 'deactivated'}.`, variant: "default" });
    } else {
      toast({ title: "Device Activated", description: `${device} is now active.`, variant: "default" });
    }
  };

  const handleProductScan = () => {
    if (!selectedCompany || !selectedProduct || !batchNumberInput) {
      toast({ title: "Error", description: "Please select company, product and enter batch number.", variant: "destructive" });
      return;
    }
    // Simulate scanning logic
    const isCounterfeit = Math.random() > 0.7; // Higher chance of authentic for demo
    const productInfo = PRODUCT_DATABASE.pesticides[selectedCompany]?.[selectedProduct];
    
    const result = {
      company: selectedCompany,
      product: selectedProduct,
      batchNumber: batchNumberInput,
      authenticityScore: isCounterfeit ? Math.floor(Math.random() * 40) + 10 : Math.floor(Math.random() * 20) + 80, // 10-49 for counterfeit, 80-99 for authentic
      issues: isCounterfeit ? (productInfo?.commonCounterfeitMarkers || ['Generic counterfeit markers']) : [],
      recommendation: isCounterfeit ? 'Suspected Counterfeit' : 'Authentic',
      geoLocation: '16.7050° N, 74.2433° E', // Mock geo-location
      timestamp: new Date().toISOString(),
      activeIngredient: productInfo?.activeIngredient || "N/A",
      mrp: productInfo?.mrp ? (typeof productInfo.mrp === 'number' ? productInfo.mrp : Object.values(productInfo.mrp)[0]) : "N/A",
    };
    setScanResult(result);

    if (isCounterfeit) {
      toast({ title: "Scan Result: Counterfeit Detected!", description: "Initiating seizure protocol might be necessary.", variant: "destructive"});
    } else {
      toast({ title: "Scan Result: Authentic", description: "Product verified as authentic.", variant: "default"});
    }
  };

  const handleSeizureAction = () => {
    if (scanResult && scanResult.authenticityScore < 50) {
      const seizureData = {
        ...scanResult,
        quantity: '50 units', // Mock data
        estimatedValue: `₹${(scanResult.mrp || 100) * 50}`, // Mock data
        witnessName: 'Shop Owner (Mock)',
      };
      addSeizure(seizureData);
      addLabSample({ ...seizureData, sampleType: 'Pesticide', labDestination: 'SPTL Ghaziabad' });
      toast({ title: "Action Taken", description: "Seizure logged and sample prepared for lab dispatch."});
      setScanResult(null); // Clear scan result after action
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Field Equipment Control</CardTitle>
          <CardDescription>Activate and manage field testing devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Body Cam Control */}
          <div className="p-4 border rounded-lg flex justify-between items-center bg-card">
            <div className="flex items-center gap-3">
              <Camera className="text-primary" />
              <div>
                <h4 className="font-medium">Axon Body Cam</h4>
                <p className={`text-sm ${bodyCamActive ? "text-destructive" : "text-muted-foreground"}`}>
                  {bodyCamActive ? 'Recording...' : 'Standby'}
                </p>
              </div>
            </div>
            <Button onClick={() => handleDeviceActivation('bodycam')} variant={bodyCamActive ? "destructive" : "default"}>
              {bodyCamActive ? 'Stop' : 'Start'} Recording
            </Button>
          </div>
          {/* TruScan Control */}
          <div className="p-4 border rounded-lg flex justify-between items-center bg-card">
            <div className="flex items-center gap-3">
              <QrCode className="text-primary" />
              <div>
                <h4 className="font-medium">TruScan Device</h4>
                <p className="text-sm text-muted-foreground">Ready for scanning</p>
              </div>
            </div>
            <Button onClick={() => handleDeviceActivation('truscan')} variant={activeDevice === 'truscan' ? "secondary" : "outline"}>
              {activeDevice === 'truscan' ? 'Active' : 'Activate'}
            </Button>
          </div>
          {/* Gemini Analyzer */}
           <div className="p-4 border rounded-lg flex justify-between items-center bg-card">
            <div className="flex items-center gap-3">
              <Fingerprint className="text-primary" />
              <div>
                <h4 className="font-medium">Gemini Analyzer</h4>
                <p className="text-sm text-muted-foreground">Chemical analysis ready</p>
              </div>
            </div>
            <Button onClick={() => handleDeviceActivation('gemini')} variant={activeDevice === 'gemini' ? "secondary" : "outline"}>
              {activeDevice === 'gemini' ? 'Active' : 'Activate'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Testing Interface</CardTitle>
          <CardDescription>Scan products and view authenticity results.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="company">Company</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger id="company"><SelectValue placeholder="Select Company" /></SelectTrigger>
                <SelectContent>
                  {companies.map(comp => <SelectItem key={comp} value={comp}>{comp}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} placeholder="e.g., Saaf, Confidor" />
            </div>
             <div>
              <Label htmlFor="batchNumber">Batch Number / QR Code Data</Label>
              <Input id="batchNumber" value={batchNumberInput} onChange={e => setBatchNumberInput(e.target.value)} placeholder="Enter batch or scan data" />
            </div>
            <Button onClick={handleProductScan} className="w-full">
              <QrCode className="mr-2 h-4 w-4" /> Test Product Authenticity
            </Button>
          </div>
          
          {scanResult && (
            <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
              <h4 className="font-semibold text-lg mb-2">Test Results:</h4>
              <div className={`flex items-center p-3 rounded-md ${scanResult.authenticityScore > 50 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                {scanResult.authenticityScore > 50 ? <CheckCircle className="text-green-500 mr-2" /> : <AlertTriangle className="text-red-500 mr-2" />}
                <span className={`font-bold text-xl ${scanResult.authenticityScore > 50 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {scanResult.recommendation} ({scanResult.authenticityScore}%)
                </span>
              </div>
              <p><span className="font-medium">Product:</span> {scanResult.company} {scanResult.product}</p>
              <p><span className="font-medium">Batch:</span> {scanResult.batchNumber}</p>
              <p><span className="font-medium">Active Ingredient:</span> {scanResult.activeIngredient}</p>
              <p><span className="font-medium">MRP:</span> ₹{scanResult.mrp}</p>
              <p><span className="font-medium">Timestamp:</span> {new Date(scanResult.timestamp).toLocaleString()}</p>
              <p><span className="font-medium">Location:</span> {scanResult.geoLocation}</p>
              {scanResult.issues.length > 0 && (
                <div>
                  <p className="font-medium text-destructive">Issues Detected:</p>
                  <ul className="list-disc list-inside text-destructive text-sm">
                    {scanResult.issues.map((issue: string, index: number) => <li key={index}>{issue}</li>)}
                  </ul>
                </div>
              )}
              {scanResult.authenticityScore < 50 && (
                <Button onClick={handleSeizureAction} variant="destructive" className="w-full mt-4">
                  Initiate Seizure Protocol
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldExecutionModule;

