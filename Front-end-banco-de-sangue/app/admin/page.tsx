"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username: string, password: string) => {
    if (username === "master" && password === "1234") {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen py-12">
      {!isAuthenticated ? <LoginForm onLogin={handleLogin} /> : <AdminDashboard onLogout={handleLogout} />}
    </div>
  )
}
