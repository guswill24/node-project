pipeline {
    agent any

    tools {
        nodejs 'Node_20'
    }

    environment {
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages {

        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/guswill24/node-project.git', branch: 'main'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Run tests') {
            steps {
                bat 'npm test -- --watchAll=false'
            }
        }

        stage('Build app') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                // Corregido: agregamos el path para que Jenkins encuentre npx/vercel
                bat 'set PATH=%APPDATA%\\npm;%PATH% && npx vercel --prod --token=%VERCEL_TOKEN%'
            }
        }
    }

    post {
        always {
            echo 'Pipeline Finalizado. Puedes revisar el historial'
        }
        failure {
            echo 'Error en alguna etapa del pipeline. Revisar los logs'
        }
    }
}
