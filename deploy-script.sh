#!/bin/bash

# Script para deployment en EC2
echo "🚀 Iniciando deployment de Oasis Blog..."

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18 (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Clonar el proyecto (reemplaza con tu repo)
cd ~
git clone https://github.com/tu-usuario/oasisblog.git
cd oasisblog

# Instalar dependencias
npm install

# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Build del proyecto
npm run build

# Iniciar con PM2
pm2 start ecosystem.config.js

# Guardar configuración PM2
pm2 save
pm2 startup

echo "✅ Deployment completado!"
echo "🌐 Tu aplicación está corriendo en: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
