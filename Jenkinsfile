pipeline {
  agent any
  environment {
    CI = "false" 
    VERCEL_TOKEN = credentials('vercel-token')
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
        // vercel cli
        bat 'npx vercel --prod --token=%VERCEL_TOKEN%'
      }
    }
  }

  post {
    success {
      echo "Pipeline ejecutando correctamente"
    }

    failure {
      echo "Error en alguna etapa del pipeline. Revisar los logs"
    }

    always {
      echo "Pipeline Finalizado. Puedes revisar el historial"
    }
  }
}
