'use client'

import { useState } from 'react'
import { X, User, Mail, Calendar, Clock, LogOut } from 'lucide-react'
import Toast from './Toast'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    createdAt?: string
    updatedAt?: string
  }
  onLogout: () => void
}

export default function UserProfileModal({ isOpen, onClose, user, onLogout }: UserProfileModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'warning'
    isVisible: boolean
  }>({ message: '', type: 'success', isVisible: false })

  if (!isOpen) return null

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true })
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      showToast('🎵 "Don\'t look back in anger"... ¡Hasta la vista! Cerrando sesión...', 'success')
      
      // Esperar un momento para mostrar el mensaje
      setTimeout(async () => {
        await onLogout()
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Error during logout:', error)
      showToast('❌ Error al cerrar sesión. Inténtalo de nuevo.', 'error')
      setIsLoggingOut(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No disponible'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Background Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img 
            src="https://parapaginaweb.s3.us-east-1.amazonaws.com/oasislogin.png" 
            alt="Oasis Band" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Logo */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <img 
              src="https://parapaginaweb.s3.us-east-1.amazonaws.com/logooaiss.jpg" 
              alt="Oasis Logo" 
              className="h-16 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Cuenta</h2>
            <p className="text-gray-600">Información de tu perfil</p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Nombre</p>
                <p className="text-lg text-gray-800">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Correo electrónico</p>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Cuenta creada</p>
                <p className="text-lg text-gray-800">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {/* Updated At */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Última actualización</p>
                <p className="text-lg text-gray-800">{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}</span>
            </button>
          </div>

          {/* Oasis Quote */}
          <div className="mt-6 text-center border-t pt-6">
            <blockquote className="text-sm italic text-gray-600">
              "Don't look back in anger"
            </blockquote>
            <p className="text-xs text-gray-500 mt-1">- Oasis</p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}
