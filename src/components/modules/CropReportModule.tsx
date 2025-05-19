
"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateCropReport, GenerateCropReportInput, GenerateCropReportOutput } from '@/ai/flows/generate-crop-report';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CropReportSchema = z.object({
  region: z.string().min(1, "Region is required"),
  cropType: z.string().min(1, "Crop type is required"),
  weatherData: z.string().min(1, "Weather data is required"),
  satelliteImagery: z.string().refine(val => val.startsWith('data:image/') && val.includes(';base64,'), {
    message: "Satellite imagery must be a valid Base64 data URI (e.g., data:image/png;base64,xxxxx)"
  }).or(z.string().url({ message: "Please enter a valid URL for satellite imagery or a data URI" })),
  historicalData: z.string().min(1, "Historical data is required"),
});

type CropReportFormValues = z.infer<typeof CropReportSchema>;

const CropReportModule: React.FC = () => {
  const [reportResult, setReportResult] = useState<GenerateCropReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CropReportFormValues>({
    resolver: zodResolver(CropReportSchema),
    defaultValues: {
      region: '',
      cropType: '',
      weatherData: '',
      satelliteImagery: '',
      historicalData: '',
    },
  });

  const onSubmit: SubmitHandler<CropReportFormValues> = async (data) => {
    setIsLoading(true);
    setReportResult(null);
    try {
      // For demo purposes, if a URL is provided for satellite imagery, replace it with a placeholder data URI.
      // A real application would handle file uploads and convert to base64 or use URLs directly if the AI model supports it.
      let imageryData = data.satelliteImagery;
      if (data.satelliteImagery.startsWith('http')) {
          // This is a placeholder. Actual image fetching and conversion would be needed.
          // For genkit, it needs a data URI.
          toast({ title: "Image Handling", description: "Using placeholder image data for URL input.", variant: "default" });
          // A very small transparent PNG
          imageryData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      }


      const inputData: GenerateCropReportInput = {
        ...data,
        satelliteImagery: imageryData,
      };
      const result = await generateCropReport(inputData);
      setReportResult(result);
      toast({ title: "Report Generated", description: "Crop health report successfully generated." });
    } catch (error) {
      console.error("Error generating crop report:", error);
      toast({ title: "Error", description: "Failed to generate crop report. " + (error instanceof Error ? error.message : String(error)), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle file input and convert to Base64 data URI
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        form.setError('satelliteImagery', { type: 'manual', message: 'Please select an image file.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('satelliteImagery', reader.result as string);
        form.clearErrors('satelliteImagery'); 
      };
      reader.onerror = () => {
        form.setError('satelliteImagery', { type: 'manual', message: 'Failed to read file.' });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Crop Health Report</CardTitle>
          <CardDescription>Generate a crop health report using AI based on provided data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="region" render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl><Input placeholder="e.g., Maharashtra" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="cropType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Type</FormLabel>
                  <FormControl><Input placeholder="e.g., Cotton" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="weatherData" render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather Data</FormLabel>
                  <FormControl><Textarea placeholder="Describe recent weather patterns, temperature, rainfall..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="satelliteImagery" render={({ field }) => (
                <FormItem>
                  <FormLabel>Satellite Imagery (URL or Upload)</FormLabel>
                  <FormControl>
                    <div>
                      <Input 
                        placeholder="Enter image URL or upload" 
                        value={field.value.startsWith('data:image/') ? '(File uploaded)' : field.value}
                        onChange={(e) => {
                          // If user types (not a data URI yet), update field value directly
                          if (!e.target.value.startsWith('data:image/')) {
                            field.onChange(e.target.value);
                          }
                        }}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        name={field.name}
                      />
                       <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="mt-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="historicalData" render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Data</FormLabel>
                  <FormControl><Textarea placeholder="Describe past yields, common issues in the region..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Report</CardTitle>
          <CardDescription>The AI-generated crop health assessment will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Generating report, please wait...</p>
            </div>
          )}
          {reportResult && !isLoading && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" />Overall Health</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{reportResult.overallHealth}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center"><AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />Potential Risks</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{reportResult.potentialRisks}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-blue-500" />Recommended Actions</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{reportResult.recommendedActions}</p>
              </div>
            </div>
          )}
          {!reportResult && !isLoading && (
            <p className="text-muted-foreground text-center py-8">Submit the form to generate a crop health report.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CropReportModule;
