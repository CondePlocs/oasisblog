import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import prisma from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

// PUT - Actualizar recomendación
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Verificar que la recomendación existe y pertenece al usuario
    const existingRecommendation = await prisma.recommendation.findUnique({
      where: { id }
    })

    if (!existingRecommendation) {
      return NextResponse.json(
        { success: false, error: 'Recomendación no encontrada' },
        { status: 404 }
      )
    }

    if (existingRecommendation.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'No tienes permisos para editar esta recomendación' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const songName = formData.get('songName') as string
    const albumName = formData.get('albumName') as string
    const artistName = formData.get('artistName') as string
    const comment = formData.get('comment') as string || null
    const imageFile = formData.get('image') as File | null

    // Validaciones
    if (!songName?.trim() || !albumName?.trim() || !artistName?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nombre de canción, álbum y artista son requeridos' },
        { status: 400 }
      )
    }

    let imageUrl = existingRecommendation.imageUrl

    // Procesar nueva imagen si existe
    if (imageFile && imageFile.size > 0) {
      // Validar tamaño (5MB máximo)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'La imagen no puede ser mayor a 5MB' },
          { status: 400 }
        )
      }

      // Validar tipo de archivo
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: 'Solo se permiten archivos de imagen' },
          { status: 400 }
        )
      }

      // Eliminar imagen anterior si existe
      if (existingRecommendation.imageUrl) {
        const oldImagePath = join(process.cwd(), 'public', existingRecommendation.imageUrl)
        if (existsSync(oldImagePath)) {
          try {
            await unlink(oldImagePath)
          } catch (error) {
            console.error('Error deleting old image:', error)
          }
        }
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now()
      const fileExtension = imageFile.name.split('.').pop() || 'jpg'
      const fileName = `${songName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.${fileExtension}`

      // Convertir archivo a buffer
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Guardar en public/canciones
      const filePath = join(process.cwd(), 'public', 'canciones', fileName)
      await writeFile(filePath, buffer)

      // URL relativa para la base de datos
      imageUrl = `/canciones/${fileName}`
    }

    // Actualizar recomendación
    const updatedRecommendation = await prisma.recommendation.update({
      where: { id },
      data: {
        songName: songName.trim(),
        albumName: albumName.trim(),
        artistName: artistName.trim(),
        imageUrl,
        comment: comment?.trim() || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    const formattedRecommendation = {
      id: updatedRecommendation.id,
      songName: updatedRecommendation.songName,
      albumName: updatedRecommendation.albumName,
      artistName: updatedRecommendation.artistName,
      imageUrl: updatedRecommendation.imageUrl,
      comment: updatedRecommendation.comment,
      userName: updatedRecommendation.user.name,
      userId: updatedRecommendation.userId,
      createdAt: updatedRecommendation.createdAt.toISOString(),
      updatedAt: updatedRecommendation.updatedAt.toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Recomendación actualizada exitosamente',
      recommendation: formattedRecommendation
    })

  } catch (error) {
    console.error('Error updating recommendation:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar recomendación
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Verificar que la recomendación existe y pertenece al usuario
    const existingRecommendation = await prisma.recommendation.findUnique({
      where: { id }
    })

    if (!existingRecommendation) {
      return NextResponse.json(
        { success: false, error: 'Recomendación no encontrada' },
        { status: 404 }
      )
    }

    if (existingRecommendation.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'No tienes permisos para eliminar esta recomendación' },
        { status: 403 }
      )
    }

    // Eliminar imagen si existe
    if (existingRecommendation.imageUrl) {
      const imagePath = join(process.cwd(), 'public', existingRecommendation.imageUrl)
      if (existsSync(imagePath)) {
        try {
          await unlink(imagePath)
        } catch (error) {
          console.error('Error deleting image:', error)
        }
      }
    }

    // Eliminar recomendación de la base de datos
    await prisma.recommendation.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Recomendación eliminada exitosamente'
    })

  } catch (error) {
    console.error('Error deleting recommendation:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
