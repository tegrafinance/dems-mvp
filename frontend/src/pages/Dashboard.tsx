import {
  FileText,
  ShieldAlert,
  AlertTriangle,
  Anchor,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { dashboardStats, chartData, auditLogs } from "@/data/mock"

const statCards = [
  {
    title: "Total Documents",
    value: dashboardStats.totalDocuments,
    subtitle: `${dashboardStats.pendingApprovals} pending approval`,
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    trend: "+12%",
  },
  {
    title: "Active Risks",
    value: dashboardStats.totalRisks,
    subtitle: `${dashboardStats.criticalRisks} critical`,
    icon: ShieldAlert,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    trend: "-3%",
  },
  {
    title: "WBS Cases",
    value: dashboardStats.openCases,
    subtitle: `${dashboardStats.resolvedCases} resolved total`,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-500/10",
    trend: "+2",
  },
  {
    title: "Evidence Anchored",
    value: dashboardStats.totalAnchored,
    subtitle: `${dashboardStats.pendingAnchors} pending`,
    icon: Anchor,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    trend: "+18%",
  },
]

const COLORS = ["#3b82f6", "#f59e0b", "#f97316", "#8b5cf6", "#06b6d4", "#10b981"]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview sistem manajemen dokumen dan bukti digital
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="gap-1 font-normal">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Evidence Anchoring Activity</CardTitle>
            <CardDescription>Documents anchored to Base blockchain per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.anchoringActivity}>
                <defs>
                  <linearGradient id="colorAnchored" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="anchored" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAnchored)" />
                <Area type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} fillOpacity={0.1} fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Risks by Category</CardTitle>
            <CardDescription>Distribution of identified risks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData.risksByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {chartData.risksByCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {chartData.risksByCategory.map((item, i) => (
                <div key={item.category} className="flex items-center gap-2 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{item.category}</span>
                  <span className="ml-auto font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Documents Uploaded</CardTitle>
            <CardDescription>Monthly document upload activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData.documentsPerMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Latest audit trail entries</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                    {log.action === "UPLOAD" && <ArrowUpRight className="h-3 w-3 text-primary" />}
                    {log.action === "APPROVE" && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                    {log.action === "CREATE" && <TrendingUp className="h-3 w-3 text-amber-600" />}
                    {log.action === "LOGIN" && <Clock className="h-3 w-3 text-muted-foreground" />}
                    {log.action === "DOWNLOAD" && <FileText className="h-3 w-3 text-blue-600" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm leading-tight">
                      <span className="font-medium">{log.userName}</span>{" "}
                      <span className="text-muted-foreground">{log.details}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">System Health</CardTitle>
          <CardDescription>Blockchain connection and system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base Blockchain</span>
                <Badge variant="success">Connected</Badge>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Encryption Service</span>
                <Badge variant="success">Active</Badge>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Storage Usage</span>
                <span className="text-xs text-muted-foreground">67%</span>
              </div>
              <Progress value={67} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
