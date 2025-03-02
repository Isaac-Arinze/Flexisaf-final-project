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
                    echo "Navigating to frontend directory..."
                    cd frontend
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    echo "Checking for react-router-dom..."
                    if npm list react-router-dom; then
                        echo "react-router-dom is installed"
                    else
                        echo "react-router-dom is not installed, installing..."
                        npm install react-router-dom
                    fi
                    npm run build
                    ls -la
                '''
            }
        }
    }
}