'use client'

import { Play } from 'lucide-react'

const songs = [
  {
    title: "Wonderwall",
    album: "(What's the Story) Morning Glory?",
    year: "1995",
    description: "El himno generacional que ganó el Britpop. Con esperanza y salvación que sigue resonando décadas después.",
    stats: "1B+ reproducciones en Spotify",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/wonderwall.webp"
  },
  {
    title: "Don't Look Back in Anger",
    album: "(What's the Story) Morning Glory?",
    year: "1995", 
    description: "La obra maestra de Noel. Un himno de unidad que se convirtió en el canto de esperanza en momentos difíciles.",
    stats: "500M+ reproducciones",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/Oasis_Dont_Look_Back_in_Anger.png"
  },
  {
    title: "Live Forever",
    album: "Definitely Maybe",
    year: "1994",
    description: "La canción que capturó el optimismo de una generación. Un himno a la inmortalidad juvenil.",
    stats: "300M+ reproducciones",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/live+forever.jpg"
  },
  {
    title: "Champagne Supernova",
    album: "(What's the Story) Morning Glory?",
    year: "1995",
    description: "Una épica de 7 minutos que cierra el álbum más importante de Oasis con guitarras celestiales.",
    stats: "250M+ reproducciones",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/champane+supernocva.webp"
  },
  {
    title: "Rock 'n' Roll Star",
    album: "Definitely Maybe",
    year: "1994",
    description: "El opening perfecto que declaró las intenciones de Oasis: conquistar el mundo del rock.",
    stats: "200M+ reproducciones",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/rocknrollstar.jpg"
  },
  {
    title: "Some Might Say",
    album: "(What's the Story) Morning Glory?",
    year: "1995",
    description: "Su primer #1 en UK. Una canción sobre perseverancia y actitud que define el espíritu Oasis.",
    stats: "150M+ reproducciones",
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/somemasight.jpeg"
  }
]

export default function FamousSongs() {
  return (
    <section id="canciones" className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-indigo-900 mb-4">Himnos Eternos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las canciones que definieron una era y siguen emocionando a millones de fans en todo el mundo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song, index) => {
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Header with gradient */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={song.image} alt={song.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{song.title}</h3>
                      <p className="text-sm opacity-90">{song.album} ({song.year})</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {song.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {song.stats}
                      </span>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Albums section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Álbumes Legendarios</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <img
                    src="https://parapaginaweb.s3.us-east-1.amazonaws.com/deifnitybaybe.jpeg"
                    alt="Definitely Maybe cover"
                    className="w-16 h-16 rounded-xl object-cover shadow"
                  />
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">Definitely Maybe</h4>
                  <p className="text-gray-600">1994 • Debut álbum</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                El álbum debut más vendido de la historia británica en su momento. 
                Una declaración de intenciones que cambió el rock para siempre.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold">8.5M copias vendidas mundialmente</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <img
                    src="https://parapaginaweb.s3.us-east-1.amazonaws.com/wahtsthestorymornyngglory.jpg"
                    alt="(What's the Story) Morning Glory? cover"
                    className="w-16 h-16 rounded-xl object-cover shadow"
                  />
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">(What's the Story) Morning Glory?</h4>
                  <p className="text-gray-600">1995 • Obra maestra</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                El álbum que los catapultó al estrellato mundial. Contiene algunos de 
                los himnos más grandes de la historia del rock.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold">22M copias vendidas mundialmente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12 max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
              "We're not arrogant, we just believe we're the best band in the world"
            </blockquote>
            <p className="text-indigo-200 font-medium">- Noel Gallagher</p>
          </div>
        </div>
      </div>
    </section>
  )
}
