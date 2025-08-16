import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import prisma from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

// GET - Obtener todas las recomendaciones
export async function GET() {
  try {
    const recommendations = await prisma.recommendation.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedRecommendations = recommendations.map(rec => ({
      id: rec.id,
      songName: rec.songName,
      albumName: rec.albumName,
      artistName: rec.artistName,
      imageUrl: rec.imageUrl,
      comment: rec.comment,
      userName: rec.user.name,
      userId: rec.userId,
      createdAt: rec.createdAt.toISOString(),
      updatedAt: rec.updatedAt.toISOString()
    }))

    return NextResponse.json({
      success: true,
      recommendations: formattedRecommendations
    })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener las recomendaciones' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva recomendación
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 401 }
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

    let imageUrl: string | null = null

    // Procesar imagen si existe
    if (imageFile && imageFile.size > 0) {
      // Validar tamaño (500MB máximo)
      if (imageFile.size > 500 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'La imagen no puede ser mayor a 500MB' },
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

    // Verificar si ya existe una recomendación del mismo usuario para la misma canción
    const existingRecommendation = await prisma.recommendation.findFirst({
      where: {
        userId: user.id,
        songName: songName.trim(),
        albumName: albumName.trim(),
        artistName: artistName.trim()
      }
    })

    if (existingRecommendation) {
      return NextResponse.json(
        { success: false, error: 'Ya has recomendado esta canción anteriormente' },
        { status: 400 }
      )
    }

    // Crear recomendación
    const recommendation = await prisma.recommendation.create({
      data: {
        userId: user.id,
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
      id: recommendation.id,
      songName: recommendation.songName,
      albumName: recommendation.albumName,
      artistName: recommendation.artistName,
      imageUrl: recommendation.imageUrl,
      comment: recommendation.comment,
      userName: recommendation.user.name,
      userId: recommendation.userId,
      createdAt: recommendation.createdAt.toISOString(),
      updatedAt: recommendation.updatedAt.toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Recomendación creada exitosamente',
      recommendation: formattedRecommendation
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating recommendation:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
