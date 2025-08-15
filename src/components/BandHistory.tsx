'use client'

import { Calendar, MapPin, Users, Award } from 'lucide-react'

export default function BandHistory() {
  return (
    <section id="historia" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-blue-900 mb-4">La Historia de Oasis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde las calles de Manchester hasta convertirse en la banda más grande del mundo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Timeline */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">1991 - Los Inicios</h3>
                <p className="text-gray-700">
                  Liam Gallagher forma la banda "The Rain" que luego se convertiría en Oasis. 
                  Su hermano Noel se une como guitarrista principal y compositor.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-500 text-white p-3 rounded-full">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">1994 - Definitely Maybe</h3>
                <p className="text-gray-700">
                  Lanzan su álbum debut que se convierte en el álbum debut más rápido en vender 
                  en el Reino Unido en ese momento, con clásicos como "Live Forever" y "Rock 'n' Roll Star".
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-600 text-white p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">1995-1997 - La Cima</h3>
                <p className="text-gray-700">
                  "(What's the Story) Morning Glory?" los catapulta al estrellato mundial. 
                  Knebworth 1996: 250,000 personas en dos noches históricas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 text-white p-3 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">2009 - El Final</h3>
                <p className="text-gray-700">
                  Las tensiones entre los hermanos Gallagher llegan al límite. 
                  Noel abandona la banda justo antes de un festival en París.
                </p>
              </div>
            </div>
          </div>

          {/* Imagen histórica - Manchester, años 90 */}
          <div className="relative">
            <img
              src="https://parapaginaweb.s3.us-east-1.amazonaws.com/oasis+iconic.jpg"
              alt="Oasis en Manchester, años 90"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
              Manchester, años 90
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-900 mb-2">70M+</div>
            <div className="text-gray-600">Álbumes Vendidos</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">8</div>
            <div className="text-gray-600">Álbumes de Estudio</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">18</div>
            <div className="text-gray-600">Años Activos</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">250K</div>
            <div className="text-gray-600">Fans en Knebworth</div>
          </div>
        </div>
      </div>
    </section>
  )
}
