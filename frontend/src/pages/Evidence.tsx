import { useState } from "react"
import {
  Anchor,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Shield,
  FileText,
  RefreshCw,
  Copy,
  Link2,
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
import { Progress } from "@/components/ui/progress"
import { evidenceAnchors, dashboardStats } from "@/data/mock"
import type { EvidenceAnchor } from "@/types"

const statusConfig: Record<EvidenceAnchor["status"], { label: string; variant: "success" | "warning" | "destructive"; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirmed", variant: "success", icon: CheckCircle2 },
  pending: { label: "Pending", variant: "warning", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: XCircle },
}

export function Evidence() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAnchor, setSelectedAnchor] = useState<EvidenceAnchor | null>(null)
  const [verifyHash, setVerifyHash] = useState("")
  const [verifyResult, setVerifyResult] = useState<"idle" | "verifying" | "valid" | "invalid">("idle")

  const filteredAnchors = evidenceAnchors.filter((anchor) =>
    anchor.documentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anchor.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anchor.txHash.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: evidenceAnchors.length,
    confirmed: evidenceAnchors.filter((a) => a.status === "confirmed").length,
    pending: evidenceAnchors.filter((a) => a.status === "pending").length,
    failed: evidenceAnchors.filter((a) => a.status === "failed").length,
  }

  const handleVerify = () => {
    setVerifyResult("verifying")
    setTimeout(() => {
      const found = evidenceAnchors.find((a) => a.hash === verifyHash || a.txHash === verifyHash)
      setVerifyResult(found ? "valid" : "invalid")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evidence Anchoring</h1>
          <p className="text-muted-foreground">Blockchain-based document integrity verification on Base</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Sync Status
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2"><Anchor className="h-4 w-4 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">{dashboardStats.totalAnchored}</p>
                <p className="text-xs text-muted-foreground">Total Anchored</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
                <p className="text-xs text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2"><Clock className="h-4 w-4 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2"><Link2 className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">Base</p>
                <p className="text-xs text-muted-foreground">Blockchain Network</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="anchors">
        <TabsList>
          <TabsTrigger value="anchors">Anchored Evidence</TabsTrigger>
          <TabsTrigger value="verify">Verify Document</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-primary" />
                Document Integrity Verification
              </CardTitle>
              <CardDescription>
                Verify document integrity by entering its SHA-256 hash or blockchain transaction hash
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-xl space-y-6">
                <div className="grid gap-2">
                  <Label>Document Hash or Transaction Hash</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter SHA-256 hash or 0x... transaction hash"
                      className="font-mono text-sm"
                      value={verifyHash}
                      onChange={(e) => { setVerifyHash(e.target.value); setVerifyResult("idle") }}
                    />
                    <Button onClick={handleVerify} disabled={!verifyHash || verifyResult === "verifying"} className="gap-2">
                      {verifyResult === "verifying" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      Verify
                    </Button>
                  </div>
                </div>

                {verifyResult === "verifying" && (
                  <div className="space-y-3 rounded-lg border p-6 text-center">
                    <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium">Verifying on Base blockchain...</p>
                    <Progress value={66} className="mx-auto h-1.5 w-48" />
                  </div>
                )}

                {verifyResult === "valid" && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-emerald-500/20 p-2">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-600">Document Verified</p>
                        <p className="text-sm text-muted-foreground">
                          This document's integrity is confirmed on Base blockchain
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 rounded-lg bg-background/50 p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-medium">Base (Ethereum L2)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="success">Confirmed</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Timestamp</span>
                        <span className="font-medium">Immutable & Tamper-proof</span>
                      </div>
                    </div>
                  </div>
                )}

                {verifyResult === "invalid" && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-destructive/20 p-2">
                        <XCircle className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <p className="font-semibold text-destructive">Verification Failed</p>
                        <p className="text-sm text-muted-foreground">
                          No matching record found on blockchain. Document may have been tampered with.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground">How verification works:</p>
                  <ol className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <li>1. Document is hashed using SHA-256 algorithm</li>
                    <li>2. Hash is compared against Base blockchain records</li>
                    <li>3. Timestamp and block number confirm when document was anchored</li>
                    <li>4. Any modification to the document will produce a different hash</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anchors" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by document, hash, or tx..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">Document</div>
                  <div className="col-span-3">SHA-256 Hash</div>
                  <div className="col-span-2">Tx Hash</div>
                  <div className="col-span-1">Block</div>
                  <div className="col-span-1">Chain</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1"></div>
                </div>
                {filteredAnchors.map((anchor) => {
                  const StatusIcon = statusConfig[anchor.status].icon
                  return (
                    <div
                      key={anchor.id}
                      className="grid cursor-pointer grid-cols-12 items-center gap-4 border-b px-4 py-3 text-sm transition-colors last:border-0 hover:bg-muted/30"
                      onClick={() => setSelectedAnchor(anchor)}
                    >
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium truncate">{anchor.documentTitle}</span>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <code className="text-xs text-muted-foreground truncate block">{anchor.hash.slice(0, 20)}...</code>
                      </div>
                      <div className="col-span-2">
                        <code className="text-xs text-muted-foreground truncate block">{anchor.txHash.slice(0, 14)}...</code>
                      </div>
                      <div className="col-span-1">
                        <span className="font-mono text-xs">{anchor.blockNumber.toLocaleString()}</span>
                      </div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-[10px]">{anchor.chain}</Badge>
                      </div>
                      <div className="col-span-1">
                        <Badge variant={statusConfig[anchor.status].variant} className="gap-1 text-[10px]">
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[anchor.status].label}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedAnchor} onOpenChange={() => setSelectedAnchor(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedAnchor && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-primary" />
                  Evidence Anchor Detail
                </DialogTitle>
                <DialogDescription>{selectedAnchor.documentTitle}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Network</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedAnchor.chain}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Block Number</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedAnchor.blockNumber.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-0.5">
                      <Badge variant={statusConfig[selectedAnchor.status].variant}>
                        {statusConfig[selectedAnchor.status].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Anchored At</p>
                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(selectedAnchor.anchoredAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">SHA-256 Hash</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                    </div>
                    <p className="mt-1 break-all font-mono text-xs">{selectedAnchor.hash}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">Transaction Hash</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                    </div>
                    <p className="mt-1 break-all font-mono text-xs">{selectedAnchor.txHash}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs font-medium text-emerald-600">Immutability Guaranteed</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This evidence has been permanently anchored to the Base blockchain. Any modification to the original document will invalidate this anchor.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> View on Basescan
                </Button>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Re-verify
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
