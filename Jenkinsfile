pipeline {
  agent any

  environment {
    CI = "false"
    VERCEL_TOKEN = credentials('vercel-token')
    // Agrega Node.js al PATH de Windows
    PATH = "C:\\Program Files\\nodejs;${env.PATH}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', 
                 branches: [[name: '*/main']],
                 extensions: [],
                 userRemoteConfigs: [[url: 'https://github.com/manuel4320/node-project.git']]
        ])
      }
    }

    stage('Setup Node.js') {
      steps {
        // Verifica que Node.js esté instalado y accesible
        bat 'where node'
        bat 'node --version'
        bat 'npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        // Ejecuta con el Node.js instalado globalmente
        bat '"C:\\Program Files\\nodejs\\npm.cmd" install --legacy-peer-deps'
      }
    }

    stage('Run tests') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npm.cmd" test -- --watchAll=false'
      }
    }

    stage('Build app') {
      steps {
        bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
      }
    }
  }

  post {
    failure {
      echo "❌ Error en el pipeline. Revisa los logs."
      // Opcional: Limpiar workspace si falla
      cleanWs()
    }
    success {
      echo "✅ Pipeline ejecutado correctamente!"
    }
  }
}