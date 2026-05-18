import { useState } from "react"
import {
  FileText,
  Upload,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  Edit,
  Shield,
  Hash,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { documents } from "@/data/mock"
import type { Document } from "@/types"

const statusConfig: Record<Document["status"], { label: string; variant: "success" | "warning" | "info" | "secondary" }> = {
  draft: { label: "Draft", variant: "secondary" },
  review: { label: "In Review", variant: "warning" },
  approved: { label: "Approved", variant: "info" },
  published: { label: "Published", variant: "success" },
}

const categories = ["All", "Kebijakan", "SOP", "Framework", "Komitmen", "Formulir"]

export function Compliance() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: documents.length,
    published: documents.filter((d) => d.status === "published").length,
    review: documents.filter((d) => d.status === "review").length,
    draft: documents.filter((d) => d.status === "draft").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Repository</h1>
          <p className="text-muted-foreground">Manage policies, SOPs, and compliance documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload a document to the compliance repository. It will be encrypted with AES-256 and stored securely.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" placeholder="e.g., Anti-Bribery Policy 2026" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of this document..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>File</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, JPG, PNG (max 50MB)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  File will be encrypted with AES-256-GCM before storage
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Upload & Encrypt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.published}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.review}</p>
                <p className="text-xs text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-500/10 p-2">
                <Edit className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">Drafts</p>
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
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.slice(0, 4).map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground">
              <div className="col-span-4">Document</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Version</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Uploaded</div>
              <div className="col-span-1"></div>
            </div>
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="grid cursor-pointer grid-cols-12 items-center gap-4 border-b px-4 py-3 text-sm transition-colors last:border-0 hover:bg-muted/30"
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">{doc.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{doc.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className="font-normal">{doc.category}</Badge>
                </div>
                <div className="col-span-1">
                  <span className="text-muted-foreground">v{doc.version}</span>
                </div>
                <div className="col-span-2">
                  <Badge variant={statusConfig[doc.status].variant}>
                    {statusConfig[doc.status].label}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">{doc.uploadedBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(doc.uploadedAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="col-span-1 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedDoc(doc)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      {doc.status === "review" && (
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            {filteredDocs.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No documents found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedDoc && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {selectedDoc.title}
                </DialogTitle>
                <DialogDescription>{selectedDoc.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedDoc.category}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-0.5">
                      <Badge variant={statusConfig[selectedDoc.status].variant}>
                        {statusConfig[selectedDoc.status].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Version</p>
                    <p className="mt-0.5 text-sm font-medium">v{selectedDoc.version}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">File</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedDoc.fileType} - {selectedDoc.fileSize}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Uploaded By</p>
                    <p className="mt-0.5 text-sm font-medium">{selectedDoc.uploadedBy}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Upload Date</p>
                    <p className="mt-0.5 text-sm font-medium">
                      {new Date(selectedDoc.uploadedAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  </div>
                </div>
                {selectedDoc.hash && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-primary" />
                      <p className="text-xs font-medium text-primary">Blockchain Verified</p>
                    </div>
                    <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                      SHA-256: {selectedDoc.hash}
                    </p>
                    {selectedDoc.blockchainTx && (
                      <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                        Tx: {selectedDoc.blockchainTx}
                      </p>
                    )}
                  </div>
                )}
                {selectedDoc.approvedBy && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-500/5 p-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm">
                      Approved by <span className="font-medium">{selectedDoc.approvedBy}</span> on{" "}
                      {new Date(selectedDoc.approvedAt!).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
                {selectedDoc.status === "review" && (
                  <Button className="gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Approve Document
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
