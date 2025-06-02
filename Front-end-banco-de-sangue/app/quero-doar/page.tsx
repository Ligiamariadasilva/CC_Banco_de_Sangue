import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function QueroDoarPage() {
  const canDonate = [
    "Ter entre 16 e 69 anos (menores de 18 precisam de autorização)",
    "Pesar no mínimo 50kg",
    "Estar bem de saúde",
    "Ter dormido pelo menos 6 horas na noite anterior",
    "Estar alimentado (evitar alimentos gordurosos 4h antes)",
    "Apresentar documento oficial com foto",
    "Não ter feito tatuagem ou piercing nos últimos 12 meses",
    "Não ter tido hepatite após os 11 anos de idade",
  ]

  const cannotDonate = [
    "Estar gripado, resfriado ou com febre",
    "Estar grávida ou amamentando",
    "Ter usado drogas ilícitas injetáveis",
    "Ter tido malária",
    "Ter doença de Chagas",
    "Ter HIV/AIDS ou hepatite B ou C",
    "Ter comportamento de risco para DSTs",
    "Ter doado sangue há menos de 60 dias (homens) ou 90 dias (mulheres)",
  ]

  const temporaryRestrictions = [
    { condition: "Vacina da gripe", time: "48 horas" },
    { condition: "Vacina COVID-19", time: "7 dias" },
    { condition: "Tratamento dentário simples", time: "72 horas" },
    { condition: "Extração dentária", time: "7 dias" },
    { condition: "Cirurgia de pequeno porte", time: "3 meses" },
    { condition: "Cirurgia de grande porte", time: "6 meses" },
    { condition: "Endoscopia/Colonoscopia", time: "6 meses" },
    { condition: "Acupuntura", time: "12 meses" },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-800 mb-4">Posso Doar Sangue?</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Verifique se você atende aos critérios para doação de sangue. É importante seguir todas as orientações para
            garantir a segurança do doador e do receptor.
          </p>
        </div>

        {/* Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>Importante:</strong> Esta é apenas uma orientação inicial. A avaliação final será feita por um
            profissional de saúde no local da doação.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Can Donate */}
          <Card className="blood-card">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle className="h-6 w-6 mr-2" />
                Você PODE doar se:
              </CardTitle>
              <CardDescription>Critérios que permitem a doação de sangue</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {canDonate.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cannot Donate */}
          <Card className="blood-card">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <XCircle className="h-6 w-6 mr-2" />
                Você NÃO pode doar se:
              </CardTitle>
              <CardDescription>Critérios que impedem a doação de sangue</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cannotDonate.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Temporary Restrictions */}
        <Card className="blood-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <AlertCircle className="h-6 w-6 mr-2" />
              Restrições Temporárias
            </CardTitle>
            <CardDescription>Situações que exigem um período de espera antes da doação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {temporaryRestrictions.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">{item.condition}</span>
                  <span className="text-orange-600 font-semibold">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <Card className="blood-card">
          <CardHeader>
            <CardTitle className="text-red-700">Processo de Doação</CardTitle>
            <CardDescription>Etapas do processo de doação de sangue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Cadastro", desc: "Apresentação de documento e preenchimento de formulário" },
                { step: "2", title: "Triagem", desc: "Verificação de sinais vitais e teste de anemia" },
                { step: "3", title: "Entrevista", desc: "Conversa com profissional de saúde sobre seu histórico" },
                { step: "4", title: "Doação", desc: "Coleta do sangue (aproximadamente 10-15 minutos)" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-red-700 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
