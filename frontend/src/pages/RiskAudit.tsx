import { useState } from "react"
import {
  ShieldAlert,
  Plus,
  Search,
  AlertTriangle,
  TrendingDown,
  BarChart3,
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
  DialogTrigger,
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
import { risks } from "@/data/mock"
import type { Risk } from "@/types"

const riskLevelConfig: Record<Risk["riskLevel"], { label: string; variant: "destructive" | "warning" | "info" | "success"; color: string }> = {
  critical: { label: "Critical", variant: "destructive", color: "bg-red-500" },
  high: { label: "High", variant: "warning", color: "bg-orange-500" },
  medium: { label: "Medium", variant: "info", color: "bg-yellow-500" },
  low: { label: "Low", variant: "success", color: "bg-green-500" },
}


function getHeatmapColor(likelihood: number, impact: number): string {
  const score = likelihood * impact
  if (score >= 16) return "bg-red-500 text-white"
  if (score >= 10) return "bg-orange-500 text-white"
  if (score >= 5) return "bg-yellow-500 text-yellow-950"
  return "bg-green-500 text-white"
}

function getRisksInCell(likelihood: number, impact: number): Risk[] {
  return risks.filter((r) => r.likelihood === likelihood && r.impact === impact)
}

export function RiskAudit() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredRisks = risks.filter((risk) => {
    const matchesSearch =
      risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      risk.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || risk.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: risks.length,
    critical: risks.filter((r) => r.riskLevel === "critical").length,
    high: risks.filter((r) => r.riskLevel === "high").length,
    open: risks.filter((r) => r.status === "open").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Risk & Audit Engine</h1>
          <p className="text-muted-foreground">Dynamic risk assessment and monitoring</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Risk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Register New Risk</DialogTitle>
              <DialogDescription>Add a new risk entry to the register for assessment and monitoring.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="risk-title">Risk Title</Label>
                <Input id="risk-title" placeholder="e.g., Data Breach via Third-Party" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="risk-desc">Description</Label>
                <Textarea id="risk-desc" placeholder="Describe the risk in detail..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Cybersecurity", "Compliance", "Fraud", "Corruption", "Operational", "Legal", "HR", "IT"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Risk Owner</Label>
                  <Input placeholder="Assigned owner" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Likelihood (1-5)</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n} - {["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"][n - 1]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Impact (1-5)</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n} - {["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"][n - 1]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Register Risk</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2"><BarChart3 className="h-4 w-4 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-2"><AlertTriangle className="h-4 w-4 text-red-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.critical}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2"><ShieldAlert className="h-4 w-4 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.high}</p>
                <p className="text-xs text-muted-foreground">High Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2"><TrendingDown className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.open}</p>
                <p className="text-xs text-muted-foreground">Open Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heatmap">
        <TabsList>
          <TabsTrigger value="heatmap">Risk Heatmap</TabsTrigger>
          <TabsTrigger value="register">Risk Register</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Heatmap Matrix (5x5)</CardTitle>
              <CardDescription>Likelihood vs Impact — hover cells to see risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="mb-2 -rotate-90 whitespace-nowrap text-xs font-medium text-muted-foreground">
                    LIKELIHOOD →
                  </span>
                </div>
                <div className="flex-1">
                  <div className="mb-1 grid grid-cols-6 gap-1">
                    <div />
                    {["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"].map((label, i) => (
                      <div key={label} className="text-center text-[10px] font-medium text-muted-foreground">{i + 1}</div>
                    ))}
                  </div>
                  {[5, 4, 3, 2, 1].map((likelihood) => (
                    <div key={likelihood} className="grid grid-cols-6 gap-1 mb-1">
                      <div className="flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        {likelihood}
                      </div>
                      {[1, 2, 3, 4, 5].map((impact) => {
                        const cellRisks = getRisksInCell(likelihood, impact)
                        return (
                          <div
                            key={`${likelihood}-${impact}`}
                            className={`relative flex h-16 cursor-pointer items-center justify-center rounded-md transition-transform hover:scale-105 ${getHeatmapColor(likelihood, impact)}`}
                            onClick={() => cellRisks.length > 0 && setSelectedRisk(cellRisks[0])}
                          >
                            <div className="text-center">
                              <div className="text-lg font-bold">{likelihood * impact}</div>
                              {cellRisks.length > 0 && (
                                <div className="text-[10px] font-medium opacity-90">{cellRisks.length} risk{cellRisks.length > 1 ? "s" : ""}</div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                  <div className="mt-1 grid grid-cols-6 gap-1">
                    <div />
                    {["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"].map((label) => (
                      <div key={label} className="text-center text-[10px] text-muted-foreground">{label}</div>
                    ))}
                  </div>
                  <div className="mt-1 text-center text-xs font-medium text-muted-foreground">IMPACT →</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                {[
                  { label: "Low (1-4)", color: "bg-green-500" },
                  { label: "Medium (5-9)", color: "bg-yellow-500" },
                  { label: "High (10-15)", color: "bg-orange-500" },
                  { label: "Critical (16-25)", color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className={`h-3 w-3 rounded ${item.color}`} />
                    {item.label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search risks..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="mitigating">Mitigating</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground">
                  <div className="col-span-4">Risk</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-1">L</div>
                  <div className="col-span-1">I</div>
                  <div className="col-span-1">Score</div>
                  <div className="col-span-1">Level</div>
                  <div className="col-span-2">Status</div>
                </div>
                {filteredRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className="grid cursor-pointer grid-cols-12 items-center gap-4 border-b px-4 py-3 text-sm transition-colors last:border-0 hover:bg-muted/30"
                    onClick={() => setSelectedRisk(risk)}
                  >
                    <div className="col-span-4">
                      <p className="font-medium">{risk.title}</p>
                      <p className="text-xs text-muted-foreground">{risk.owner}</p>
                    </div>
                    <div className="col-span-2">
                      <Badge variant="outline" className="font-normal">{risk.category}</Badge>
                    </div>
                    <div className="col-span-1 font-medium">{risk.likelihood}</div>
                    <div className="col-span-1 font-medium">{risk.impact}</div>
                    <div className="col-span-1">
                      <span className="font-bold">{risk.riskScore}</span>
                    </div>
                    <div className="col-span-1">
                      <Badge variant={riskLevelConfig[risk.riskLevel].variant} className="text-[10px]">
                        {riskLevelConfig[risk.riskLevel].label}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <Badge variant={risk.status === "closed" ? "success" : risk.status === "mitigating" ? "info" : "warning"}>
                        {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedRisk} onOpenChange={() => setSelectedRisk(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedRisk && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  {selectedRisk.title}
                </DialogTitle>
                <DialogDescription>{selectedRisk.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Likelihood</p>
                    <p className="mt-0.5 text-2xl font-bold">{selectedRisk.likelihood}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Impact</p>
                    <p className="mt-0.5 text-2xl font-bold">{selectedRisk.impact}</p>
                  </div>
                  <div className={`rounded-lg p-3 text-center ${selectedRisk.riskLevel === "critical" ? "bg-red-500/10" : selectedRisk.riskLevel === "high" ? "bg-orange-500/10" : "bg-yellow-500/10"}`}>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="mt-0.5 text-2xl font-bold">{selectedRisk.riskScore}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedRisk.category}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Owner</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedRisk.owner}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-0.5">
                      <Badge variant={selectedRisk.status === "closed" ? "success" : selectedRisk.status === "mitigating" ? "info" : "warning"}>
                        {selectedRisk.status.charAt(0).toUpperCase() + selectedRisk.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(selectedRisk.updatedAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Edit Risk</Button>
                <Button>Update Status</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
