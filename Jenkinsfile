pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    cd frontend  
                    containing package.json
                    npm install
                    npm run build
                    ls -la
                '''
            }
        }
    }
}