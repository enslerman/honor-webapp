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
        sh 'node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --build-optimizer --vendor-chunk;'
      }
    }
  }
}