'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Upload, Music, Disc, User, Image as ImageIcon } from 'lucide-react'
import Toast from './Toast'

interface RecommendationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: RecommendationFormData) => void
  editData?: any | null
}

interface RecommendationFormData {
  id?: string
  songName: string
  albumName: string
  artistName: string
  image: File | null
  comment?: string
}

export default function RecommendationModal({ isOpen, onClose, onSubmit, editData }: RecommendationModalProps) {
  const [formData, setFormData] = useState<RecommendationFormData>({
    songName: '',
    albumName: '',
    artistName: '',
    image: null,
    comment: ''
  })
  const [dragActive, setDragActive] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'warning'
    isVisible: boolean
  }>({ message: '', type: 'success', isVisible: false })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cargar datos cuando se abre para editar
  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        id: editData.id,
        songName: editData.songName || '',
        albumName: editData.albumName || '',
        artistName: editData.artistName || '',
        image: null,
        comment: editData.comment || ''
      })
      // Si hay imagen existente, mostrar preview
      if (editData.imageUrl) {
        setImagePreview(editData.imageUrl)
      }
    } else if (isOpen && !editData) {
      // Limpiar formulario para nueva recomendación
      setFormData({
        songName: '',
        albumName: '',
        artistName: '',
        image: null,
        comment: ''
      })
      setImagePreview(null)
    }
  }, [isOpen, editData])

  if (!isOpen) return null

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (file: File) => {
    if (file.size > 500 * 1024 * 1024) { // 500MB limit
      showToast('🎸 ¡Oye! La imagen es muy pesada. Máximo 500MB como "Champagne Supernova".', 'warning')
      return
    }

    if (!file.type.startsWith('image/')) {
      showToast('🎵 Solo se permiten imágenes. ¡Que sea tan visual como "Wonderwall"!', 'error')
      return
    }

    setFormData(prev => ({ ...prev, image: file }))
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones
    if (!formData.songName.trim()) {
      showToast('🎤 ¡Necesitas el nombre de la canción! Como "Live Forever" o "Wonderwall".', 'warning')
      return
    }

    if (!formData.albumName.trim()) {
      showToast('💿 ¡Falta el nombre del álbum! Como "Definitely Maybe" o "(What\'s the Story) Morning Glory?".', 'warning')
      return
    }

    if (!formData.artistName.trim()) {
      showToast('🎸 ¡Necesitas el nombre del artista! Aunque sabemos que Oasis es el mejor.', 'warning')
      return
    }

    try {
      // Crear FormData para envío
      const submitFormData = new FormData()
      submitFormData.append('songName', formData.songName.trim())
      submitFormData.append('albumName', formData.albumName.trim())
      submitFormData.append('artistName', formData.artistName.trim())
      if (formData.comment?.trim()) {
        submitFormData.append('comment', formData.comment.trim())
      }
      if (formData.image) {
        submitFormData.append('image', formData.image)
      }

      const url = editData ? `/api/recommendations/${editData.id}` : '/api/recommendations'
      const method = editData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: submitFormData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al procesar la solicitud')
      }

      if (result.success) {
        showToast(`🌟 ${editData ? 'Recomendación actualizada' : 'Recomendación guardada'}! "Don't look back in anger" - tu sugerencia ya está en la lista.`, 'success')
        
        setTimeout(() => {
          if (onSubmit) {
            onSubmit(formData)
          }
          onClose()
          // Reset form
          setFormData({
            songName: '',
            albumName: '',
            artistName: '',
            image: null,
            comment: ''
          })
          setImagePreview(null)
        }, 2000)
      } else {
        throw new Error(result.error || 'Error desconocido')
      }
    } catch (error: any) {
      console.error('Error:', error)
      showToast(`❌ ${error.message || 'Error al guardar la recomendación. Inténtalo de nuevo.'}`, 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
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

        {/* Form Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {editData ? 'Editar Recomendación' : 'Recomendar Canción'}
            </h2>
            <p className="text-gray-600">Comparte tu música favorita con la comunidad</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Song Name */}
            <div className="relative">
              <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="songName"
                placeholder="Nombre de la canción"
                value={formData.songName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-black placeholder-gray-500"
                required
              />
            </div>

            {/* Album Name */}
            <div className="relative">
              <Disc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="albumName"
                placeholder="Nombre del álbum"
                value={formData.albumName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-black placeholder-gray-500"
                required
              />
            </div>

            {/* Artist Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="artistName"
                placeholder="Nombre del artista"
                value={formData.artistName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-black placeholder-gray-500"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Imagen de la canción/álbum (opcional)
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData(prev => ({ ...prev, image: null }))
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar imagen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-gray-600">
                        Arrastra una imagen aquí o{' '}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-black font-medium hover:underline"
                        >
                          selecciona un archivo
                        </button>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF hasta 500MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Comentario (opcional)
              </label>
              <textarea
                name="comment"
                placeholder="¿Por qué recomiendas esta canción?"
                value={formData.comment}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors text-black placeholder-gray-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>{editData ? 'Actualizar Recomendación' : 'Guardar Recomendación'}</span>
            </button>
          </form>

          {/* Oasis Quote */}
          <div className="mt-6 text-center border-t pt-6">
            <blockquote className="text-sm italic text-gray-600">
              "You're gonna be the one that saves me"
            </blockquote>
            <p className="text-xs text-gray-500 mt-1">- Wonderwall, Oasis</p>
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
