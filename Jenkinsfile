pipeline {
  agent any

  environment {
    CI = "false" // Desactiva que React trate los warnings como errores
}
  stages {
    stage('Declarative: Checkout SCM') {
      steps {
        checkout scm
      }
    }

    stage('Tool Install') {
      steps {
        tool name: 'Node 20', type: 'nodejs'
      }
    }

    stage('Clean workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Checkout') {
      steps {
        git url: 'https://github.com/manuel4320/node-project.git', branch: 'main'
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
  }

  post {
    success {
      echo "✅ Pipeline ejecutado correctamente. Build exitoso."
    }

    failure {
      echo "❌ Error en alguna etapa del pipeline. Revisar los logs."
    }

    always {
      echo "📦 Pipeline finalizado (éxito o fallo). Puedes revisar el historial."
    }
  }
}