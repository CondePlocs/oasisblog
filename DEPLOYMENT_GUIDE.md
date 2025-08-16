# 🚀 Guía de Deployment - Oasis Blog en AWS

## 📋 Requisitos Previos
- ✅ Instancia EC2 creada y funcionando
- ✅ Base de datos RDS PostgreSQL creada
- ✅ Security Groups configurados (puerto 3000 abierto)

## 🔧 Paso 1: Preparar tu Proyecto Local

### 1.1 Crear archivo .env
```bash
cp env.example .env
```

Edita `.env` con tus datos reales:
```env
DATABASE_URL="postgresql://tu_usuario:tu_password@tu-rds-endpoint.region.rds.amazonaws.com:5432/oasisblog"
NEXTAUTH_URL="http://tu-ip-publica-ec2:3000"
NEXTAUTH_SECRET="genera-un-secret-seguro-aqui"
NODE_ENV="production"
PORT=3000
```

### 1.2 Subir a GitHub (si no lo has hecho)
```bash
git add .
git commit -m "Preparar para deployment AWS"
git push origin main
```

## 🖥️ Paso 2: Conectar a tu EC2

### 2.1 Conectar por SSH
```bash
ssh -i tu-key.pem ubuntu@tu-ip-publica-ec2
```

### 2.2 Limpiar instalación anterior (si existe)
```bash
# Eliminar proyecto anterior
rm -rf ~/oasisblog

# Limpiar PM2
pm2 delete all
pm2 save
rm -rf ~/.pm2/logs
rm -rf ~/.pm2/dump.pm2

# Verificar puerto libre
lsof -i :3000
# Si hay algo corriendo: kill -9 <PID>
```

## 🔨 Paso 3: Instalación Automática

### 3.1 Actualizar sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Instalar Node.js 18
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3.3 Instalar PM2
```bash
sudo npm install -g pm2
```

### 3.4 Instalar Git (si no está)
```bash
sudo apt install git -y
```

## 📦 Paso 4: Clonar y Configurar Proyecto

### 4.1 Clonar repositorio
```bash
cd ~
git clone https://github.com/tu-usuario/oasisblog.git
cd oasisblog
```

### 4.2 Crear archivo .env en EC2
```bash
nano .env
```

Pega el contenido con tus datos reales:
```env
DATABASE_URL="postgresql://tu_usuario:tu_password@tu-rds-endpoint.region.rds.amazonaws.com:5432/oasisblog"
NEXTAUTH_URL="http://tu-ip-publica-ec2:3000"
NEXTAUTH_SECRET="tu-secret-seguro"
NODE_ENV="production"
PORT=3000
```

### 4.3 Instalar dependencias
```bash
npm install
```

### 4.4 Configurar Prisma
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy
```

### 4.5 Build del proyecto
```bash
npm run build
```

## 🚀 Paso 5: Iniciar Aplicación

### 5.1 Iniciar con PM2
```bash
pm2 start ecosystem.config.js
```

### 5.2 Configurar PM2 para auto-inicio
```bash
pm2 save
pm2 startup
```

### 5.3 Verificar estado
```bash
pm2 status
pm2 logs oasis-blog
```

## 🌐 Paso 6: Verificar Funcionamiento

### 6.1 Obtener IP pública
```bash
curl -s http://169.254.169.254/latest/meta-data/public-ipv4
```

### 6.2 Abrir en navegador
```
http://TU-IP-PUBLICA:3000
```

## 🔧 Comandos Útiles

### Ver logs
```bash
pm2 logs oasis-blog
```

### Reiniciar aplicación
```bash
pm2 restart oasis-blog
```

### Actualizar código
```bash
cd ~/oasisblog
git pull origin main
npm install
npm run build
pm2 restart oasis-blog
```

### Monitoreo
```bash
pm2 monit
```

## 🛠️ Troubleshooting

### Si la app no inicia:
1. Verificar logs: `pm2 logs oasis-blog`
2. Verificar variables de entorno: `cat .env`
3. Verificar conexión a RDS: `npx prisma db pull`

### Si no puedes acceder desde navegador:
1. Verificar Security Group (puerto 3000 abierto)
2. Verificar que la app esté corriendo: `pm2 status`
3. Verificar IP pública: `curl -s http://169.254.169.254/latest/meta-data/public-ipv4`

## ✅ Checklist Final
- [ ] EC2 conectado y limpio
- [ ] Node.js 18 instalado
- [ ] PM2 instalado
- [ ] Proyecto clonado
- [ ] .env configurado
- [ ] Dependencias instaladas
- [ ] Prisma configurado
- [ ] Proyecto buildeado
- [ ] PM2 iniciado
- [ ] Aplicación accesible desde navegador
