#!/bin/bash

# Script para ejecutar el seed de datos en PostgreSQL
# Ejecutar en tu servidor EC2 después del deployment

echo "🌱 Ejecutando seed de datos..."

# Variables de conexión - CAMBIAR POR TUS DATOS REALES
DB_HOST="tu-rds-endpoint.amazonaws.com"
DB_NAME="oasisblog"
DB_USER="tu_usuario"
DB_PASSWORD="tu_password"

# Ejecutar el script SQL
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f ~/oasisblog/seed-data.sql

echo "✅ Datos insertados correctamente!"

# Verificar que se insertaron los datos
echo "📊 Verificando datos insertados:"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) as total_users FROM users;"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) as total_recommendations FROM recommendations;"
