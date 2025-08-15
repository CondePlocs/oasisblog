'use client'

import { Heart, Calendar, Ticket, Globe } from 'lucide-react'

export default function Reunion() {
  return (
    <section id="reencuentro" className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-green-800 mb-4">El Reencuentro Histórico</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Después de 15 años de separación, los hermanos Gallagher anuncian el regreso de Oasis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-green-600 text-white p-3 rounded-full">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">2024 - El Anuncio</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                El 27 de agosto de 2024, las redes sociales explotaron cuando Oasis anunció oficialmente 
                su reunión. Después de años de peleas públicas y declaraciones de que "nunca" volverían, 
                los hermanos Gallagher pusieron fin a una de las rivalries más famosas del rock.
              </p>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-semibold italic">
                  "The guns have fallen silent. The stars have aligned. The great wait is over. 
                  Come see. It will not be televised." - Comunicado oficial de Oasis
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-600 text-white p-3 rounded-full">
                  <Ticket className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800">La Demanda Histórica</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Las entradas para los conciertos de reunión se agotaron en minutos, con más de 
                10 millones de personas en las colas virtuales. Los sitios web colapsaron por 
                la demanda masiva, demostrando que el poder de Oasis sigue intacto después de 15 años.
              </p>
            </div>
          </div>

          {/* Image placeholder and tour dates */}
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://parapaginaweb.s3.us-east-1.amazonaws.com/reencuntro.jpg"
                alt="Anuncio oficial de reunión 2024"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                Anuncio oficial · 2024
              </div>
            </div>

            {/* Tour dates */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Fechas Confirmadas 2025
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Cardiff, Principality Stadium</span>
                  <span className="text-gray-600">4-5 Jul</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Manchester, Heaton Park</span>
                  <span className="text-gray-600">11-12, 19-20 Jul</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">London, Wembley Stadium</span>
                  <span className="text-gray-600">25-26 Jul, 2-3 Ago</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Edinburgh, Scottish Gas Murrayfield</span>
                  <span className="text-gray-600">8-9 Ago</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Dublin, Croke Park</span>
                  <span className="text-gray-600">16-17 Ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12 max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
              "This is it, this is happening"
            </blockquote>
            <p className="text-green-200 font-medium">
              - Las palabras que millones de fans esperaron escuchar durante 15 años
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
