export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "officer" | "viewer"
  avatar?: string
}

export interface Document {
  id: string
  title: string
  description: string
  category: string
  status: "draft" | "review" | "approved" | "published"
  version: number
  fileType: string
  fileSize: string
  uploadedBy: string
  uploadedAt: string
  approvedBy?: string
  approvedAt?: string
  hash?: string
  blockchainTx?: string
}

export interface Risk {
  id: string
  title: string
  description: string
  category: string
  likelihood: number
  impact: number
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  owner: string
  status: "open" | "mitigating" | "closed"
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resourceType: string
  resourceId: string
  details: string
  ipAddress: string
  timestamp: string
}

export interface WBSReport {
  id: string
  caseId: string
  category: string
  priority: "low" | "medium" | "high" | "critical"
  status: "received" | "reviewing" | "investigating" | "resolved" | "closed"
  summary: string
  assignedTo?: string
  reportHash: string
  blockchainTx?: string
  createdAt: string
  updatedAt: string
}

export interface EvidenceAnchor {
  id: string
  documentId: string
  documentTitle: string
  hash: string
  txHash: string
  blockNumber: number
  chain: string
  status: "pending" | "confirmed" | "failed"
  anchoredAt: string
}

export interface DashboardStats {
  totalDocuments: number
  pendingApprovals: number
  totalRisks: number
  criticalRisks: number
  openCases: number
  resolvedCases: number
  totalAnchored: number
  pendingAnchors: number
}
