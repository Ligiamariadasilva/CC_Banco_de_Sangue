"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogOut, Plus, Edit, Trash2, Users, Droplets } from "lucide-react"

interface Donor {
  id: number
  nome: string
  email: string
  telefone: string
  tipoSanguineo: string
  idade: number
  peso: number
  ultimaDoacao: string
}

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [donors, setDonors] = useState<Donor[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoSanguineo: "",
    idade: "",
    peso: "",
    ultimaDoacao: "",
  })
  const [message, setMessage] = useState("")

  // Simulated data - In real app, this would come from your C# API
  useEffect(() => {
    const mockDonors: Donor[] = [
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "(11) 99999-9999",
        tipoSanguineo: "O+",
        idade: 35,
        peso: 75,
        ultimaDoacao: "2024-01-15",
      },
      {
        id: 2,
        nome: "Maria Santos",
        email: "maria@email.com",
        telefone: "(11) 88888-8888",
        tipoSanguineo: "A+",
        idade: 28,
        peso: 60,
        ultimaDoacao: "2024-02-10",
      },
      {
        id: 3,
        nome: "Pedro Costa",
        email: "pedro@email.com",
        telefone: "(11) 77777-7777",
        tipoSanguineo: "B-",
        idade: 42,
        peso: 80,
        ultimaDoacao: "2024-01-28",
      },
    ]
    setDonors(mockDonors)
  }, [])

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      tipoSanguineo: "",
      idade: "",
      peso: "",
      ultimaDoacao: "",
    })
    setEditingDonor(null)
  }

  const handleCreate = () => {
    setIsDialogOpen(true)
    resetForm()
  }

  const handleEdit = (donor: Donor) => {
    setEditingDonor(donor)
    setFormData({
      nome: donor.nome,
      email: donor.email,
      telefone: donor.telefone,
      tipoSanguineo: donor.tipoSanguineo,
      idade: donor.idade.toString(),
      peso: donor.peso.toString(),
      ultimaDoacao: donor.ultimaDoacao,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este doador?")) {
      // Simulate API call
      setDonors(donors.filter((donor) => donor.id !== id))
      setMessage("Doador excluído com sucesso!")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const donorData = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      tipoSanguineo: formData.tipoSanguineo,
      idade: Number.parseInt(formData.idade),
      peso: Number.parseFloat(formData.peso),
      ultimaDoacao: formData.ultimaDoacao,
    }

    if (editingDonor) {
      // Update (PUT)
      const updatedDonor = { ...donorData, id: editingDonor.id }
      setDonors(donors.map((donor) => (donor.id === editingDonor.id ? updatedDonor : donor)))
      setMessage("Doador atualizado com sucesso!")
    } else {
      // Create (POST)
      const newDonor = { ...donorData, id: Date.now() }
      setDonors([...donors, newDonor])
      setMessage("Doador cadastrado com sucesso!")
    }

    setIsDialogOpen(false)
    resetForm()
    setTimeout(() => setMessage(""), 3000)
  }

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-red-800">Painel Administrativo</h1>
          <p className="text-gray-600">Gerenciamento de doadores de sangue</p>
        </div>
        <Button onClick={onLogout} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="blood-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Total de Doadores</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">{donors.length}</div>
          </CardContent>
        </Card>

        <Card className="blood-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Doações Este Mês</CardTitle>
            <Droplets className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">12</div>
          </CardContent>
        </Card>

        <Card className="blood-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Tipo Mais Comum</CardTitle>
            <Droplets className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">O+</div>
          </CardContent>
        </Card>
      </div>

      {/* Message */}
      {message && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-700">{message}</AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-red-700">Lista de Doadores</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Doador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-700">{editingDonor ? "Editar Doador" : "Novo Doador"}</DialogTitle>
              <DialogDescription>
                {editingDonor ? "Atualize as informações do doador" : "Cadastre um novo doador no sistema"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoSanguineo">Tipo Sanguíneo</Label>
                <Select
                  value={formData.tipoSanguineo}
                  onValueChange={(value) => setFormData({ ...formData, tipoSanguineo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo sanguíneo" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    step="0.1"
                    value={formData.peso}
                    onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ultimaDoacao">Última Doação</Label>
                <Input
                  id="ultimaDoacao"
                  type="date"
                  value={formData.ultimaDoacao}
                  onChange={(e) => setFormData({ ...formData, ultimaDoacao: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                  {editingDonor ? "Atualizar" : "Cadastrar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Donors Table */}
      <Card className="blood-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Peso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Última Doação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-red-100">
                {donors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-red-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {donor.tipoSanguineo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.idade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.peso}kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(donor.ultimaDoacao).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(donor)}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(donor.id)}
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
