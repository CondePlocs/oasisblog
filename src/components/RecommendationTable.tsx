'use client'

import { useState } from 'react'
import { Edit, Trash2, Music, Calendar, User, MessageCircle, Plus } from 'lucide-react'
import Toast from './Toast'

interface Recommendation {
  id: string
  songName: string
  albumName: string
  artistName: string
  imageUrl?: string
  comment?: string
  userName: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface RecommendationTableProps {
  recommendations: Recommendation[]
  onEdit: (recommendation: Recommendation) => void
  onDelete: (id: string) => void
  onAdd: () => void
  currentUserId?: string
}

export default function RecommendationTable({ 
  recommendations, 
  onEdit, 
  onDelete, 
  onAdd,
  currentUserId 
}: RecommendationTableProps) {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'warning'
    isVisible: boolean
  }>({ message: '', type: 'success', isVisible: false })

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true })
  }

  const handleDelete = async (id: string, songName: string) => {
    if (window.confirm(`¿Estás seguro de eliminar "${songName}"? Esta acción no se puede deshacer.`)) {
      await onDelete(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="relative h-32 overflow-hidden">
          <img 
            src="https://parapaginaweb.s3.us-east-1.amazonaws.com/oasislogin.png" 
            alt="Oasis Band" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <img 
                src="https://parapaginaweb.s3.us-east-1.amazonaws.com/logooaiss.jpg" 
                alt="Oasis Logo" 
                className="h-12 w-auto object-contain drop-shadow-lg mx-auto mb-2"
              />
              <h2 className="text-xl font-bold text-white">Recomendaciones Musicales</h2>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="p-12 text-center">
          <Music className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No hay recomendaciones aún
          </h3>
          <p className="text-gray-600 mb-6">
            Sé el primero en compartir tu música favorita con la comunidad
          </p>
          <button
            onClick={onAdd}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar Primera Recomendación</span>
          </button>
          
          {/* Oasis Quote */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <blockquote className="text-sm italic text-gray-600">
              "Maybe you're gonna be the one that saves me"
            </blockquote>
            <p className="text-xs text-gray-500 mt-1">- Wonderwall, Oasis</p>
          </div>
        </div>

        {/* Toast */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src="https://parapaginaweb.s3.us-east-1.amazonaws.com/oasislogin.png" 
          alt="Oasis Band" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <img 
              src="https://parapaginaweb.s3.us-east-1.amazonaws.com/logooaiss.jpg" 
              alt="Oasis Logo" 
              className="h-12 w-auto object-contain drop-shadow-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-white">Recomendaciones Musicales</h2>
              <p className="text-gray-300 text-sm">{recommendations.length} recomendaciones</p>
            </div>
          </div>
          <button
            onClick={onAdd}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Canción
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Álbum & Artista
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recomendado por
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recommendations.map((recommendation) => (
              <tr key={recommendation.id} className="hover:bg-gray-50 transition-colors">
                {/* Song Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    {recommendation.imageUrl ? (
                      <img
                        src={recommendation.imageUrl}
                        alt={`${recommendation.songName} cover`}
                        className="h-12 w-12 rounded-lg object-cover shadow-md"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center shadow-md">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {recommendation.songName}
                      </div>
                      {recommendation.comment && (
                        <div className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                          <MessageCircle className="h-3 w-3" />
                          <span className="truncate max-w-xs">
                            {recommendation.comment}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Album & Artist */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {recommendation.albumName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {recommendation.artistName}
                  </div>
                </td>

                {/* User */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {recommendation.userName}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formatDate(recommendation.createdAt)}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {currentUserId && recommendation.userId === currentUserId && (
                      <>
                        <button
                          onClick={() => onEdit(recommendation)}
                          className="text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
                          title="Editar recomendación"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(recommendation.id, recommendation.songName)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                          title="Eliminar recomendación"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {(!currentUserId || recommendation.userId !== currentUserId) && (
                      <span className="text-gray-400 text-xs italic">Solo el autor puede editar</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Quote */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="text-center">
          <blockquote className="text-sm italic text-gray-600">
            "All the roads we have to walk are winding"
          </blockquote>
          <p className="text-xs text-gray-500 mt-1">- Wonderwall, Oasis</p>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}
