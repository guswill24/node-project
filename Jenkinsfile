pipeline {
  agent any

  environment {
    CI = "false" // Desactiva que React trate los warnings como errores
    VERCEL_TOKEN = credentials('78r1T7MIJxVPfG74QEO4j6b0') // Quita esta línea si no despliegas con Vercel
  }

  stages {
    stage('Tool Install') {
      steps {
        script {
          def nodeHome = tool name: 'Node 20', type: 'nodejs'
          env.PATH = "${nodeHome}\\bin:${env.PATH}"
        }
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
        bat (script: 'npm test -- --watchAll=false', returnStatus: true)
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
