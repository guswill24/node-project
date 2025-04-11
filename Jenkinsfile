pipeline {
    agent any

    environment {
        // 1. Configuración de Node.js (rutas para Windows)
        NODE_PATH = "C:\\Program Files\\nodejs"
        NPM_CMD = "${NODE_PATH}\\npm.cmd"
        
        // 2. Token de Vercel (debes crearlo en Jenkins > Credentials)
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        // ► Etapa 1: Clonar repo (sin duplicidades)
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ► Etapa 2: Instalar dependencias (con cache)
        stage('Install') {
            steps {
                bat """
                    cd /d "%WORKSPACE%"
                    "${NPM_CMD}" cache clean --force
                    "${NPM_CMD}" install --legacy-peer-deps
                """
            }
        }

        // ► Etapa 3: Tests (continúa aunque fallen)
        stage('Test') {
            steps {
                bat """
                    "${NPM_CMD}" test -- --watchAll=false --passWithNoTests
                """
            }
        }

        // ► Etapa 4: Build de producción
        stage('Build') {
            steps {
                bat """
                    "${NPM_CMD}" run build
                """
            }
        }
    }

    post {
        always {
            echo "✅ Proceso completado. Revisa los logs para detalles."
            // Opcional: Limpiar workspace
            // cleanWs()
        }
    }
}