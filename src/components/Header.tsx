'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 relative overflow-hidden">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://parapaginaweb.s3.us-east-1.amazonaws.com/logooaiss.jpg" 
              alt="Oasis Logo" 
              className="h-12 w-auto object-contain filter brightness-110 contrast-110"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#historia" className="hover:text-yellow-400 transition-colors font-medium">Historia</a>
            <a href="#reencuentro" className="hover:text-yellow-400 transition-colors font-medium">Reencuentro</a>
            <a href="#peleas" className="hover:text-yellow-400 transition-colors font-medium">Hermanos</a>
            <a href="#guitarra" className="hover:text-yellow-400 transition-colors font-medium">Noel's Guitar</a>
            <a href="#canciones" className="hover:text-yellow-400 transition-colors font-medium">Hits</a>
            <a href="#hitos" className="hover:text-yellow-400 transition-colors font-medium">Hitos</a>
            <a href="#influencias" className="hover:text-yellow-400 transition-colors font-medium">Influencias</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-600 pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#historia" className="hover:text-yellow-400 transition-colors font-medium">Historia</a>
              <a href="#reencuentro" className="hover:text-yellow-400 transition-colors font-medium">Reencuentro</a>
              <a href="#peleas" className="hover:text-yellow-400 transition-colors font-medium">Hermanos</a>
              <a href="#guitarra" className="hover:text-yellow-400 transition-colors font-medium">Noel's Guitar</a>
              <a href="#canciones" className="hover:text-yellow-400 transition-colors font-medium">Hits</a>
              <a href="#hitos" className="hover:text-yellow-400 transition-colors font-medium">Hitos</a>
              <a href="#influencias" className="hover:text-yellow-400 transition-colors font-medium">Influencias</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
