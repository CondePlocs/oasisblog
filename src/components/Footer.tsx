'use client'

import { Heart, Github, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://parapaginaweb.s3.us-east-1.amazonaws.com/logooaiss.jpg" alt="Oasis Logo" className="w-12 h-12 object-contain drop-shadow-lg" />
              <div>
                <h3 className="text-2xl font-bold tracking-wider">OASIS BLOG</h3>
                <p className="text-xs text-gray-300 tracking-widest">DEFINITELY MAYBE</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
              Un tributo a la banda más grande del mundo. Desde Manchester hasta la eternidad, 
              celebramos el legado de Oasis y su impacto en la música rock.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4" />
              <span>Hecho con amor por fans para fans</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#historia" className="text-gray-300 hover:text-yellow-400 transition-colors">Historia</a></li>
              <li><a href="#reencuentro" className="text-gray-300 hover:text-yellow-400 transition-colors">Reencuentro</a></li>
              <li><a href="#peleas" className="text-gray-300 hover:text-yellow-400 transition-colors">Hermanos</a></li>
              <li><a href="#canciones" className="text-gray-300 hover:text-yellow-400 transition-colors">Hits</a></li>
              <li><a href="#hitos" className="text-gray-300 hover:text-yellow-400 transition-colors">Hitos</a></li>
              <li><a href="#influencias" className="text-gray-300 hover:text-yellow-400 transition-colors">Influencias</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Oasis Blog. Todos los derechos reservados. 
              <span className="block md:inline md:ml-2">
                Este es un proyecto de fans, no oficial.
              </span>
            </div>
            
            {/* Quote */}
            <div className="text-center md:text-right">
              <p className="text-yellow-400 italic font-medium">
                "Live Forever"
              </p>
              <p className="text-gray-400 text-xs">- Oasis, 1994</p>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6">
            <blockquote className="text-lg italic text-yellow-300 mb-2">
              "Don't look back in anger, I heard you say"
            </blockquote>
            <p className="text-gray-400 text-sm">
              Las palabras que siguen uniendo a millones de fans alrededor del mundo
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
