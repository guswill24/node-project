# 🟢 Proyecto de Manejo de Promesas + Integración Continua

Este proyecto consiste en una aplicación React sencilla que consume la API pública de usuarios aleatorios [Random User API](https://randomuser.me/api/) y muestra información básica de los usuarios.

El proyecto cuenta con un pipeline de Integración Continua y Entrega Continua (CI/CD) implementado con **Jenkins**, el cual realiza los siguientes procesos:

- Instalación de dependencias.
- Ejecución de pruebas unitarias automáticas.


## 🚀 Demo en producción

🔗 Aplicación desplegada en Vercel:  
[https://node-project-jet.vercel.app/](https://node-project-jet.vercel.app/)

🔗 API utilizada:  
[https://randomuser.me/api/](https://randomuser.me/api/)

---

## 📂 Estructura del Proyecto

```
📦 src
 ┣ 📂 components
 ┃ ┣ 📄 App.js
 ┃ ┣ 📄 Person.js
 ┃ ┣ 📄 SearchForm.js
 ┃ ┣ 📄 VisualizarTiempos.js
 ┃ ┣ 📄 App.test.js
 ┃ ┣ 📄 Person.test.js
 ┃ ┣ 📄 SearchForm.test.js
 ┃ ┗ 📄 VisualizarTiempos.test.js
 ┣ 📄 index.js
 ┗ 📄 index.css
```

> ✅ Las pruebas unitarias fueron integradas junto a los componentes siguiendo la estructura recomendada por **Create React App** para evitar conflictos de lectura en Jenkins.

---

## 🧪 Tecnologías utilizadas

- React 18
- Axios
- Jest + React Testing Library
- Jenkins (CI/CD)
- Vercel (Despliegue)

---

## 🔥 Pipeline de CI/CD

El pipeline está configurado con las siguientes etapas:

1. **Checkout** del repositorio.
2. Limpieza del workspace.
3. Instalación de dependencias con `npm install`.
4. Ejecución de pruebas con `npm test`.
5. Despliegue automático a **Vercel**.
6. Notificación por correo electrónico con el resultado.

### 🎯 Jenkinsfile

```groovy
pipeline {
  agent any

  tools {
    nodejs 'Node 20'
  }

  environment {
    VERCEL_TOKEN = credentials('vercel-token')
  }

  options {
    timeout(time: 5, unit: 'MINUTES')
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

}
```

---

## 📩 Configuraciones requeridas

- Token de acceso en Vercel.
- Jenkins configurado con:
  - NodeJS 20.


---

## 🙌 Autor

**Gustavo Sánchez Rodríguez**  
Proyecto académico - Práctica de Integración Continua
