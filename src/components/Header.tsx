'use client'

import { useState, useEffect } from 'react'
import { Menu, X, User, Guitar } from 'lucide-react'
import LoginModal from './LoginModal'
import UserProfileModal from './UserProfileModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.reload()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex space-x-6 flex-1 justify-center">
            <a href="#historia" className="hover:text-yellow-400 transition-colors font-medium">Historia</a>
            <a href="#reencuentro" className="hover:text-yellow-400 transition-colors font-medium">Reencuentro</a>
            <a href="#peleas" className="hover:text-yellow-400 transition-colors font-medium">Hermanos</a>
            <a href="#guitarra" className="hover:text-yellow-400 transition-colors font-medium">Noel's Guitar</a>
            <a href="#canciones" className="hover:text-yellow-400 transition-colors font-medium">Hits</a>
            <a href="#hitos" className="hover:text-yellow-400 transition-colors font-medium">Hitos</a>
            <a href="#influencias" className="hover:text-yellow-400 transition-colors font-medium">Influencias</a>
          </nav>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-full transition-colors"
                  title={`Hola, ${user.name}`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Recomendar Canciones"
                >
                  <Guitar className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Login / Registro"
                >
                  <User className="w-6 h-6" />
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Recomendar Canciones"
                >
                  <Guitar className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

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
              <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-600">
                {user ? (
                  <>
                    <button 
                      onClick={() => setIsProfileModalOpen(true)}
                      className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>{user.name}</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Guitar className="w-5 h-5" />
                      <span>Recomendar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Guitar className="w-5 h-5" />
                      <span>Recomendar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* User Profile Modal */}
      {user && (
        <UserProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </header>
  )
}
