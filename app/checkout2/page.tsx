"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Package,
  MapPin,
  Banknote,
  Clock,
} from "lucide-react"

// Adicionar importações para o Dialog no topo do arquivo
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from "lucide-react"
import { Users } from "lucide-react"

// Modificar a função de componente para adicionar o estado do modal e ref
export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState("envio")
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const deliverySectionRef = useRef<HTMLDivElement>(null)
  const customerDataSectionRef = useRef<HTMLDivElement>(null)

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    email: "",
    address: "",
    cep: "",
    reference: "",
  })

  const openWhatsApp = () => {
    // Verificar se os dados obrigatórios foram preenchidos
    if (
      !customerData.firstName ||
      !customerData.lastName ||
      !customerData.whatsapp ||
      !customerData.email ||
      !customerData.address ||
      !customerData.cep
    ) {
      setErrorMessage(
        "Por favor, preencha todos os campos obrigatórios (Nome, Sobrenome, WhatsApp, E-mail, Endereço e CEP).",
      )
      setShowErrorDialog(true)
      return
    }

    // Verificar se o método de envio foi selecionado
    if (!deliveryMethod) {
      setErrorMessage("Por favor, selecione uma modalidade de entrega antes de prosseguir.")
      setShowErrorDialog(true)
      return
    }

    // Mapear os métodos de entrega para nomes mais legíveis
    const deliveryNames = {
      ilha: "Entrega na Ilha do Governador",
      sedex: "Entrega via Sedex",
    }

    // Mapear os métodos de pagamento para nomes mais legíveis
    const paymentNames = {
      pix: "PIX (5% de desconto)",
      card: "Cartão de Crédito/Débito",
      money: "Dinheiro (na entrega)",
    }

    // Calcular o valor total baseado no método de pagamento
    const basePrice = 250.0
    const finalPrice = paymentMethod === "pix" ? basePrice * 0.95 : basePrice

    const message = `*GAME STICK PRO 4K - PEDIDO*

Olá! Gostaria de finalizar minha compra do Game Stick Pro 4K!

*👤 DADOS DO CLIENTE:*
Nome: ${customerData.firstName} ${customerData.lastName}
WhatsApp: ${customerData.whatsapp}
E-mail: ${customerData.email}
Endereço: ${customerData.address}
CEP: ${customerData.cep}
${customerData.reference ? `Referência: ${customerData.reference}` : ""}

*📦 PRODUTO:*
• Game Stick Pro 4K
• +20.000 jogos clássicos inclusos
• 2 controles sem fio
• Resolução 4K/1080P
• +20 plataformas (Nintendo, PlayStation, Atari, etc.)
• Plug & Play - só conectar na TV

*🚚 MODALIDADE DE ENTREGA ESCOLHIDA:*
${deliveryNames[deliveryMethod]}

*💳 FORMA DE PAGAMENTO ESCOLHIDA:*
${paymentNames[paymentMethod]}

*💰 VALOR TOTAL:*
R$ ${finalPrice.toFixed(2).replace(".", ",")}

*📋 PRÓXIMOS PASSOS:*
• Confirmar dados de entrega
• Finalizar forma de pagamento
• Receber informações de rastreamento

Aguardo retorno para finalizar minha compra!

Obrigado! 🎮`

    const whatsappUrl = `https://wa.me/5521980202797?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Função para fechar o popup e navegar para a seção de entrega
  const handleCloseDialog = () => {
    setShowErrorDialog(false)

    // Verificar qual seção precisa ser mostrada
    const needsCustomerData =
      !customerData.firstName ||
      !customerData.lastName ||
      !customerData.whatsapp ||
      !customerData.email ||
      !customerData.address ||
      !customerData.cep

    // Aguardar um pouco para o dialog fechar completamente, então fazer scroll
    setTimeout(() => {
      if (needsCustomerData && customerDataSectionRef.current) {
        customerDataSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      } else if (!deliveryMethod && deliverySectionRef.current) {
        deliverySectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 100)
  }

  // Adicionar o componente Dialog antes do return final
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Dialog de erro */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-orange-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              Atenção
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-300">{errorMessage}</DialogDescription>
          <DialogFooter>
            <Button onClick={handleCloseDialog} className="bg-orange-500 hover:bg-orange-600">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resto do código permanece igual */}
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Logo - Desktop only */}
      <div className="hidden md:block fixed top-6 left-6 z-50 animate-float">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smart-ilha-logo-V1X1IrJlqxNGio6WJi9E7usUYTOpP4.png"
            alt="Smart Ilha Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Logo */}
        <div className="md:hidden mb-8 flex justify-center">
          <div className="w-full max-w-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smart-ilha-logo-V1X1IrJlqxNGio6WJi9E7usUYTOpP4.png"
              alt="Smart Ilha Logo"
              width={800}
              height={300}
              className="w-full h-auto max-h-24 object-contain"
              priority
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Game Stick{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Pro 4K
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Complete sua compra e reviva a nostalgia dos jogos clássicos com o console mais completo do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl sticky top-6 rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Image */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gamestick-product-1-JGEMlfVSHRP2Zah7w4hrZ630YtVD8l.jpeg"
                    alt="Game Stick Pro 4K"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-white font-bold text-lg">Game Stick Pro 4K</h3>
                  <p className="text-gray-300 text-sm">Console Retro com +20.000 Jogos</p>
                </div>

                {/* Included Items Summary */}
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-medium mb-2">Itens inclusos:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                      <span>Console Game Stick Pro 4K</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                      <span>2 Controles sem fio</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                      <span>Cartão SD 64GB com jogos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />
                      <span>Cabos e acessórios</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Tabs */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl rounded-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="envio" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="hidden">
                    <TabsTrigger
                      value="envio"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
                    >
                      Envio
                    </TabsTrigger>
                  </TabsList>

                  {/* Seção de Dados do Cliente */}
                  <div
                    ref={customerDataSectionRef}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6"
                  >
                    <h3 className="text-xl text-white font-bold mb-6 flex items-center">
                      <Users className="w-5 h-5 text-orange-400 mr-2" />
                      Dados para Entrega
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white mb-2 block">
                          Nome *
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Seu nome"
                          value={customerData.firstName}
                          onChange={(e) => setCustomerData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white mb-2 block">
                          Sobrenome *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Seu sobrenome"
                          value={customerData.lastName}
                          onChange={(e) => setCustomerData((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="whatsapp" className="text-white mb-2 block">
                          WhatsApp *
                        </Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          placeholder="(21) 99999-9999"
                          value={customerData.whatsapp}
                          onChange={(e) => setCustomerData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={customerData.email}
                          onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="address" className="text-white mb-2 block">
                        Endereço Completo *
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Rua, número, bairro, cidade, estado"
                        value={customerData.address}
                        onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="cep" className="text-white mb-2 block">
                        CEP *
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="cep"
                          type="text"
                          placeholder="00000-000"
                          value={customerData.cep}
                          onChange={(e) => setCustomerData((prev) => ({ ...prev, cep: e.target.value }))}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 flex-1"
                          maxLength={9}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", "_blank")
                          }
                          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Buscar CEP
                        </Button>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        Não sabe seu CEP? Clique no botão ao lado para consultar no site dos Correios
                      </p>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="reference" className="text-white mb-2 block">
                        Ponto de Referência (opcional)
                      </Label>
                      <Textarea
                        id="reference"
                        placeholder="Ex: Próximo ao supermercado, em frente à farmácia, etc."
                        value={customerData.reference}
                        onChange={(e) => setCustomerData((prev) => ({ ...prev, reference: e.target.value }))}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
                        rows={3}
                      />
                    </div>

                    <div className="bg-gray-700/50 p-4 rounded-lg border border-orange-500/30">
                      <p className="text-orange-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <strong>Importante:</strong>
                      </p>
                      <p className="text-gray-300 text-sm mt-1">
                        Preencha todos os dados corretamente para garantir que seu pedido seja entregue no endereço
                        certo.
                      </p>
                    </div>
                  </div>

                  <TabsContent value="envio" className="space-y-6">
                    <div ref={deliverySectionRef} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl text-white font-bold mb-6 flex items-center">
                        <Truck className="w-5 h-5 text-orange-400 mr-2" />
                        Modalidades de Entrega Smart Ilha
                      </h3>

                      <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-4">
                        {/* Opção 1 - Ilha do Governador */}
                        <RadioGroupItem value="ilha" id="delivery-ilha" className="sr-only" />
                        <div
                          className={`border ${deliveryMethod !== "ilha" ? "border-gray-600 hover:border-gray-500" : "border-orange-500 ring-2 ring-orange-500/70"} rounded-lg p-4 transition-all cursor-pointer w-full`}
                        >
                          <label htmlFor="delivery-ilha" className="flex items-start cursor-pointer w-full">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <div className="bg-orange-400/20 p-2 rounded-full mr-3">
                                  <MapPin className="w-5 h-5 text-orange-400" />
                                </div>
                                <h4 className="text-white font-medium text-lg">Entrega na Ilha do Governador</h4>
                              </div>
                              <p className="text-gray-300 text-sm mb-4">
                                Para clientes que residem na região da Ilha do Governador
                              </p>
                              <div className="bg-gray-800/70 p-4 rounded-lg space-y-3">
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Entrega rápida via motoboy</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Pagamento no ato da entrega disponível</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Frete totalmente grátis</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Entregas no mesmo dia</span>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>

                        {/* Opção 3 - Todo Brasil */}
                        <RadioGroupItem value="sedex" id="delivery-sedex" className="sr-only" />
                        <div
                          className={`border ${deliveryMethod !== "sedex" ? "border-gray-600 hover:border-gray-500" : "border-orange-500 ring-2 ring-orange-500/70"} rounded-lg p-4 transition-all cursor-pointer w-full`}
                        >
                          <label htmlFor="delivery-sedex" className="flex items-start cursor-pointer w-full">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <div className="bg-orange-400/20 p-2 rounded-full mr-3">
                                  <Package className="w-5 h-5 text-orange-400" />
                                </div>
                                <h4 className="text-white font-medium text-lg">Entrega via Sedex</h4>
                              </div>
                              <p className="text-gray-300 text-sm mb-4">Para qualquer região do Brasil</p>
                              <div className="bg-gray-800/70 p-4 rounded-lg space-y-3">
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Entrega via Correios (Sedex)</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Frete totalmente grátis</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Rio de Janeiro: até 24 horas</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Demais regiões: 1 a 5 dias úteis</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">Código de rastreamento incluído</span>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>

                      <div className="mt-6 p-4 bg-gray-800/70 rounded-lg border border-orange-500/30">
                        <h4 className="text-orange-400 font-medium mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Informações importantes sobre entrega:
                        </h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          <li className="flex items-start">
                            <span className="text-orange-400 mr-2">•</span>
                            <span>Selecione a modalidade de entrega que melhor se adequa à sua localização</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-400 mr-2">•</span>
                            <span>Para entrega na Ilha do Governador, você pode pagar na entrega</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-400 mr-2">•</span>
                            <span>Entregas via Sedex requerem pagamento antecipado</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-400 mr-2">•</span>
                            <span>Em caso de dúvidas sobre sua região, entre em contato conosco</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Pagamento e Compra - Rodapé */}
        <div className="mt-16">
          <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl rounded-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Finalize sua{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Compra
                  </span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Escolha sua forma de pagamento e garante já o seu Game Stick Pro 4K!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Formas de Pagamento */}
                <div className="space-y-6">
                  <h3 className="text-xl text-white font-bold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 text-orange-400 mr-2" />
                    Formas de Pagamento
                  </h3>

                  {/* Seleção de Método de Pagamento */}
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm mb-4">Escolha a forma de pagamento:</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* PIX */}
                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-2 h-full ${
                          paymentMethod === "pix"
                            ? "border-green-500 bg-green-500/20 ring-2 ring-green-500/70"
                            : "border-gray-600 bg-gray-700/40 hover:border-green-400 hover:bg-green-500/10"
                        }`}
                      >
                        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PIX</span>
                        </div>
                        <span className="text-white font-medium">PIX</span>
                      </button>

                      {/* Cartão */}
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-2 h-full ${
                          paymentMethod === "card"
                            ? "border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/70"
                            : "border-gray-600 bg-gray-700/40 hover:border-blue-400 hover:bg-blue-500/10"
                        }`}
                      >
                        <CreditCard className="w-6 h-6 text-blue-400" />
                        <span className="text-white font-medium">Cartão</span>
                      </button>

                      {/* Dinheiro */}
                      <button
                        onClick={() => setPaymentMethod("money")}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-2 h-full ${
                          paymentMethod === "money"
                            ? "border-yellow-500 bg-yellow-500/20 ring-2 ring-yellow-500/70"
                            : "border-gray-600 bg-gray-700/40 hover:border-yellow-400 hover:bg-yellow-500/10"
                        }`}
                      >
                        <Banknote className="w-6 h-6 text-yellow-400" />
                        <span className="text-white font-medium">Dinheiro</span>
                      </button>
                      {/* Note: Changed money icon color to yellow for consistency with border */}
                    </div>

                    {/* Informações sobre cada método */}
                    {paymentMethod === "pix" && (
                      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                        <p className="text-green-400 font-medium mb-1">PIX - 5% de desconto</p>
                        <p className="text-gray-300 text-sm">
                          Aprovação instantânea • Disponível para todas as modalidades de entrega
                        </p>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                        <p className="text-blue-400 font-medium mb-1">Cartão - Até 5x sem juros</p>
                        <p className="text-gray-300 text-sm">
                          Todas as bandeiras • Disponível para todas as modalidades de entrega
                        </p>
                      </div>
                    )}

                    {paymentMethod === "money" && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                        <p className="text-yellow-400 font-medium mb-1">Dinheiro - Pagamento na entrega</p>
                        <p className="text-gray-300 text-sm">Disponível apenas para entrega na Ilha do Governador</p>
                      </div>
                    )}
                  </div>

                  {/* Informações de pagamento na entrega */}
                  <div className="bg-gray-700/50 p-4 rounded-xl border border-orange-500/30 mt-6">
                    <h4 className="text-orange-400 font-medium mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Pagamento na Entrega
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Disponível apenas para a Ilha do Governador - Dinheiro, PIX ou Cartão no momento da entrega
                    </p>
                  </div>
                </div>

                {/* Resumo de Preços */}
                <div className="space-y-6">
                  <h3 className="text-xl text-white font-bold mb-4 flex items-center">
                    <Package className="w-5 h-5 text-orange-400 mr-2" />
                    Resumo do Pedido
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-700/40 rounded-lg border border-gray-600">
                      <span className="text-gray-300">Game Stick Pro 4K</span>
                      <span className="text-white font-bold text-lg">R$ 250,00</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-700/40 rounded-lg border border-gray-600">
                      <span className="text-gray-300">Frete</span>
                      <span className="text-green-400 font-bold">Grátis</span>
                    </div>

                    {/* Desconto PIX */}
                    {paymentMethod === "pix" && (
                      <div className="flex justify-between items-center p-4 bg-gray-700/40 rounded-lg border border-gray-600">
                        <span className="text-green-400">Desconto PIX (5%)</span>
                        <span className="text-green-400 font-bold">- R$ 12,50</span>
                      </div>
                    )}

                    {/* Total baseado no método de pagamento */}
                    {paymentMethod === "pix" && (
                      <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg border-2 border-green-500/50">
                        <span className="text-white font-bold text-xl">Total no PIX</span>
                        <span className="text-green-400 font-bold text-2xl">R$ 237,50</span>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg border-2 border-blue-500/50">
                        <span className="text-white font-bold text-xl">Total no Cartão</span>
                        <span className="text-blue-400 font-bold text-2xl">R$ 250,00</span>
                      </div>
                    )}

                    {paymentMethod === "money" && (
                      <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg border-2 border-green-500/50">
                        <span className="text-white font-bold text-xl">Total em Dinheiro</span>
                        <span className="text-green-400 font-bold text-2xl">R$ 250,00</span>
                      </div>
                    )}

                    {/* Opções de parcelamento para cartão */}
                    {paymentMethod === "card" && (
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Opções de Parcelamento:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-green-400 font-medium mb-2">Sem Juros:</p>
                            <div className="space-y-1 text-gray-300">
                              <p>1x de R$ 250,00</p>
                              <p>2x de R$ 125,00</p>
                              <p>3x de R$ 83,33</p>
                              <p>4x de R$ 62,50</p>
                              <p>5x de R$ 50,00</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-medium mb-2">Com Juros:</p>
                            <div className="space-y-1 text-gray-300">
                              <p>6x de R$ 45,67</p>
                              <p>8x de R$ 35,38</p>
                              <p>10x de R$ 28,77</p>
                              <p>12x de R$ 24,31</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão de Compra Final */}
              <div className="text-center">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-10 py-6 rounded-xl text-lg md:text-xl shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 w-full sm:w-auto"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Comprar via WhatsApp
                </Button>
                <p className="text-gray-400 mt-4 text-sm">Atendimento de segunda a sábado, das 8h às 20h</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-600/50 shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smart-ilha-logo-V1X1IrJlqxNGio6WJi9E7usUYTOpP4.png"
                alt="Smart Ilha Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Ilha - Todos os direitos reservados
          </p>
        </footer>
      </main>
    </div>
  )
}
