'use client'

import { useState } from 'react'
import { Zap, Quote, Guitar, Info } from 'lucide-react'

export default function BrothersFight() {
  const [showGuitarModal, setShowGuitarModal] = useState(false)

  const fights = [
    {
      year: "1994",
      title: "La Primera Gran Pelea",
      description: "Durante una gira en Los Ángeles, Liam cambió las letras de 'Live Forever' para burlarse de Noel, quien abandonó la gira temporalmente.",
      quote: "\"He's not my brother, he's my ex-brother\" - Noel",
      image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/pelea1.webp"
    },
    {
      year: "2000",
      title: "El Incidente de Barcelona",
      description: "Liam arrojó ciruelas a Noel durante el desayuno en un hotel, lo que llevó a Noel a irse a casa en lugar de tocar en el festival.",
      quote: "\"I'm not a performing monkey\" - Noel",
      image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/pelea2.jpg"
    },
    {
      year: "2009",
      title: "El Final Definitivo",
      description: "Backstage en París, Liam arrojó una ciruela y un hacha (según Noel) que casi lo golpea. Noel abandonó la banda para siempre.",
      quote: "\"I simply could not go on working with Liam a day longer\" - Noel",
      image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/pelea3.jpg"
    }
  ]

  return (
    <>
      <section id="peleas" className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-red-800 mb-4">La Guerra de los Hermanos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las peleas épicas entre Liam y Noel que definieron tanto la música como la leyenda de Oasis
            </p>
          </div>

          {/* Curiosity button for Noel's guitar */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowGuitarModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center mx-auto space-x-2"
            >
              <Guitar className="w-5 h-5" />
              <span>Dato Curioso: La Guitarra de Noel</span>
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-12">
            {fights.map((fight, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-600 text-white p-3 rounded-full">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-red-600 font-bold text-lg">{fight.year}</span>
                      <h3 className="text-2xl font-bold text-gray-800">{fight.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {fight.description}
                  </p>
                  
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex items-start space-x-2">
                      <Quote className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <p className="text-red-800 italic font-medium">{fight.quote}</p>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative h-64 rounded-2xl shadow-2xl overflow-hidden">
                    <img src={fight.image} alt={fight.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Famous quotes section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Frases Legendarias</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <p className="text-lg italic text-gray-700 mb-2">
                  "Our kid thinks because he's got a tambourine that he's fucking Mick Jagger"
                </p>
                <p className="text-blue-600 font-semibold">- Noel sobre Liam</p>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-xl">
                <Quote className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <p className="text-lg italic text-gray-700 mb-2">
                  "He's rude, arrogant, intimidating and lazy. He's the angriest man you'll ever meet"
                </p>
                <p className="text-yellow-600 font-semibold">- Liam sobre Noel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guitar Modal */}
      {showGuitarModal && (
        <div className="fixed inset-0 bg-[#808080]/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">La Guitarra Legendaria de Noel</h3>
                <button
                  onClick={() => setShowGuitarModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="relative h-64 rounded-xl shadow-2xl overflow-hidden">
                  <img
                    src="https://parapaginaweb.s3.us-east-1.amazonaws.com/noelguitar.jpg"
                    alt="Guitarra legendaria de Noel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-800">Epiphone Riviera</h4>
                  <p className="text-gray-700">
                    La guitarra semi-acústica azul que Noel usó para crear los riffs más icónicos de Oasis, 
                    incluyendo "Live Forever" y "Champagne Supernova".
                  </p>
                  
                  <h4 className="text-xl font-semibold text-gray-800">Gibson Les Paul</h4>
                  <p className="text-gray-700">
                    Su guitarra principal para grabaciones, especialmente notable en "Wonderwall" 
                    y "Don't Look Back in Anger".
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 italic">
                      "I don't play guitar solos, I play guitar songs" - Noel Gallagher
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
