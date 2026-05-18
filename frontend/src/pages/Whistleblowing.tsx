import { useState } from "react"
import {
  AlertTriangle,
  Search,
  Shield,
  Clock,
  CheckCircle2,
  MessageSquare,
  Lock,
  Hash,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { wbsReports } from "@/data/mock"
import type { WBSReport } from "@/types"

const statusConfig: Record<WBSReport["status"], { label: string; variant: "secondary" | "info" | "warning" | "success" | "destructive"; progress: number }> = {
  received: { label: "Received", variant: "secondary", progress: 20 },
  reviewing: { label: "Reviewing", variant: "info", progress: 40 },
  investigating: { label: "Investigating", variant: "warning", progress: 60 },
  resolved: { label: "Resolved", variant: "success", progress: 100 },
  closed: { label: "Closed", variant: "secondary", progress: 100 },
}

const priorityConfig: Record<WBSReport["priority"], { label: string; variant: "success" | "warning" | "destructive" | "info" }> = {
  low: { label: "Low", variant: "success" },
  medium: { label: "Medium", variant: "info" },
  high: { label: "High", variant: "warning" },
  critical: { label: "Critical", variant: "destructive" },
}

export function Whistleblowing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<WBSReport | null>(null)
  const [activeTab, setActiveTab] = useState("cases")

  const filteredReports = wbsReports.filter((report) =>
    report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: wbsReports.length,
    open: wbsReports.filter((r) => ["received", "reviewing", "investigating"].includes(r.status)).length,
    investigating: wbsReports.filter((r) => r.status === "investigating").length,
    resolved: wbsReports.filter((r) => r.status === "resolved" || r.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Whistleblowing System</h1>
          <p className="text-muted-foreground">Anonymous reporting channel with blockchain protection</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2"><MessageSquare className="h-4 w-4 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2"><Clock className="h-4 w-4 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.open}</p>
                <p className="text-xs text-muted-foreground">Open Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-2"><AlertTriangle className="h-4 w-4 text-red-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.investigating}</p>
                <p className="text-xs text-muted-foreground">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.resolved}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
          <TabsTrigger value="submit">Submit Report</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="h-4 w-4 text-primary" />
                Anonymous Report Submission
              </CardTitle>
              <CardDescription>
                Your identity is fully protected. Reports are encrypted end-to-end and anchored to blockchain for immutability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Your identity is protected</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>- No IP address or metadata is stored</li>
                        <li>- Report is encrypted with AES-256-GCM</li>
                        <li>- Hash anchored to Base blockchain for non-repudiation</li>
                        <li>- Only authorized investigators can access reports</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select report category" /></SelectTrigger>
                    <SelectContent>
                      {["Fraud", "Corruption", "Harassment", "Policy Violation", "Safety Concern", "Data Breach", "Other"].map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Priority Level</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General concern</SelectItem>
                      <SelectItem value="medium">Medium - Requires attention</SelectItem>
                      <SelectItem value="high">High - Urgent matter</SelectItem>
                      <SelectItem value="critical">Critical - Immediate action needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Report Summary</Label>
                  <Textarea
                    placeholder="Describe the incident or concern in detail. Include dates, locations, and individuals involved if possible..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Supporting Evidence (Optional)</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6 text-center">
                    <div>
                      <Shield className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">Click to upload evidence</p>
                      <p className="text-xs text-muted-foreground">Files will be encrypted before upload</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg">
                  <Lock className="h-4 w-4" />
                  Submit Encrypted Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search cases..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/30"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{report.caseId}</span>
                            <Badge variant={priorityConfig[report.priority].variant} className="text-[10px]">
                              {priorityConfig[report.priority].label}
                            </Badge>
                            <Badge variant="outline" className="text-[10px]">{report.category}</Badge>
                          </div>
                          <p className="text-sm">{report.summary}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{new Date(report.createdAt).toLocaleDateString("id-ID")}</span>
                            {report.assignedTo && <span>Assigned: {report.assignedTo}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={statusConfig[report.status].variant}>
                          {statusConfig[report.status].label}
                        </Badge>
                        <div className="mt-2 w-24">
                          <Progress value={statusConfig[report.status].progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredReports.length === 0 && (
                  <div className="py-12 text-center text-sm text-muted-foreground">No cases found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Case {selectedReport.caseId}
                </DialogTitle>
                <DialogDescription>{selectedReport.summary}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedReport.category}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <div className="mt-0.5">
                      <Badge variant={priorityConfig[selectedReport.priority].variant}>
                        {priorityConfig[selectedReport.priority].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-0.5">
                      <Badge variant={statusConfig[selectedReport.status].variant}>
                        {statusConfig[selectedReport.status].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedReport.assignedTo || "Unassigned"}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Submitted</p>
                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(selectedReport.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(selectedReport.updatedAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Case Progress</p>
                  <Progress value={statusConfig[selectedReport.status].progress} className="h-2" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Received</span>
                    <span>Reviewing</span>
                    <span>Investigating</span>
                    <span>Resolved</span>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium text-primary">Blockchain Protected</p>
                  </div>
                  <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                    Report Hash: {selectedReport.reportHash}
                  </p>
                  {selectedReport.blockchainTx && (
                    <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                      Tx: {selectedReport.blockchainTx}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">View Full Report</Button>
                <Button>Update Status</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
