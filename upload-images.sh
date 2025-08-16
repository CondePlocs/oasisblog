#!/bin/bash

# Script para subir las imágenes al servidor EC2
# Ejecutar desde tu computadora local

echo "📁 Subiendo imágenes al servidor EC2..."

# Variables - CAMBIAR POR TUS DATOS REALES
EC2_IP="tu-ip-publica-ec2"
KEY_FILE="ruta/a/tu-key.pem"
LOCAL_IMAGES_PATH="c:/Users/User/Desktop/git/oasisblog/public/canciones"

# Crear directorio en EC2 si no existe
ssh -i $KEY_FILE ubuntu@$EC2_IP "mkdir -p ~/oasisblog/public/canciones"

# Subir todas las imágenes
scp -i $KEY_FILE -r $LOCAL_IMAGES_PATH/* ubuntu@$EC2_IP:~/oasisblog/public/canciones/

echo "✅ Imágenes subidas correctamente!"

# Verificar que se subieron
ssh -i $KEY_FILE ubuntu@$EC2_IP "ls -la ~/oasisblog/public/canciones/"
