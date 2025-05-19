"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'orange';
}

export function StatCard({ title, value, trend, icon, color = "blue" }: StatCardProps) {
  const colorVariants = {
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-400',
    red: 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-400',
    green: 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-400',
    yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400',
    purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900 dark:text-purple-400',
    orange: 'text-orange-500 bg-orange-100 dark:bg-orange-900 dark:text-orange-400',
  };
  
  const trendColor = trend && trend.startsWith('+') ? 'text-green-500' : trend && trend.startsWith('-') ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-md", colorVariants[color])}>
          {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", colorVariants[color].split(' ')[0])}>{value}</div>
        {trend && <p className={cn("text-xs mt-1", trendColor)}>{trend}</p>}
      </CardContent>
    </Card>
  );
}
