import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { Login } from "@/pages/Login"
import { Dashboard } from "@/pages/Dashboard"
import { Compliance } from "@/pages/Compliance"
import { RiskAudit } from "@/pages/RiskAudit"
import { AuditLog } from "@/pages/AuditLog"
import { Whistleblowing } from "@/pages/Whistleblowing"
import { Evidence } from "@/pages/Evidence"
import { Settings } from "@/pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/risk" element={<RiskAudit />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/whistleblowing" element={<Whistleblowing />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
