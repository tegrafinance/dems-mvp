import { useState } from "react"
import {
  ClipboardList,
  Search,
  Download,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  FileText,
  UserCheck,
  Anchor,
  LogIn,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { auditLogs } from "@/data/mock"

const actionIcons: Record<string, typeof ArrowUpRight> = {
  UPLOAD: ArrowUpRight,
  APPROVE: CheckCircle2,
  CREATE: TrendingUp,
  LOGIN: LogIn,
  DOWNLOAD: FileText,
  UPDATE: Clock,
  ANCHOR: Anchor,
  ASSIGN: UserCheck,
  VERIFY: Shield,
}

const actionColors: Record<string, string> = {
  UPLOAD: "bg-blue-500/10 text-blue-600",
  APPROVE: "bg-emerald-500/10 text-emerald-600",
  CREATE: "bg-amber-500/10 text-amber-600",
  LOGIN: "bg-gray-500/10 text-gray-600",
  DOWNLOAD: "bg-purple-500/10 text-purple-600",
  UPDATE: "bg-orange-500/10 text-orange-600",
  ANCHOR: "bg-primary/10 text-primary",
  ASSIGN: "bg-cyan-500/10 text-cyan-600",
  VERIFY: "bg-emerald-500/10 text-emerald-600",
}

export function AuditLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState("all")

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = filterAction === "all" || log.action === filterAction
    return matchesSearch && matchesAction
  })

  const uniqueActions = Array.from(new Set(auditLogs.map((l) => l.action)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground">Tamper-proof activity trail with blockchain anchoring</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2"><ClipboardList className="h-4 w-4 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2"><Shield className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold">{auditLogs.filter((l) => l.action === "ANCHOR" || l.action === "VERIFY").length}</p>
                <p className="text-xs text-muted-foreground">Blockchain Ops</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2"><UserCheck className="h-4 w-4 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{new Set(auditLogs.map((l) => l.userId)).size}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2"><Clock className="h-4 w-4 text-purple-600" /></div>
              <div>
                <p className="text-2xl font-bold">Today</p>
                <p className="text-xs text-muted-foreground">Last Activity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search audit logs..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const Icon = actionIcons[log.action] || Clock
              const colorClass = actionColors[log.action] || "bg-gray-500/10 text-gray-600"

              return (
                <div key={log.id} className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/30">
                  <div className={`rounded-lg p-2 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{log.userName}</span>
                      <Badge variant="outline" className="text-[10px]">{log.action}</Badge>
                      <span className="text-xs text-muted-foreground">{log.resourceType}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(log.timestamp).toLocaleString("id-ID")}</span>
                      <span>IP: {log.ipAddress}</span>
                      <span className="font-mono">{log.resourceId}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredLogs.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">No audit logs match your filter.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
