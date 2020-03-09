pipeline {
  agent any
  stages {
    stage('preflight') {
      steps {
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'npm install'
      }
    }
  }
}