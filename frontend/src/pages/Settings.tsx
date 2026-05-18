import {
  User,
  Shield,
  Bell,
  Database,
  Link2,
  Save,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system configuration</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="blockchain" className="gap-2"><Link2 className="h-4 w-4" /> Blockchain</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Ahmad Suryadi" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="ahmad.suryadi@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <div className="flex h-10 items-center gap-2 rounded-md border px-3">
                    <Badge variant="info">Admin</Badge>
                    <span className="text-sm text-muted-foreground">System Administrator</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Input defaultValue="Compliance & Legal" />
                </div>
              </div>
              <Separator />
              <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Settings</CardTitle>
              <CardDescription>Configure security and encryption preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Encryption</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data at Rest</span>
                      <Badge variant="success">AES-256-GCM</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">All stored documents are encrypted</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data in Transit</span>
                      <Badge variant="success">TLS 1.3</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">All communications are encrypted</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Password</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div />
                  <div className="grid gap-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" />
                  </div>
                </div>
                <Button variant="outline" className="gap-2"><Shield className="h-4 w-4" /> Update Password</Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">2FA Status</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Blockchain Configuration</CardTitle>
              <CardDescription>Manage Base blockchain connection and anchoring settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network</span>
                    <Badge variant="info">Base (Ethereum L2)</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Connected to Base mainnet</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Last sync: 2 minutes ago</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Smart Contract Address</Label>
                  <Input
                    className="font-mono text-sm"
                    defaultValue="0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18"
                    readOnly
                  />
                </div>
                <div className="grid gap-2">
                  <Label>RPC Endpoint</Label>
                  <Input
                    className="font-mono text-sm"
                    defaultValue="https://mainnet.base.org"
                    readOnly
                  />
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Anchoring Statistics</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold">142</p>
                    <p className="text-xs text-muted-foreground">Total Anchored</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">0.002</p>
                    <p className="text-xs text-muted-foreground">Avg Gas (ETH)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Document Approvals", desc: "When documents need your approval", defaultOn: true },
                { title: "Risk Alerts", desc: "When new critical risks are identified", defaultOn: true },
                { title: "WBS Updates", desc: "Updates on whistleblowing cases", defaultOn: true },
                { title: "Blockchain Confirmations", desc: "When evidence anchoring is confirmed", defaultOn: false },
                { title: "Audit Log Digest", desc: "Daily summary of audit trail activity", defaultOn: false },
                { title: "System Updates", desc: "Platform maintenance and feature updates", defaultOn: true },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked={item.defaultOn} className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-muted peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-ring after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
