'use client'

import { Trophy, Users, Globe, Award, Calendar, Target } from 'lucide-react'

const milestones = [
  {
    year: "1994",
    title: "Definitely Maybe",
    description: "Álbum debut más rápido en vender en UK",
    achievement: "1M copias en 4 semanas",
    icon: Trophy,
    color: "from-blue-500 to-indigo-600"
  },
  {
    year: "1995",
    title: "Glastonbury Headliners",
    description: "Primer gran festival como cabeza de cartel",
    achievement: "100,000 personas",
    icon: Users,
    color: "from-green-500 to-emerald-600"
  },
  {
    year: "1996",
    title: "Knebworth",
    description: "Los conciertos más grandes de la historia británica",
    achievement: "2.5M solicitudes de entradas",
    icon: Globe,
    color: "from-purple-500 to-violet-600"
  },
  {
    year: "1997",
    title: "Be Here Now",
    description: "El álbum más rápido en vender en UK",
    achievement: "696,000 copias en 3 días",
    icon: Award,
    color: "from-yellow-500 to-orange-600"
  },
  {
    year: "2005",
    title: "Don't Believe the Truth",
    description: "Regreso triunfal después de años difíciles",
    achievement: "#1 en 8 países",
    icon: Target,
    color: "from-red-500 to-pink-600"
  },
  {
    year: "2008",
    title: "Dig Out Your Soul",
    description: "Último álbum de estudio de la formación original",
    achievement: "#1 UK Albums Chart",
    icon: Calendar,
    color: "from-teal-500 to-cyan-600"
  }
]

const achievements = [
  {
    number: "70M+",
    label: "Álbumes Vendidos",
    description: "En todo el mundo"
  },
  {
    number: "8",
    label: "Álbumes #1 UK",
    description: "Récord consecutivo"
  },
  {
    number: "22",
    label: "Singles Top 10",
    description: "En Reino Unido"
  },
  {
    number: "250K",
    label: "Fans en Knebworth",
    description: "En dos noches épicas"
  }
]

export default function BandMilestones() {
  return (
    <section id="hitos" className="py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">Hitos Legendarios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los momentos que marcaron la historia del rock y convirtieron a Oasis en leyenda
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <div className={`inline-flex items-center space-x-2 mb-3 ${index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`bg-gradient-to-r ${milestone.color} text-white p-2 rounded-lg`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-bold text-slate-800">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      <div className={`bg-gradient-to-r ${milestone.color} text-white px-4 py-2 rounded-full inline-block`}>
                        <span className="font-semibold text-sm">{milestone.achievement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className={`w-6 h-6 bg-gradient-to-r ${milestone.color} rounded-full border-4 border-white shadow-lg z-10`} />
                  </div>

                  {/* Empty space */}
                  <div className="w-5/12" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Números Que Hacen Historia</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl font-bold text-slate-800 mb-2">{achievement.number}</div>
                  <div className="text-lg font-semibold text-slate-600 mb-1">{achievement.label}</div>
                  <div className="text-sm text-gray-500">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knebworth Special Section */}
        <div className="mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://parapaginaweb.s3.us-east-1.amazonaws.com/kenbort+19956.jpg"
              alt="Knebworth 1996 crowd"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-white p-12">
              <div className="text-center">
                <h3 className="text-4xl font-bold mb-6">Knebworth 1996</h3>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Los conciertos más grandes de la historia del rock británico.
                  2.5 millones de personas solicitaron entradas para ver a solo 250,000 afortunados.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">2.5M</div>
                    <div className="text-purple-200">Solicitudes de entradas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">250K</div>
                    <div className="text-purple-200">Fans en dos noches</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">2.5%</div>
                    <div className="text-purple-200">Probabilidad de conseguir entrada</div>
                  </div>
                </div>
                <blockquote className="text-2xl italic mt-8 font-light">
                  "I felt like I was in the biggest band in the world"
                </blockquote>
                <p className="text-purple-200 mt-2">- Noel Gallagher sobre Knebworth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
