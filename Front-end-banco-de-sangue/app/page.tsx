import { Heart, Users, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const benefits = [
    {
      icon: Heart,
      title: "Salve Vidas",
      description: "Uma única doação pode salvar até 4 vidas diferentes",
    },
    {
      icon: Users,
      title: "Ajude a Comunidade",
      description: "Contribua para o bem-estar da sua comunidade local",
    },
    {
      icon: Clock,
      title: "Processo Rápido",
      description: "Todo o processo leva apenas 30-45 minutos",
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Procedimento 100% seguro com materiais descartáveis",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="blood-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">Doe Sangue, Doe Vida</h1>
            <p className="text-xl text-red-700 mb-8 leading-relaxed">
              Sua doação pode ser a diferença entre a vida e a morte para alguém. Junte-se a nós nessa missão de salvar
              vidas através da doação de sangue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quero-doar">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                  Quero Doar Sangue
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-800 mb-4">Por que Doar Sangue?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A doação de sangue é um ato de solidariedade que traz benefícios tanto para quem recebe quanto para quem
              doa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="blood-card hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <CardTitle className="text-red-700">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-800 mb-6">Informações Importantes</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>O sangue doado é testado e separado em componentes para atender diferentes necessidades médicas</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Homens podem doar a cada 60 dias e mulheres a cada 90 dias</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>É necessário ter entre 16 e 69 anos e pesar no mínimo 50kg</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Traga um documento oficial com foto no dia da doação</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg blood-card">
              <h3 className="text-2xl font-bold text-red-700 mb-4">Tipos Sanguíneos</h3>
              <div className="grid grid-cols-2 gap-4">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <div key={type} className="bg-red-100 p-3 rounded-lg text-center">
                    <span className="font-bold text-red-700">{type}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">Todos os tipos sanguíneos são importantes e necessários!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
