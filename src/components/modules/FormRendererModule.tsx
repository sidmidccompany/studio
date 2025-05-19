"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Printer, Download, Upload, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import type { FormData } from '@/lib/types'; // Assuming FormData type is defined

interface FormRendererProps {
  formType: string;
}

interface UpdateFieldWrapperProps {
  children: React.ReactNode;
  fieldName: string;
  needsUpdate: (fieldName: string) => boolean;
}

const UpdateFieldWrapper: React.FC<UpdateFieldWrapperProps> = ({ children, fieldName, needsUpdate }) => {
  if (needsUpdate(fieldName)) {
    return (
      <div className="border-2 border-yellow-400 dark:border-yellow-600 rounded-md p-1 relative my-1 bg-yellow-50 dark:bg-yellow-900/30">
        <div className="absolute -top-2.5 left-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs px-1.5 py-0.5 rounded-full border border-yellow-300 dark:border-yellow-700">
          Update Required
        </div>
        {children}
      </div>
    );
  }
  return <>{children}</>;
};


const FormRendererModule: React.FC<FormRendererProps> = ({ formType }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [pendingUpdateFields, setPendingUpdateFields] = useState<string[]>([]);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [showUpdateFields, setShowUpdateFields] = useState(false); // To filter view for only fields needing update

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const editMode = urlParams.get('edit') === 'true'; // Or however you determine edit mode
      const formIdFromUrl = urlParams.get('id'); // Example: if form data is loaded by ID

      if (editMode) { // Simulating loading data for an update
        setIsUpdate(true);
        setIsPendingUpdate(true); // Assume it's pending an update action
        // Simulate loading existing form data - replace with actual data fetching
        setFormData({
          fullName: "John Doe", aadharNumber: "123456789012", panNumber: "ABCDE1234F",
          education: "B.Sc. Agriculture", mobileNumber: "9876543210", email: "john.doe@example.com",
          address: "123 Farm Avenue, Agricultural District", businessName: "Green Fields Fertilizers",
          businessType: "proprietorship", registrationNumber: "REG123456", gstNumber: "GST9876543210",
          salePointAddress: "456 Market Street, Commercial Zone", storageAddress: "789 Warehouse Area, Industrial Zone",
          premisesOwnership: "owned", premisesSize: "2500", responsiblePersonName: "Jane Smith",
          responsiblePersonDesignation: "Operations Manager", responsiblePersonQualification: "M.Sc. Agricultural Science",
          responsiblePersonContact: "9876543211", paymentMethod: "challan", paymentReference: "PAY987654321",
          paymentDate: "2024-05-01", paymentAmount: "2250",
        });
        // Simulate fields that the backend/system has marked as needing an update
        setPendingUpdateFields(["responsiblePersonContact", "paymentReference", "storageAddress"]);
      } else {
        // Reset for a new form
        setFormData({});
        setIsUpdate(false);
        setIsPendingUpdate(false);
        setPendingUpdateFields([]);
        setFormSubmitted(false);
        setCurrentStep(1);
      }
    }
  }, [formType]); // Rerun if formType changes (e.g. navigating from catalog)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (pendingUpdateFields.includes(name) && isUpdate) {
      // Optimistically remove from pending list if user modifies it
      // The actual validation might happen server-side or on submit
      setPendingUpdateFields(prev => prev.filter(field => field !== name));
    }
  };

  const handleSubmit = () => {
    // Add form validation logic here if needed
    if (isUpdate && pendingUpdateFields.length > 0) {
      toast({ title: "Update Required", description: "Please address all fields marked for update.", variant: "destructive" });
      return;
    }
    setFormSubmitted(true);
    setIsPendingUpdate(false); // If it was pending, it's now submitted for update
    toast({ title: `Form ${isUpdate ? 'Updated' : 'Submitted'}`, description: "Your form has been successfully processed.", variant: "default" });
  };
  
  const handleSaveDraft = () => toast({ title: "Draft Saved", description: "Form draft has been saved." });
  const handlePrint = () => window.print();
  const handleExport = () => toast({ title: "Exported", description: "Form data exported." });
  const handleFileUpload = (fieldName: string, file: File) => {
    // Placeholder for file upload logic, e.g., to a state or backend
    toast({ title: "File Uploaded", description: `${file.name} for ${fieldName} ready.`});
    setFormData(prev => ({ ...prev, [fieldName]: file.name })); // Store filename or a ref
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3)); // Assuming 3 steps
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const getFormTitle = () => {
    // This can be expanded or fetched from a config
    const titles: Record<string, string> = {
      fertilizerLicense: "Fertilizer Sale License Application", formA1: "Form A1 - Memorandum of Intimation",
      inspectionFertilizer: "Fertilizer Manufacturing Inspection Report", formV: "Form V - Insecticide Inspector Forms",
      formIV: "Form IV - Insecticide Analyst Report", inspectionInsecticide: "Insecticide Manufacturing Inspection",
    };
    return titles[formType] || "Dynamic Form";
  };

  const fieldNeedsUpdate = (fieldName: string) => isUpdate && pendingUpdateFields.includes(fieldName);

  // Define form structure (simplified for this example)
  const steps = [
    {
      title: "Applicant Information",
      fields: [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "aadharNumber", label: "Aadhar Number", type: "text" },
        { name: "panNumber", label: "PAN Number", type: "text" },
        { name: "education", label: "Educational Qualification", type: "text" },
        { name: "mobileNumber", label: "Mobile Number", type: "tel" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "address", label: "Complete Address", type: "textarea" },
        // Example file uploads
        { name: "aadharUpload", label: "Aadhar Card", type: "file" },
        { name: "panUpload", label: "PAN Card", type: "file" },
      ]
    },
    {
      title: "Business Details",
      fields: [
        { name: "businessName", label: "Business Name", type: "text" },
        { name: "businessType", label: "Type of Business", type: "select", options: ["proprietorship", "partnership", "limited", "cooperative"] },
        { name: "registrationNumber", label: "Registration Number", type: "text" },
        { name: "gstNumber", label: "GST Number", type: "text" },
        { name: "salePointAddress", label: "Sale Point Address", type: "textarea" },
        { name: "storageAddress", label: "Godown/Storage Address", type: "textarea" },
        { name: "premisesOwnership", label: "Premises Ownership", type: "select", options: ["owned", "rented"] },
        { name: "premisesSize", label: "Premises Size (sq. ft.)", type: "number" },
        { name: "responsiblePersonName", label: "Responsible Person Name", type: "text" },
        { name: "responsiblePersonDesignation", label: "Responsible Person Designation", type: "text" },
        { name: "responsiblePersonQualification", label: "Responsible Person Qualification", type: "text" },
        { name: "responsiblePersonContact", label: "Responsible Person Contact", type: "tel" },
      ]
    },
    {
      title: "Documents & Submission",
      fields: [
        { name: "paymentMethod", label: "Payment Method", type: "select", options: ["challan", "bankChallan", "demandDraft"] },
        { name: "paymentReference", label: "Reference/UTR Number", type: "text" },
        { name: "paymentDate", label: "Payment Date", type: "date" },
        { name: "paymentAmount", label: "Amount Paid (Rs.)", type: "number" },
        // More file uploads
        { name: "formA1Upload", label: "Duly filled Form A-1", type: "file" },
        { name: "declaration", label: "I declare that the information given is true...", type: "checkbox" },
      ]
    }
  ];
  
  const currentFields = steps[currentStep - 1]?.fields.filter(field => 
    !showUpdateFields || fieldNeedsUpdate(field.name)
  ) || [];

  if (!formType) {
    return (
      <Card>
        <CardHeader><CardTitle>No Form Selected</CardTitle></CardHeader>
        <CardContent><p>Please select a form from the catalog.</p></CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{getFormTitle()}</CardTitle>
              <CardDescription>
                {formSubmitted ? `Form ${isUpdate ? 'updated' : 'submitted'} successfully!` : 
                 isUpdate ? "Please review and update the highlighted fields." : "Please fill out the form."}
                {isPendingUpdate && <span className="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs rounded-full">Pending Update</span>}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}><Save className="mr-2 h-4 w-4" />Save Draft</Button>
              <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print</Button>
              <Button variant="outline" size="sm" onClick={handleExport}><Download className="mr-2 h-4 w-4" />Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="mb-6 space-y-2">
             <Progress value={(currentStep / steps.length) * 100} className="w-full" />
             <div className="flex justify-between text-sm text-muted-foreground">
                {steps.map((step, index) => (
                    <span key={step.title} className={index + 1 === currentStep ? 'font-semibold text-primary' : ''}>
                        {step.title}
                    </span>
                ))}
             </div>
          </div>

          {isUpdate && (
            <Card className="mb-6 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5"/> Form Update Required
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowUpdateFields(s => !s)} className="text-yellow-700 dark:text-yellow-300">
                      {showUpdateFields ? "Show All Fields" : "Show Only Update Fields"}
                    </Button>
                </div>
                <CardDescription className="text-yellow-600 dark:text-yellow-400">
                  This form has been returned for updates. Please review and update the fields highlighted below.
                   {pendingUpdateFields.length > 0 ? ` (${pendingUpdateFields.length} fields remaining)`: " All updates addressed."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="updateComment" className="text-yellow-700 dark:text-yellow-300">Update Comments</Label>
                <Textarea id="updateComment" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)} placeholder="Reason for update, changes made..." className="border-yellow-400 dark:border-yellow-600 focus:ring-yellow-500" />
                 {pendingUpdateFields.length > 0 && !showUpdateFields && (
                  <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                    Fields requiring update: {pendingUpdateFields.map(f => f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(', ')}.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{steps[currentStep - 1]?.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {currentFields.map(field => (
                <div key={field.name} className={field.type === 'textarea' || field.type === 'checkbox' ? 'md:col-span-2' : ''}>
                  <UpdateFieldWrapper fieldName={field.name} needsUpdate={fieldNeedsUpdate}>
                    <Label htmlFor={field.name} className="text-foreground">{field.label}</Label>
                    {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'date' || field.type === 'number' ? (
                      <Input type={field.type} id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="mt-1" />
                    ) : field.type === 'textarea' ? (
                      <Textarea id={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="mt-1" />
                    ) : field.type === 'select' && field.options ? (
                      <Select name={field.name} value={formData[field.name] || ''} onValueChange={(value) => handleChange({ target: { name: field.name, value } } as any)}>
                        <SelectTrigger id={field.name} className="mt-1"><SelectValue placeholder={`Select ${field.label}`} /></SelectTrigger>
                        <SelectContent>
                          {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'checkbox' ? (
                       <div className="flex items-center space-x-2 mt-2 p-3 border rounded-md">
                        <Checkbox id={field.name} name={field.name} checked={!!formData[field.name]} onCheckedChange={(checked) => handleChange({target: {name: field.name, value: checked, type: 'checkbox'}} as any)} />
                        <Label htmlFor={field.name} className="font-normal text-sm text-muted-foreground">{field.label}</Label>
                      </div>
                    ) : field.type === 'file' ? (
                      <div className="mt-1">
                        <Input type="file" id={field.name} name={field.name} onChange={(e) => e.target.files && handleFileUpload(field.name, e.target.files[0])} className="text-sm"/>
                        {formData[field.name] && <p className="text-xs text-muted-foreground mt-1">Uploaded: {formData[field.name]}</p>}
                      </div>
                    ) : null}
                  </UpdateFieldWrapper>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}><ChevronLeft className="mr-2 h-4 w-4"/>Previous</Button>
              {currentStep < steps.length ? (
                <Button onClick={nextStep}>Next <ChevronRight className="ml-2 h-4 w-4"/></Button>
              ) : (
                <Button onClick={handleSubmit} variant={isUpdate && pendingUpdateFields.length > 0 ? "secondary" : "default"} disabled={isUpdate && pendingUpdateFields.length > 0 && !formSubmitted}>
                  {isUpdate ? (pendingUpdateFields.length > 0 ? "Updates Pending" : "Submit Updates") : "Submit Application"}
                </Button>
              )}
            </div>
             {isUpdate && pendingUpdateFields.length > 0 && currentStep === steps.length && !formSubmitted && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2 text-center">
                Please address all fields marked for update before submitting.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormRendererModule;
