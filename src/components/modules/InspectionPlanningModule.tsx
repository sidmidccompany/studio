"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, MapPin, QrCode, Fingerprint, Camera, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const equipmentList = [
  { id: 'truscan', name: 'TruScan Device', icon: QrCode },
  { id: 'gemini', name: 'Gemini Analyzer', icon: Fingerprint },
  { id: 'bodycam', name: 'Axon Body Cam', icon: Camera },
  { id: 'gps', name: 'GPS Tracker', icon: MapPin },
];

const officers = [
  'Ram Kumar', 'Priya Sharma', 'Suresh Patil', 'Anjali Singh', 'Vikram Reddy'
];

const InspectionPlanningModule: React.FC = () => {
  const { addInspectionTask, inspectionTasks } = useAppContext();
  const { toast } = useToast();
  const [newTask, setNewTask] = useState({
    officer: '',
    date: '',
    location: '',
    targetType: '',
    equipment: [] as string[]
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (itemId: string) => {
    const currentEquipment = newTask.equipment;
    const newEquipment = currentEquipment.includes(itemId)
      ? currentEquipment.filter(id => id !== itemId)
      : [...currentEquipment, itemId];
    handleInputChange('equipment', newEquipment);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.officer || !newTask.date || !newTask.location || !newTask.targetType) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    addInspectionTask(newTask);
    toast({ title: "Success", description: "Inspection task created successfully!" });
    setNewTask({ officer: '', date: '', location: '', targetType: '', equipment: [] });
  };
  
  // Mock weekly schedule
  const weeklySchedule = [
    { day: "Monday", tasks: inspectionTasks.filter(t => new Date(t.date).getDay() === 1).slice(0,2) },
    { day: "Tuesday", tasks: inspectionTasks.filter(t => new Date(t.date).getDay() === 2).slice(0,1) },
    { day: "Wednesday", tasks: inspectionTasks.filter(t => new Date(t.date).getDay() === 3).slice(0,2) },
    { day: "Thursday", tasks: inspectionTasks.filter(t => new Date(t.date).getDay() === 4).slice(0,1) },
    { day: "Friday", tasks: inspectionTasks.filter(t => new Date(t.date).getDay() === 5).slice(0,2) },
  ];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Create Inspection Visit Plan</CardTitle>
          <CardDescription>Schedule new inspection tasks for field officers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="officer">Field Officer</Label>
              <Select value={newTask.officer} onValueChange={(value) => handleInputChange('officer', value)}>
                <SelectTrigger id="officer">
                  <SelectValue placeholder="Select Officer" />
                </SelectTrigger>
                <SelectContent>
                  {officers.map(officer => (
                    <SelectItem key={officer} value={officer}>{officer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date">Visit Date & Time</Label>
              <Input 
                id="date" 
                type="datetime-local" 
                value={newTask.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="e.g., Kolhapur Market, Sangli Warehouse" 
                value={newTask.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="targetType">Target Type</Label>
              <Select value={newTask.targetType} onValueChange={(value) => handleInputChange('targetType', value)}>
                <SelectTrigger id="targetType">
                  <SelectValue placeholder="Select Target Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="market-survey">Market Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Equipment Assignment</Label>
              <div className="space-y-2 mt-2 p-3 border rounded-md">
                {equipmentList.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={item.id} 
                      checked={newTask.equipment.includes(item.id)}
                      onCheckedChange={() => handleEquipmentChange(item.id)}
                    />
                    <Label htmlFor={item.id} className="flex items-center font-normal cursor-pointer">
                      <item.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                      {item.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button type="submit" className="w-full">Create Inspection Task</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Visit Calendar</CardTitle>
          <CardDescription>Overview of scheduled visits for the week.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
           {weeklySchedule.map(({ day, tasks }) => (
            <div key={day} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{day}</p>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {tasks.length} visit{tasks.length !== 1 ? 's' : ''}
                </span>
              </div>
              {tasks.length > 0 && (
                <div className="mt-2 space-y-1 text-sm">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center text-muted-foreground">
                      <User className="w-3 h-3 mr-1.5 flex-shrink-0" /> 
                      <span className="truncate" title={`${task.officer} at ${task.location}`}>{task.officer} - {task.location}</span>
                    </div>
                  ))}
                </div>
              )}
               {tasks.length === 0 && (
                 <p className="text-xs text-muted-foreground mt-1">No visits scheduled.</p>
               )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionPlanningModule;
