"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Gamepad2, Star, Users, CheckCircle, Instagram } from "lucide-react"

export default function GameStickPage() {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gamesSliderRef = useRef<HTMLDivElement>(null)
  const testimonialsSliderRef = useRef<HTMLDivElement>(null)

  const testimonialsRef = useRef<HTMLElement>(null)

  // Função para calcular visitas baseado no horário
  const getVisitCount = () => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()

    // Calcular progresso do dia (0 a 1)
    const dayProgress = (hour * 60 + minute) / (24 * 60)

    // Interpolar entre 145 e 987
    const minVisits = 145
    const maxVisits = 987
    const visits = Math.floor(minVisits + (maxVisits - minVisits) * dayProgress)

    return visits
  }

  // Função para formatar data em português
  const formatDate = () => {
    const now = new Date()
    return now.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const [visitCount, setVisitCount] = useState(getVisitCount())
  const [currentDate, setCurrentDate] = useState(formatDate())

  // Atualizar contador de visitas a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitCount(getVisitCount())
      setCurrentDate(formatDate())
    }, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  // Meta Pixel initialization
  useEffect(() => {
    // Meta Pixel Code
    const script = document.createElement("script")
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '3311118289180276');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)

    // Noscript fallback
    const noscript = document.createElement("noscript")
    const img = document.createElement("img")
    img.height = 1
    img.width = 1
    img.style.display = "none"
    img.src = "https://www.facebook.com/tr?id=3311118289180276&ev=PageView&noscript=1"
    noscript.appendChild(img)
    document.head.appendChild(noscript)

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (noscript.parentNode) {
        noscript.parentNode.removeChild(noscript)
      }
    }
  }, [])

  // Professional particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 122, 0, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const retroGames = [
    {
      name: "Super Mario Bros.",
      platform: "Nintendo NES",
      year: 1985,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/super-mario-bros-Fvli5tSDSGU5XXewYABmgMJbVTaNC2.png",
      description: "O clássico jogo de plataforma que definiu uma geração",
    },
    {
      name: "Mortal Kombat",
      platform: "Arcade",
      year: 1992,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2015-06-29-mortalkombat-1992-OVQqREvC6PBHxssKXrFnrpFH55R80I.webp",
      description: "O violento jogo de luta que causou polêmica mundial",
    },
    {
      name: "Sonic the Hedgehog",
      platform: "Sega Genesis",
      year: 1991,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxresdefault.jpg-2Wzc3a40KUx9QQVQBDwQ5MLeLLrJTT.jpeg",
      description: "O ouriço azul mais rápido dos videogames",
    },
    {
      name: "Street Fighter II",
      platform: "Arcade/SNES",
      year: 1991,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ryu-e-ken-em-street-fighter-ii-1060x707.jpg-KrFJXGp41rCTNhhmr9N1qFg6RHrf9I.jpeg",
      description: "O jogo de luta que revolucionou os arcades",
    },
    {
      name: "Mega Man X",
      platform: "Super Nintendo",
      year: 1993,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/megamanx02.jpg-d4rRJBQED0SrKHBlNeW9Sv2jMIsuAh.jpeg",
      description: "A evolução futurística do Blue Bomber",
    },
    {
      name: "Metal Slug",
      platform: "Neo Geo",
      year: 1996,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/metal-slug-4-melhores-jogos-franquia-snk-FLBga5BFZFqycDkwxjwXMHClzNZfey.webp",
      description: "O clássico jogo de tiro run-and-gun",
    },
    {
      name: "Donkey Kong Country",
      platform: "Super Nintendo",
      year: 1994,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/51F8Gh9xFhL._AC_.jpg-nQlSZNl9ALfOFF8CwcGwFYVkgkMSM3.jpeg",
      description: "A aventura do gorila mais famoso dos videogames",
    },
    {
      name: "Tetris",
      platform: "Game Boy",
      year: 1989,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hq720.jpg-cvSe7BNKHRGFALh3Yb7fSzrqzA9dyc.jpeg",
      description: "O puzzle game mais viciante de todos os tempos",
    },
    {
      name: "Resident Evil",
      platform: "PlayStation",
      year: 1996,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MV5BMGQwNGI1ZjAtNGVmZi00OGRkLWE4MWEtM2JmNGRiMjA1Zjc4XkEyXkFqcGc%40._V1_.jpg-dXAh08fliHpimAkKSzDkSsZWPs2FKv.jpeg",
      description: "O survival horror que aterrorizou uma geração",
    },
    {
      name: "The King of Fighters 2002",
      platform: "Neo Geo",
      year: 2002,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kof2k2.jpg-voNSWKSXCWgGKbmU4D8BsICeuzOhZd.jpeg",
      description: "Um dos jogos de luta mais populares da série KOF",
    },
    {
      name: "Super Bomberman 2",
      platform: "Super Nintendo",
      year: 1994,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/super-bomberman-2-snes-wide-1-2iB63PLS4EPdt9gIvkaQaYaYcdE6sh.webp",
      description: "O clássico jogo de estratégia e explosões",
    },
  ]

  // Função para navegar pelo slider de jogos
  const scrollGamesSlider = (direction: "left" | "right") => {
    if (!gamesSliderRef.current) return

    const scrollAmount = 300
    const currentScroll = gamesSliderRef.current.scrollLeft

    if (direction === "left") {
      gamesSliderRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      gamesSliderRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Função para navegar pelo slider de depoimentos
  const scrollTestimonialsSlider = (direction: "left" | "right") => {
    if (!testimonialsSliderRef.current) return

    const scrollAmount = 350
    const currentScroll = testimonialsSliderRef.current.scrollLeft

    if (direction === "left") {
      testimonialsSliderRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      testimonialsSliderRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const customerTestimonials = [
    {
      id: 1,
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110103-6kfkr-m87t41nperjl36.16000051743864898-CmCKwtEYSzgrIk4VonYdeTFXrSpQnP.mp4",
      customerName: "Victoria Silva",
      location: "São Paulo, SP",
      rating: 5,
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barbara%20Silva.jpg-R1Cv43QC0rTQaw3g188rUmSHJHUmcP.jpeg",
    },
    {
      id: 2,
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110103-6kfkr-m9ivdzbet4aq7a.16000051746713846-b0iRqQzyCOa09hsHEMnQUN6Sjz9lRg.mp4",
      customerName: "Maria Santos",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maria%20Santos.jpg-r0u8LKh7Z16JSgtqYjExUrk5G7nrSN.jpeg",
    },
    {
      id: 3,
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110103-6kfkp-m7i63rzb358s79.16000051742312852-5wqIMfJWsrK2N2clP8WiAb9cvrcB0d.mp4",
      customerName: "João Oliveira",
      location: "Belo Horizonte, MG",
      rating: 5,
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jo%C3%A3o%20Alberto.jpg-TWJ4GSupB4LpIDUXl8M5lw2VDjtUhx.jpeg",
    },
    {
      id: 4,
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110103-6kfko-m8jlg0eqgg6pc2.16000051744578419-kFVFJt3qdYTpNPpsoPxTqzGGd1g0yf.mp4",
      customerName: "Ana Costa",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carla%20Grandizoli.jpg-l4hfhgLxrUy57aALzh3zaTsRyfiuBQ.jpeg",
    },
    {
      id: 5,
      videoSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110103-6kfko-m8df1gs6e58148.16000051744204446-pO4BtCmjoQegOGYZvRS8cNW3IIVEqg.mp4",
      customerName: "Pedro Lima",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      photo:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pedro%20Lima.jpg-APAVhzyAynz0JSegY7XBpgmvB3E1mA.jpeg",
    },
  ]

  // Modificar a função openWhatsApp para redirecionar para a página checkout2
  const openWhatsApp = () => {
    // Track button click event with Meta Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", "InitiateCheckout")
    }

    // Redirecionar para a página de checkout2 em vez de checkout
    window.location.href = "/checkout2"
  }

  const features = [
    {
      title: "2 Controles Inclusos",
      description: "Jogue com amigos e familiares",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joystick_10763481-u2Er61FQZaK1GKwzn3nNyO3nRkF56S.png",
    },
    {
      title: "20.000+ Jogos",
      description: "Diversão garantida por horas",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arcade-machine_18448449-zLfHjSwuQBsBHUnVzQp4OcktokS1yX.png",
    },
    {
      title: "Resolução 4K",
      description: "Gráficos incríveis na sua TV",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video_11641640-uolle7qF3gIMW1FMn8V5xv6EfqqZ2V.png",
    },
    {
      title: "Fácil de Usar",
      description: "Plug and play, sem complicações",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-S1UCCWBu9Va2hGZ0MU7aWOmBmV878r.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Professional Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Logo - Desktop only */}
      <div className="hidden md:block fixed top-6 left-6 z-50 animate-float">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SMART%20ILHA-TNkbpZeRtuxJryZ3PloGlGSz23FRXm.png"
            alt="Smart Ilha Logo"
            width={120}
            height={120}
            className="h-12 w-auto"
          />
        </div>
      </div>

      {/* Header - Desktop only */}
      <header className="hidden md:block relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-3 border border-gray-600/50 shadow-lg">
            <h1 className="text-white font-bold text-xl">Game Stick Pro 4K</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Hero Section */}
          <div className="text-center pt-8 md:pt-12 mb-16 md:mb-24">
            {/* Mobile Logo - Extra Large and prominent */}
            <div className="md:hidden mb-8 flex justify-center px-4">
              <div className="w-full max-w-lg flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SMART%20ILHA-TNkbpZeRtuxJryZ3PloGlGSz23FRXm.png"
                  alt="Smart Ilha Logo"
                  width={800}
                  height={800}
                  className="w-auto h-32 object-contain"
                  priority
                />
              </div>
            </div>

            <Badge
              variant="secondary"
              className="mb-6 bg-orange-600/30 text-orange-300 border-orange-500/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-md"
            >
              🎮 Console Retro Gaming
            </Badge>

            {/* Title - Different sizes for mobile and desktop */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {/* Mobile version - shorter */}
              <span className="block md:hidden">
                Game Stick{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Pro 4K
                </span>
              </span>
              {/* Desktop version - full */}
              <span className="hidden md:block">
                Game Stick{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Pro 4K
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
              Mais de 20.000 jogos clássicos em um só dispositivo. Reviva a nostalgia dos games que marcaram época!
            </p>

            {/* Container do Vídeo */}
            <div className="mb-12 md:mb-16">
              <div className="relative max-w-md mx-auto shadow-2xl rounded-2xl overflow-hidden border-2 border-orange-500/30">
                <script src="https://fast.wistia.com/player.js" async></script>
                <script src="https://fast.wistia.com/embed/1w6xpk5yc5.js" async type="module"></script>
                <style jsx>{`
                  wistia-player[media-id='1w6xpk5yc5']:not(:defined) { 
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/1w6xpk5yc5/swatch'); 
                    display: block; 
                    filter: blur(5px); 
                    padding-top: 177.78%; 
                  }
                `}</style>
                <wistia-player media-id="1w6xpk5yc5" aspect="0.5625" className="w-full h-auto"></wistia-player>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-300"></span>
                  <span className="ml-2 px-2 py-1 bg-orange-500/80 text-white text-xs rounded-full font-medium"></span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-orange-500/20 transform hover:-translate-y-1 shadow-xl rounded-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-orange-500/10 rounded-full inline-block mb-4">
                      <Image
                        src={feature.icon || "/placeholder.svg"}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SEÇÃO: Jogos Retrô Populares com imagens reais */}
          <section className="py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Uma Galeria de{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Clássicos
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Explore alguns dos +20.000 jogos que esperam por você. A diversão é garantida!
              </p>
            </div>

            {/* Slider de jogos com controles */}
            <div className="relative">
              {/* Botão de navegação esquerda */}
              <button
                onClick={() => scrollGamesSlider("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 shadow-lg border border-gray-600/50 backdrop-blur-md hidden md:block"
                aria-label="Deslizar para a esquerda"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Container do slider */}
              <div
                ref={gamesSliderRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {retroGames.map((game, index) => (
                  <div key={index} className="min-w-[280px] md:min-w-[320px] snap-start">
                    <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl h-full rounded-xl overflow-hidden">
                      <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 280px, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <Badge variant="secondary" className="bg-orange-500/80 text-white border-none">
                            {game.platform}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-white font-bold text-lg mb-1">{game.name}</h3>
                        <p className="text-orange-300 text-xs mb-2">{game.year}</p>
                        <p className="text-gray-300 text-sm">{game.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Botão de navegação direita */}
              <button
                onClick={() => scrollGamesSlider("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 shadow-lg border border-gray-600/50 backdrop-blur-md hidden md:block"
                aria-label="Deslizar para a direita"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicador de deslize para mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <p className="text-gray-400 text-sm flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Deslize para ver mais jogos
                <ChevronRight className="w-4 h-4 ml-1" />
              </p>
            </div>
          </section>

          {/* Enhanced Platforms and Consoles Section */}
          <section className="py-12 md:py-20 bg-gray-900/50 rounded-3xl">
            <div className="text-center mb-8 md:mb-12 px-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">
                Plataformas e{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Consoles
                </span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
                Mais de 20 plataformas clássicas reunidas em um só dispositivo. Reviva a história dos videogames!
              </p>
            </div>

            {/* Consoles de Mesa Clássicos */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center justify-center mb-6 md:mb-10">
                <div className="relative bg-gradient-to-r from-orange-500/15 via-orange-600/20 to-orange-500/15 backdrop-blur-md rounded-xl px-6 py-3 md:px-12 md:py-6 border border-orange-500/40 shadow-xl max-w-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent rounded-xl"></div>
                  <h3 className="relative text-lg md:text-3xl lg:text-4xl font-bold text-white text-center flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-16 md:h-16 bg-orange-500/20 rounded-full mr-3 md:mr-4 border border-orange-500/30">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/controller_3262647-4MMrorKU3PuKFS8NsUjSxawYDMOnip.png"
                        alt="Arcade Controller"
                        width={32}
                        height={32}
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </span>
                    <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                      Consoles de Mesa Clássicos
                    </span>
                  </h3>
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    name: "Super Nintendo",
                    description: "Reviva a era dourada dos 16-bits com os clássicos mais amados da Nintendo!",
                    games: "1.200+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_b96727e6d973f1c2db64344e24b4ae31394bf239835afaa7cdfefe5237689a03_trimmed-atI8JZQDKp906X6Sb4YtnukPLXiyhD.png",
                  },
                  {
                    name: "Mega Drive",
                    description: "A velocidade do Sonic e a adrenalina dos games Sega te esperam!",
                    games: "800+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ccb8e8ecd67c56dd6a093433151ea7a03678dc993e031ccbd4d133c7165dcfcc_trimmed-qWN4VclazpbR1BKNIHJnWPltPXAnlg.png",
                  },
                  {
                    name: "ATARI",
                    description: "Onde tudo começou! Os primeiros heróis dos videogames estão aqui!",
                    games: "900+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_97c12feb684d01d868ed4c2a6739eed66e23b639a1291b27e93eed161f904ba4_trimmed-0IaZQ1GPUqMBlLhxh89q007J0nvb6g.png",
                  },
                  {
                    name: "PlayStation 1",
                    description: "A revolução 3D que mudou os games para sempre!",
                    games: "400+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_49014648090033f58c3b68433606e1dee393b34ce18449ef8ce4737fd630acfd_trimmed-mkSABYoMc8QHUICU645si5ln9bWijg.png",
                  },
                ].map((platform, index) => (
                  <Card
                    key={index}
                    className="group bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-500 hover:shadow-orange-500/20 transform hover:-translate-y-2 hover:scale-105 shadow-xl rounded-xl overflow-hidden relative"
                  >
                    <CardContent className="p-6 text-center relative">
                      {/* Animated Icon */}
                      <div className="relative mb-4 group-hover:scale-110 transition-all duration-500">
                        <Image
                          src={platform.image || "/placeholder.svg"}
                          alt={platform.name}
                          width={120}
                          height={60}
                          className="h-12 w-auto mx-auto object-contain filter group-hover:drop-shadow-lg"
                        />
                      </div>

                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-orange-300 transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {platform.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-orange-500/20 text-orange-300 border-orange-500/30 group-hover:bg-orange-500/30 transition-colors duration-300"
                      >
                        {platform.games}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden px-4">
                <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory hide-scrollbar">
                  {[
                    {
                      name: "Super Nintendo",
                      description: "Reviva a era dourada dos 16-bits!",
                      games: "1.200+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_b96727e6d973f1c2db64344e24b4ae31394bf239835afaa7cdfefe5237689a03_trimmed-atI8JZQDKp906X6Sb4YtnukPLXiyhD.png",
                    },
                    {
                      name: "Mega Drive",
                      description: "A velocidade do Sonic te espera!",
                      games: "800+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_ccb8e8ecd67c56dd6a093433151ea7a03678dc993e031ccbd4d133c7165dcfcc_trimmed-qWN4VclazpbR1BKNIHJnWPltPXAnlg.png",
                    },
                    {
                      name: "Nintendo 8 Bits",
                      description: "Onde tudo começou!",
                      games: "900+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_97c12feb684d01d868ed4c2a6739eed66e23b639a1291b27e93eed161f904ba4_trimmed-0IaZQ1GPUqMBlLhxh89q007J0nvb6g.png",
                    },
                    {
                      name: "PlayStation 1",
                      description: "A revolução 3D!",
                      games: "400+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_49014648090033f58c3b68433606e1dee393b34ce18449ef8ce4737fd630acfd_trimmed-mkSABYoMc8QHUICU645si5ln9bWijg.png",
                    },
                  ].map((platform, index) => (
                    <div key={index} className="min-w-[240px] snap-start">
                      <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl rounded-xl overflow-hidden h-full">
                        <CardContent className="p-4 text-center">
                          <div className="mb-3">
                            <Image
                              src={platform.image || "/placeholder.svg"}
                              alt={platform.name}
                              width={80}
                              height={40}
                              className="h-8 w-auto mx-auto object-contain"
                            />
                          </div>
                          <h3 className="text-white font-bold text-base mb-2">{platform.name}</h3>
                          <p className="text-gray-300 text-xs mb-3 leading-relaxed">{platform.description}</p>
                          <Badge
                            variant="secondary"
                            className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs"
                          >
                            {platform.games}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portáteis Nostálgicos */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center justify-center mb-6 md:mb-10">
                <div className="relative bg-gradient-to-r from-green-500/15 via-green-600/20 to-green-500/15 backdrop-blur-md rounded-xl px-6 py-3 md:px-12 md:py-6 border border-green-500/40 shadow-xl max-w-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent rounded-xl"></div>
                  <h3 className="relative text-lg md:text-3xl lg:text-4xl font-bold text-white text-center flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-16 md:h-16 bg-green-500/20 rounded-full mr-3 md:mr-4 border border-green-500/30">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/game_13128986-kJKJ8Ei6LsVRU4w1FOWqEwIqWgQ4jQ.png"
                        alt="Handheld Gaming Device"
                        width={32}
                        height={32}
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </span>
                    <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                      Portáteis Nostálgicos
                    </span>
                  </h3>
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    name: "Game Boy",
                    description: "O portátil que conquistou o mundo! Tetris e Pokémon te aguardam!",
                    games: "600+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_2aed49179e64de90ca0f0f4d18a2a83e773d85e764d8ec978b937aa0eb5deb3e_trimmed-LlJv2nh4IsCXjSAjHYoOpgrVQ3VZtJ.png",
                  },
                  {
                    name: "Game Boy Color",
                    description: "As cores chegaram! Viva aventuras coloridas em suas mãos!",
                    games: "500+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Game_Boy_Color_logo.svg-fepRNbIiaGVMiSj2kWSkZkYqjqgHLg.png",
                  },
                  {
                    name: "Game Boy Advance",
                    description: "O futuro dos portáteis com gráficos 32-bits incríveis!",
                    games: "700+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e5c06fd3a107a36cbc9420254b90c51a-kYPxBXIc7Hsz8mFKNN1oDQCy4u7r7K.png",
                  },
                  {
                    name: "Lynx",
                    description: "O portátil esquecido da Atari com jogos únicos!",
                    games: "100+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_128138592fb3122625e65ccae2ed425d68aa84b39b8456c1b6e8f5a1cb8fcb93_trimmed-ZzMTcXeA5B9eHDU36M0ivEDkkKc64e.png",
                  },
                ].map((platform, index) => (
                  <Card
                    key={index}
                    className="group bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-green-500/50 transition-all duration-500 hover:shadow-green-500/20 transform hover:-translate-y-2 hover:scale-105 shadow-xl rounded-xl overflow-hidden relative"
                  >
                    <CardContent className="p-6 text-center relative">
                      <div className="relative mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 filter group-hover:drop-shadow-lg">
                        <Image
                          src={platform.image || "/placeholder.svg"}
                          alt={platform.name}
                          width={120}
                          height={60}
                          className="h-12 w-auto mx-auto object-contain filter group-hover:drop-shadow-lg"
                        />
                      </div>

                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-green-300 transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {platform.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-300 border-green-500/30 group-hover:bg-green-500/30 transition-colors duration-300"
                      >
                        {platform.games}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden px-4">
                <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory hide-scrollbar">
                  {[
                    {
                      name: "Game Boy",
                      description: "O portátil que conquistou o mundo!",
                      games: "600+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_2aed49179e64de90ca0f0f4d18a2a83e773d85e764d8ec978b937aa0eb5deb3e_trimmed-LlJv2nh4IsCXjSAjHYoOpgrVQ3VZtJ.png",
                    },
                    {
                      name: "Game Boy Color",
                      description: "As cores chegaram!",
                      games: "500+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Game_Boy_Color_logo.svg-fepRNbIiaGVMiSj2kWSkZkYqjqgHLg.png",
                    },
                    {
                      name: "Game Boy Advance",
                      description: "O futuro dos portáteis!",
                      games: "700+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e5c06fd3a107a36cbc9420254b90c51a-kYPxBXIc7Hsz8mFKNN1oDQCy4u7r7K.png",
                    },
                    {
                      name: "Lynx",
                      description: "O portátil esquecido da Atari!",
                      games: "100+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_128138592fb3122625e65ccae2ed425d68aa84b39b8456c1b6e8f5a1cb8fcb93_trimmed-ZzMTcXeA5B9eHDU36M0ivEDkkKc64e.png",
                    },
                  ].map((platform, index) => (
                    <div key={index} className="min-w-[240px] snap-start">
                      <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl rounded-xl overflow-hidden h-full">
                        <CardContent className="p-4 text-center">
                          <div className="mb-3">
                            <Image
                              src={platform.image || "/placeholder.svg"}
                              alt={platform.name}
                              width={80}
                              height={40}
                              className="h-8 w-auto mx-auto object-contain"
                            />
                          </div>
                          <h3 className="text-white font-bold text-base mb-2">{platform.name}</h3>
                          <p className="text-gray-300 text-xs mb-3 leading-relaxed">{platform.description}</p>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                          >
                            {platform.games}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Raros e Colecionáveis */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-center mb-6 md:mb-10">
                <div className="relative bg-gradient-to-r from-purple-500/15 via-purple-600/20 to-purple-500/15 backdrop-blur-md rounded-xl px-6 py-3 md:px-12 md:py-6 border border-purple-500/40 shadow-xl max-w-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-xl"></div>
                  <h3 className="relative text-lg md:text-3xl lg:text-4xl font-bold text-white text-center flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-16 md:h-16 bg-purple-500/20 rounded-full mr-3 md:mr-4 border border-purple-500/30">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-game_5508278-DBLdHu3rGnJz1dlocr83WsCR2DuQj4.png"
                        alt="Gaming Trophy"
                        width={32}
                        height={32}
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </span>
                    <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                      Raros e Colecionáveis
                    </span>
                  </h3>
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    name: "Neo Geo",
                    description: "O console premium dos arcades! Jogos de luta lendários!",
                    games: "800+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_08c17d57bd57c778a75c35a1f7ea28acc591cd476e06dc1e6dab1b51030b657f_trimmed-DhMGTpl7AiqnYivKRZhU0cybDJVECR.png",
                  },
                  {
                    name: "Arcade",
                    description: "A essência pura dos fliperamas em sua casa!",
                    games: "2.500+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/410-4101327_classic-arcade-logo-png-transparent-png-CDdQhiSW0jDByLoLY4VAeK6tVOl6xc.png",
                  },
                  {
                    name: "Capcom",
                    description: "Os melhores jogos de luta e ação da lendária Capcom!",
                    games: "300+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_9b7246f035e50ad02988b9a8c64814de3b02e92f35d4a2c7e8c17995e9768087_trimmed-G6Ubb2QqgwM1cNFcutnrHRiCwKFzO8.png",
                  },
                  {
                    name: "Super Famicom",
                    description: "A versão japonesa do Super Nintendo com exclusivos únicos!",
                    games: "200+ jogos",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_b8cd6cace88613d2b9f8a275a6333fa21c2a5f790b8fb824e2c7d64173853cf9_trimmed-KqLM2ghJ54by3mZzjHi8qXkg6gaWMP.png",
                  },
                ].map((platform, index) => (
                  <Card
                    key={index}
                    className="group bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:shadow-purple-500/20 transform hover:-translate-y-2 hover:scale-105 shadow-xl rounded-xl overflow-hidden relative"
                  >
                    <CardContent className="p-6 text-center relative">
                      <div className="relative mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 filter group-hover:drop-shadow-lg">
                        <Image
                          src={platform.image || "/placeholder.svg"}
                          alt={platform.name}
                          width={120}
                          height={60}
                          className="h-12 w-auto mx-auto object-contain filter group-hover:drop-shadow-lg"
                        />
                      </div>

                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-purple-300 transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {platform.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30 group-hover:bg-purple-500/30 transition-colors duration-300"
                      >
                        {platform.games}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden px-4">
                <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory hide-scrollbar">
                  {[
                    {
                      name: "Neo Geo",
                      description: "O console premium dos arcades!",
                      games: "800+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_08c17d57bd57c778a75c35a1f7ea28acc591cd476e06dc1e6dab1b51030b657f_trimmed-DhMGTpl7AiqnYivKRZhU0cybDJVECR.png",
                    },
                    {
                      name: "Arcade",
                      description: "A essência pura dos fliperamas!",
                      games: "2.500+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/410-4101327_classic-arcade-logo-png-transparent-png-CDdQhiSW0jDByLoLY4VAeK6tVOl6xc.png",
                    },
                    {
                      name: "Capcom",
                      description: "Os melhores jogos de luta e ação!",
                      games: "300+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_9b7246f035e50ad02988b9a8c64814de3b02e92f35d4a2c7e8c17995e9768087_trimmed-G6Ubb2QqgwM1cNFcutnrHRiCwKFzO8.png",
                    },
                    {
                      name: "Super Famicom",
                      description: "A versão japonesa do Super Nintendo!",
                      games: "200+ jogos",
                      image:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_b8cd6cace88613d2b9f8a275a6333fa21c2a5f790b8fb824e2c7d64173853cf9_trimmed-KqLM2ghJ54by3mZzjHi8qXkg6gaWMP.png",
                    },
                  ].map((platform, index) => (
                    <div key={index} className="min-w-[240px] snap-start">
                      <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 shadow-xl rounded-xl overflow-hidden h-full">
                        <CardContent className="p-4 text-center">
                          <div className="mb-3">
                            <Image
                              src={platform.image || "/placeholder.svg"}
                              alt={platform.name}
                              width={80}
                              height={40}
                              className="h-8 w-auto mx-auto object-contain"
                            />
                          </div>
                          <h3 className="text-white font-bold text-base mb-2">{platform.name}</h3>
                          <p className="text-gray-300 text-xs mb-3 leading-relaxed">{platform.description}</p>
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                          >
                            {platform.games}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Family Gaming Section */}
            <div className="mt-8 md:mt-12 text-center px-4">
              <Card className="bg-gradient-to-br from-gray-800/90 via-gray-800/70 to-gray-800/90 backdrop-blur-lg border-gray-700 shadow-2xl rounded-2xl max-w-5xl mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
                <CardContent className="p-0 relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-80 lg:h-full min-h-[300px] overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nova%20estrat%C3%A9gia.jpg-5JstBUduIVucYmwc2NliDsRFS3PU9h.jpeg"
                        alt="Família feliz jogando videogame juntos no sofá - pai, mãe e filha se divertindo com controles de videogame"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                      <div className="text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6">
                          <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                            Diversão Garantida
                          </span>
                          <br />
                          para Toda Família
                        </h3>

                        <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                          O Game Stick Pro 4K acompanha <strong className="text-orange-400">2 controles sem fio</strong>
                          , perfeito para momentos especiais em família.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center justify-center lg:justify-start bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                            <Gamepad2 className="w-6 h-6 text-orange-400 mr-3" />
                            <div className="text-left">
                              <div className="text-white font-bold text-lg">2 Controles</div>
                              <div className="text-orange-300 text-sm">Sem Fio Inclusos</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center lg:justify-start bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                            <Users className="w-6 h-6 text-green-400 mr-3" />
                            <div className="text-left">
                              <div className="text-white font-bold text-lg">Multiplayer</div>
                              <div className="text-green-300 text-sm">Diversão em Família</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-400 mr-2" />
                          <span>Mais de 20.000 jogos incríveis!! </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Customer Feedback Section */}
          <section ref={testimonialsRef} className="py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Aprovado por quem{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Entende
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                A satisfação de nossos clientes é nossa maior conquista. Veja alguns depoimentos reais!
              </p>
            </div>

            {/* Rating e estatísticas - Otimizado para mobile */}
            <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-1 md:mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                  ))}
                  <div className="relative">
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: "80%" }}>
                      <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">4.8 de 5</p>
                <p className="text-gray-300 text-sm md:text-base">Avaliação média</p>
              </div>

              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-orange-400">5.300+</p>
                <p className="text-gray-300 text-sm md:text-base">Pedidos entregues</p>
              </div>

              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-green-400">98%</p>
                <p className="text-gray-300 text-sm md:text-base">Clientes satisfeitos</p>
              </div>

              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-blue-400">+2</p>
                <p className="text-gray-300 text-sm md:text-base">Anos no mercado</p>
              </div>
            </div>

            {/* Slider de depoimentos em vídeo */}
            <div className="relative">
              {/* Botão de navegação esquerda */}
              <button
                onClick={() => scrollTestimonialsSlider("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 shadow-lg border border-gray-600/50 backdrop-blur-md hidden md:block"
                aria-label="Deslizar depoimentos para a esquerda"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Container do slider de depoimentos */}
              <div
                ref={testimonialsSliderRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {customerTestimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                    <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl h-full rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        {/* Vídeo do depoimento */}
                        <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden mb-4 bg-black group cursor-pointer border border-gray-700">
                          {/* Thumbnail/Preview personalizado com foto real do cliente */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black flex flex-col items-center justify-center p-4">
                            {/* Foto real do cliente */}
                            <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-orange-400 shadow-lg">
                              <Image
                                src={testimonial.photo || "/placeholder.svg"}
                                alt={testimonial.customerName}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Nome do cliente */}
                            <h4 className="text-white font-bold text-lg mb-2 text-center px-4">
                              {testimonial.customerName}
                            </h4>

                            {/* Localização */}
                            <p className="text-gray-300 text-sm mb-4">{testimonial.location}</p>

                            {/* Botão de play grande e atrativo */}
                            <div className="relative">
                              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 group-hover:scale-110 transition-all duration-300 group-hover:shadow-orange-500/60">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              {/* Efeito de pulso */}
                              <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full animate-ping"></div>
                            </div>

                            {/* Texto indicativo */}
                            <p className="text-gray-300 text-xs mt-4 text-center px-4 group-hover:text-white transition-colors">
                              Clique para assistir o depoimento
                            </p>
                          </div>

                          {/* Vídeo real (inicialmente oculto) */}
                          <video
                            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none transition-opacity duration-500"
                            controls
                            preload="metadata"
                            onLoadedData={(e) => {
                              // Quando o vídeo carregar, pode mostrar um frame
                              const video = e.target as HTMLVideoElement
                              video.currentTime = 1 // Vai para 1 segundo para pegar um frame interessante
                            }}
                          >
                            <source src={testimonial.videoSrc} type="video/mp4" />
                            Seu navegador não suporta vídeos HTML5.
                          </video>

                          {/* Badge de depoimento real */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500/90 text-white border-none text-xs backdrop-blur-sm">
                              ✓ Depoimento Real
                            </Badge>
                          </div>

                          {/* Overlay de clique com funcionalidade de swipe */}
                          <div
                            className="absolute inset-0 z-10 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault()
                              const container = e.currentTarget.parentElement
                              const preview = container?.querySelector(
                                ".absolute.inset-0.bg-gradient-to-br",
                              ) as HTMLElement
                              const video = container?.querySelector("video") as HTMLVideoElement

                              if (preview && video) {
                                // Esconder preview
                                preview.style.opacity = "0"
                                preview.style.pointerEvents = "none"

                                // Mostrar e reproduzir vídeo
                                video.style.opacity = "1"
                                video.style.pointerEvents = "auto"
                                video.style.position = "absolute"
                                video.style.top = "0"
                                video.style.left = "0"
                                video.style.width = "100%"
                                video.style.height = "100%"
                                video.style.objectFit = "cover"
                                video.play()

                                // Quando o vídeo terminar, voltar ao preview
                                video.onended = () => {
                                  preview.style.opacity = "1"
                                  preview.style.pointerEvents = "auto"
                                  video.style.opacity = "0"
                                  video.style.pointerEvents = "none"
                                  video.currentTime = 0
                                }

                                // Permitir pausar clicando no vídeo
                                video.onclick = (e) => {
                                  e.stopPropagation()
                                  if (video.paused) {
                                    video.play()
                                  } else {
                                    video.pause()
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Botão de navegação direita */}
              <button
                onClick={() => scrollTestimonialsSlider("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full p-2 shadow-lg border border-gray-600/50 backdrop-blur-md hidden md:block"
                aria-label="Deslizar depoimentos para a direita"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicador de deslize para mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <p className="text-gray-400 text-sm flex items-center">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Deslize para ver mais depoimentos
                <ChevronRight className="w-4 h-4 ml-1" />
              </p>
            </div>
          </section>

          {/* Instagram Community Section */}
          <section className="py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Nossa{" "}
                <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-orange-600 bg-clip-text text-transparent">
                  Comunidade
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Mais de 25.000 seguidores acompanham a Smart Ilha no Instagram!
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-gray-800/90 via-gray-800/70 to-gray-800/90 backdrop-blur-lg border-gray-700 shadow-2xl rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-orange-500/5"></div>
                <CardContent className="p-0 relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Instagram Phone Image */}
                    <div className="relative h-96 md:h-[500px] lg:h-full min-h-[400px] overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                      <div className="relative max-w-xs mx-auto">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-29%20at%2009.39.03-hLiDCyj7St4ikbP46BqPXtI1lLBUEq.jpeg"
                          alt="Smart Ilha Instagram Profile - @smartilha com 25.2k seguidores"
                          width={300}
                          height={600}
                          className="w-full h-auto object-contain drop-shadow-2xl"
                          sizes="(max-width: 1024px) 300px, 300px"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                      <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start mb-6">
                          <Instagram className="w-8 h-8 text-pink-400 mr-3" />
                          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">@smartilha</h3>
                          <Badge className="ml-3 bg-blue-500/90 text-white border-none text-xs">✓ Verificado</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-br from-orange-600/10 via-gray-900/20 to-orange-600/10 backdrop-blur-xl border-orange-500/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                  Sua Jornada Retrô Começa{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Agora!
                  </span>
                </h2>
                <p className="text-gray-300 mb-8 text-lg font-light">
                  Confira todas as informações sobre entrega, valores e formas de pagamento!
                </p>
              </div>

              <div className="space-y-6">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-10 py-6 rounded-xl text-lg md:text-xl shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Ver Valores Agora
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <CheckCircle className="w-4 h-4 text-orange-400 mr-2" />
                    Entrega Rápida
                  </div>
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <CheckCircle className="w-4 h-4 text-orange-400 mr-2" />
                    Produto Original
                  </div>
                  <div className="flex items-center justify-center bg-gray-700/60 backdrop-blur-sm p-3 rounded-xl border border-gray-600/50">
                    <CheckCircle className="w-4 h-4 text-orange-400 mr-2" />
                    Suporte Completo
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Enhanced Footer */}
          <footer className="mt-16 bg-slate-800 text-white w-full">
            <div className="w-full px-6 py-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Logo and Description */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SMART%20ILHA-TNkbpZeRtuxJryZ3PloGlGSz23FRXm.png"
                        alt="Smart Ilha Logo"
                        width={60}
                        height={60}
                        className="h-15 size-20"
                      />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                      A Smart Ilha é sua loja de tecnologia premium, oferecendo produtos inovadores com atendimento
                      especializado e qualidade garantida.
                    </p>
                  </div>

                  {/* Links Rápidos */}

                  {/* Contato */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Contato</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-orange-400">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">(21) 98020-2797</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-orange-400">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">contato@smartilha.com.br</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-orange-400">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">Ilha do Governador, RJ</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-orange-400">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">Entrega em todo Brasil</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm mb-4 md:mb-0">
                    © {new Date().getFullYear()} Smart Ilha - Todos os direitos reservados
                  </p>
                  <div className="flex space-x-6">
                    <a href="#privacidade" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                      Política de Privacidade
                    </a>
                    <a href="#servico" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                      Termos de Serviço
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* Estilos CSS para esconder scrollbar */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </main>

      {/* Contador de Visitas - Popup no canto inferior esquerdo */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-3 border border-gray-700 shadow-2xl max-w-xs">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500/10 p-2 rounded-full border border-orange-500/30">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-400 font-bold text-lg">{visitCount.toLocaleString()}</span>
                <span className="text-gray-300 text-sm">visitas hoje</span>
              </div>
              <div className="text-gray-400 text-xs">{currentDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
