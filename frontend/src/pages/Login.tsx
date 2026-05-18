import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/")
    }, 800)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/")
    }, 800)
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">DEMS</h1>
          <p className="mt-2 text-lg font-medium opacity-90">Document & Evidence Management System</p>
          <p className="mt-6 text-sm leading-relaxed opacity-75">
            Secure document management with blockchain-powered evidence anchoring.
            Military-grade AES-256 encryption ensures your data remains tamper-proof
            and forensically valid.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">AES-256</p>
              <p className="mt-1 text-xs opacity-75">Encryption</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">Base</p>
              <p className="mt-1 text-xs opacity-75">Blockchain</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold">SHA-256</p>
              <p className="mt-1 text-xs opacity-75">Hashing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold">DEMS</h1>
            <p className="text-sm text-muted-foreground">Document & Evidence Management System</p>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Sign in to access the compliance management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="admin@company.com" className="pl-9" defaultValue="admin@company.com" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-9 pr-9"
                          defaultValue="password123"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="mt-2 gap-2" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                      {!isLoading && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Register to join the compliance management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="reg-name">Full Name</Label>
                      <Input id="reg-name" placeholder="Ahmad Suryadi" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="reg-email" type="email" placeholder="your@email.com" className="pl-9" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="reg-password" type="password" className="pl-9" placeholder="Min 8 characters" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-role">Role</Label>
                      <select id="reg-role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="viewer">Viewer</option>
                        <option value="officer">Compliance Officer</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    <Button type="submit" className="mt-2 gap-2" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                      {!isLoading && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Protected by AES-256 encryption &middot; Base blockchain verified
          </p>
        </div>
      </div>
    </div>
  )
}
