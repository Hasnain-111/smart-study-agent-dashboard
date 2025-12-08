"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Lock, Palette, LogOut } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [email, setEmail] = useState("student@example.com")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="p-6 md:p-8 space-y-6 fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card className="glass-effect border border-border/30 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Account Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border/50"
            />
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent/80">Update Email</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="glass-effect border border-border/30 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Enable daily study reminders</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Notify me when new content is available</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Send weekly progress reports</span>
          </label>
        </div>
      </Card>

      {/* Theme Settings */}
      <Card className="glass-effect border border-border/30 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Appearance
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Theme is automatically set to match your system preferences
          </p>
          <Button variant="outline" className="border-border/50 bg-transparent">
            System Default
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="glass-effect border border-border/30 p-6 border-destructive/30">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <LogOut className="w-5 h-5 text-destructive" />
          Danger Zone
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Once you log out, you'll need to log in again to access your account.
          </p>
          <Button variant="destructive" className="w-full">
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  )
}
