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
import { createPlantingSchedule, CreatePlantingScheduleInput, CreatePlantingScheduleOutput } from '@/ai/flows/create-planting-schedule';
import { Loader2, CalendarCheck } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PlantingScheduleSchema = z.object({
  cropType: z.string().min(1, "Crop type is required"),
  location: z.string().min(1, "Location is required"),
  weatherData: z.string().optional(),
  farmerPreferences: z.string().optional(),
});

type PlantingScheduleFormValues = z.infer<typeof PlantingScheduleSchema>;

const PlantingScheduleModule: React.FC = () => {
  const [scheduleResult, setScheduleResult] = useState<CreatePlantingScheduleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PlantingScheduleFormValues>({
    resolver: zodResolver(PlantingScheduleSchema),
    defaultValues: {
      cropType: '',
      location: '',
      weatherData: '',
      farmerPreferences: '',
    },
  });

  const onSubmit: SubmitHandler<PlantingScheduleFormValues> = async (data) => {
    setIsLoading(true);
    setScheduleResult(null);
    try {
      const inputData: CreatePlantingScheduleInput = {
        ...data,
        weatherData: data.weatherData || "No specific weather data provided by user.", // Ensure default is passed if empty
        farmerPreferences: data.farmerPreferences || "No specific farmer preferences provided." // Ensure default is passed if empty
      };
      const result = await createPlantingSchedule(inputData);
      setScheduleResult(result);
      toast({ title: "Schedule Created", description: "Planting schedule successfully generated." });
    } catch (error) {
      console.error("Error creating planting schedule:", error);
      toast({ title: "Error", description: "Failed to create planting schedule. " + (error instanceof Error ? error.message : String(error)), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Planting Schedule Generator</CardTitle>
          <CardDescription>Create an optimized planting schedule using AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="cropType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Type</FormLabel>
                  <FormControl><Input placeholder="e.g., Tomato, Wheat" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input placeholder="e.g., Nashik, Maharashtra" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="weatherData" render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather Data (Optional)</FormLabel>
                  <FormControl><Textarea placeholder="Describe typical weather, soil type, or link to local forecast..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="farmerPreferences" render={({ field }) => (
                <FormItem>
                  <FormLabel>Farmer Preferences (Optional)</FormLabel>
                  <FormControl><Textarea placeholder="e.g., Organic farming, specific machinery availability..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Schedule
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Planting Schedule</CardTitle>
          <CardDescription>The AI-generated schedule and rationale will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[70vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Generating schedule, please wait...</p>
            </div>
          )}
          {scheduleResult && !isLoading && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg flex items-center mb-2"><CalendarCheck className="h-5 w-5 mr-2 text-primary" />Planting Schedule</h3>
                <div className="p-3 border rounded-md bg-muted/30 whitespace-pre-wrap text-sm">
                  {scheduleResult.plantingSchedule}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Rationale</h3>
                 <div className="p-3 border rounded-md bg-muted/30 whitespace-pre-wrap text-sm">
                  {scheduleResult.rationale}
                </div>
              </div>
            </div>
          )}
          {!scheduleResult && !isLoading && (
            <p className="text-muted-foreground text-center py-8">Submit the form to generate a planting schedule.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantingScheduleModule;
