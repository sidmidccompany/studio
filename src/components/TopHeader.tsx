"use client";

import React from 'react';
import { useAppContext } from '@/components/providers/app-provider';
import { USER_ROLES } from '@/lib/constants';
import { Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function TopHeader() {
  const { activeTab, userRole, setUserRole, allowedTabs } = useAppContext();
  const { theme, setTheme } = useTheme();

  const currentTab = allowedTabs.find(tab => tab.id === activeTab);
  const userInitials = userRole.split(' ').map(word => word[0]).join('').toUpperCase();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-card shadow-sm p-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">
          {currentTab?.text || 'Dashboard'}
        </h2>
        <div className="flex items-center space-x-4">
          <Select value={userRole} onValueChange={(value) => setUserRole(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(USER_ROLES).map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={`https://placehold.co/40x40.png?text=${userInitials}`} alt={userRole} data-ai-hint="user avatar" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm text-foreground hidden md:inline">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
