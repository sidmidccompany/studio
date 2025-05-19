"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";

const FormSettingsModule: React.FC = () => {
  const { toast } = useToast();
  const [accountSettings, setAccountSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
  });
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const saveAccountSettings = () => {
    toast({ title: "Account Settings Saved", description: "Your account details have been updated." });
  };

  const changePassword = () => {
    if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
      toast({ title: "Password Mismatch", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwordFields.newPassword.length < 8) {
      toast({ title: "Weak Password", description: "New password should be at least 8 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Password Changed", description: "Your password has been successfully updated." });
    setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const saveNotificationPreferences = () => {
    toast({ title: "Preferences Saved", description: "Notification settings updated." });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Application Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={accountSettings.name} onChange={handleAccountChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={accountSettings.email} onChange={handleAccountChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={accountSettings.phone} onChange={handleAccountChange} />
            </div>
          </div>
          <Button onClick={saveAccountSettings}>Save Account Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" name="currentPassword" type="password" value={passwordFields.currentPassword} onChange={handlePasswordChange} />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" value={passwordFields.newPassword} onChange={handlePasswordChange} />
          </div>
          <div>
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={passwordFields.confirmNewPassword} onChange={handlePasswordChange} />
          </div>
          <Button onClick={changePassword}>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications from Agri Shield.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about form status, alerts, etc.</p>
            </div>
            <Switch id="emailNotifications" checked={notifications.email} onCheckedChange={() => handleNotificationChange('email')} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive critical alerts via text message.</p>
            </div>
            <Switch id="smsNotifications" checked={notifications.sms} onCheckedChange={() => handleNotificationChange('sms')} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive real-time push notifications on this device.</p>
            </div>
            <Switch id="pushNotifications" checked={notifications.push} onCheckedChange={() => handleNotificationChange('push')} />
          </div>
          <Button onClick={saveNotificationPreferences}>Save Notification Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSettingsModule;
