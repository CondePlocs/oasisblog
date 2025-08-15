'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const slides = [
  {
    title: "Definitely Maybe",
    subtitle: "El álbum que cambió el rock británico para siempre",
    description: "1994 - El debut que conquistó al mundo con himnos como 'Live Forever' y 'Rock 'n' Roll Star'",
    bgImage: "https://parapaginaweb.s3.us-east-1.amazonaws.com/defifnty+maybe.jpg"
  },
  {
    title: "Wonderwall",
    subtitle: "La canción que definió una generación",
    description: "El himno eterno que sigue resonando en estadios de todo el mundo",
    bgImage: "https://parapaginaweb.s3.us-east-1.amazonaws.com/wonderwall.jpg"
  },
  {
    title: "Manchester",
    subtitle: "Los reyes del Britpop",
    description: "Desde las calles de Manchester hasta conquistar Knebworth ante 250,000 personas",
    bgImage: "https://parapaginaweb.s3.us-east-1.amazonaws.com/manchester.jpg"
  },
  {
    title: "2025 - El Regreso",
    subtitle: "Los hermanos Gallagher juntos de nuevo",
    description: "Después de 15 años, Oasis anuncia su regreso triunfal",
    bgImage: "https://parapaginaweb.s3.us-east-1.amazonaws.com/oasis-live-2025.jpg"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex items-center justify-center relative">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="container mx-auto px-4 text-center text-white z-10">
              <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">
                {slide.title}
              </h2>
              <h3 className="text-2xl md:text-3xl font-light mb-6 text-yellow-300">
                {slide.subtitle}
              </h3>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                {slide.description}
              </p>
              
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center mx-auto space-x-2">
                <Play className="w-5 h-5" />
                <span>Descubre Más</span>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-yellow-400 rounded-full opacity-30" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-white rounded-full opacity-20" />
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
