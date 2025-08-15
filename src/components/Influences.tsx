'use client'

const influences = [
  {
    name: "The Beatles",
    impact: "La mayor influencia",
    description: "Noel ha admitido abiertamente que robó acordes y melodías de los Beatles. 'Don't Look Back in Anger' está inspirada en 'Imagine' de John Lennon.",
    songs: ["Don't Look Back in Anger", "Whatever", "She's Electric"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/beatles.webp"
  },
  {
    name: "The Stone Roses",
    impact: "Inspiración de Manchester",
    description: "La banda que mostró a Oasis que era posible salir de Manchester y conquistar el mundo. Su actitud y sonido influyeron profundamente en el estilo Oasis.",
    songs: ["Rock 'n' Roll Star", "Live Forever"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/sotenroeses.jpg"
  },
  {
    name: "The Sex Pistols",
    impact: "Actitud punk",
    description: "La actitud desafiante y la arrogancia de los Sex Pistols se reflejó en la personalidad pública de Oasis, especialmente en Liam.",
    songs: ["Cigarettes & Alcohol", "Bring It On Down"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/Sex_Pistols.webp"
  },
  {
    name: "T. Rex",
    impact: "Glam rock",
    description: "Marc Bolan y T. Rex influyeron en las melodías pegajosas y el glamour de Oasis. Noel era un gran fan del glam rock de los 70.",
    songs: ["Roll with It", "Wonderwall"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/trex.jpg"
  },
  {
    name: "The Kinks",
    impact: "Melodías británicas",
    description: "Ray Davies y The Kinks enseñaron a Oasis sobre las melodías típicamente británicas y la narrativa en las canciones.",
    songs: ["Some Might Say", "Masterplan"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/thekinks.jpg"
  },
  {
    name: "Slade",
    impact: "Himnos de estadio",
    description: "Los coros masivos y los himnos de estadio de Slade fueron fundamentales para el sonido épico de Oasis.",
    songs: ["Roll with It", "Hey Now!"],
    image: "https://parapaginaweb.s3.us-east-1.amazonaws.com/slade.jpg"
  }
]

const legacy = [
  {
    band: "Coldplay",
    description: "Chris Martin ha citado a Oasis como una influencia clave, especialmente en sus primeros álbumes."
  },
  {
    band: "Arctic Monkeys",
    description: "La banda de Sheffield siguió los pasos de Oasis como representantes del rock británico moderno."
  },
  {
    band: "Kasabian",
    description: "Adoptaron la actitud y el sonido de estadio que Oasis perfeccionó en los 90."
  },
  {
    band: "The Verve",
    description: "Richard Ashcroft y Noel Gallagher se influyeron mutuamente durante la era dorada del Britpop."
  }
]

export default function Influences() {
  return (
    <section id="influencias" className="py-16 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-amber-800 mb-4">Influencias y Legado</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las bandas que inspiraron a Oasis y cómo ellos inspiraron a las siguientes generaciones
          </p>
        </div>

        {/* Influences Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Sus Influencias</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {influences.map((influence, index) => {
              
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    {/* Header */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={influence.image} alt={influence.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative z-10 p-6 text-white">
                        <h4 className="text-xl font-bold mb-1">{influence.name}</h4>
                        <p className="text-sm opacity-90">{influence.impact}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {influence.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-800">Canciones influenciadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {influence.songs.map((song, songIndex) => (
                            <span key={songIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                              {song}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legacy Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Su Legado</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {legacy.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h4 className="text-xl font-bold text-amber-800 mb-3">{item.band}</h4>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-12 max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
              "I'd like to be in a band like The Beatles: pretty tunes, great songs, great musicians, and be the biggest thing in the world"
            </blockquote>
            <p className="text-amber-200 font-medium mb-8">- Noel Gallagher</p>
            
            <div className="grid md:grid-cols-3 gap-8 text-center mt-8">
              <div>
                <div className="text-3xl font-bold mb-2">60+</div>
                <div className="text-amber-200">Bandas influenciadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">30</div>
                <div className="text-amber-200">Años de influencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-amber-200">Impacto cultural</div>
              </div>
            </div>
          </div>
        </div>

        {/* Britpop Context */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">El Movimiento Britpop</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Oasis no solo fue influenciado por las bandas del pasado, sino que ayudó a definir 
                todo un movimiento musical. Junto con Blur, Pulp, y Suede, crearon el Britpop, 
                un renacimiento del rock británico que dominó los años 90.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Su rivalidad con Blur, conocida como "The Battle of Britpop", capturó la 
                imaginación del público y elevó el perfil de ambas bandas a niveles históricos.
              </p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-2xl">
              <img src="https://parapaginaweb.s3.us-east-1.amazonaws.com/blur+vs+oasis.jpg" alt="Oasis vs Blur - Battle of Britpop" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6 text-center">
                <h4 className="text-xl font-bold mb-2">Oasis vs Blur</h4>
                <p className="text-sm opacity-90">Battle of Britpop · 1995</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
