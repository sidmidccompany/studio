
"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { AppContextType, InspectionTask, Seizure, LabSample, FIRCase, UserRole, TabDefinition } from '@/lib/types';
import { USER_ROLES, TABS } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(USER_ROLES.DAO);
  
  const [inspectionTasks, setInspectionTasks] = useState<InspectionTask[]>([]);
  const [seizures, setSeizures] = useState<Seizure[]>([]);
  const [labSamples, setLabSamples] = useState<LabSample[]>([]);
  const [firCases, setFIRCases] = useState<FIRCase[]>([]);
  const { toast } = useToast();

  const addInspectionTask = useCallback((task: Omit<InspectionTask, 'id' | 'status'>) => {
    setInspectionTasks(prev => [...prev, { ...task, id: `INS-${Date.now()}`, status: 'scheduled' }]);
  }, []);

  const addSeizure = useCallback((seizure: Omit<Seizure, 'id' | 'status'>) => {
    setSeizures(prev => [...prev, { ...seizure, id: `SEZ-${Date.now()}`, status: 'pending' }]);
  }, []);
  
  const updateSeizureStatus = useCallback((seizureId: string, status: Seizure['status']) => {
    setSeizures(prev => prev.map(s => s.id === seizureId ? { ...s, status } : s));
  }, []);

  const addLabSample = useCallback((sample: Omit<LabSample, 'id' | 'status'>) => {
    setLabSamples(prev => [...prev, { ...sample, id: `LAB-${Date.now()}`, status: 'in-transit' }]);
  }, []);

  const updateLabSampleStatus = useCallback((sampleId: string, status: LabSample['status']) => {
    setLabSamples(prev => prev.map(s => s.id === sampleId ? { ...s, status } : s));
  }, []);

  const addFIRCase = useCallback((firCase: Omit<FIRCase, 'id' | 'status'>) => {
    setFIRCases(prev => [...prev, { ...firCase, id: `FIR-${Date.now()}`, status: 'draft' }]);
  }, []);

  const updateFIRCaseStatus = useCallback((caseId: string, status: FIRCase['status']) => {
    setFIRCases(prev => prev.map(c => c.id === caseId ? { ...c, status } : c));
  }, []);

  const allowedTabs = useMemo(() => {
    return TABS.filter(tab => tab.allowedRoles.includes(userRole));
  }, [userRole]);

  useEffect(() => {
    if (allowedTabs.length > 0 && !allowedTabs.find(tab => tab.id === activeTab)) {
      setActiveTab(allowedTabs[0].id);
    }
  }, [allowedTabs, activeTab, setActiveTab]);


  const contextValue = useMemo(() => ({
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    allowedTabs,
    inspectionTasks,
    addInspectionTask,
    seizures,
    addSeizure,
    updateSeizureStatus,
    labSamples,
    addLabSample,
    updateLabSampleStatus,
    firCases,
    addFIRCase,
    updateFIRCaseStatus,
  }), [
    activeTab, 
    userRole,
    allowedTabs,
    inspectionTasks,
    addInspectionTask,
    seizures,
    addSeizure,
    updateSeizureStatus,
    labSamples,
    addLabSample,
    updateLabSampleStatus,
    firCases,
    addFIRCase,
    updateFIRCaseStatus,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
