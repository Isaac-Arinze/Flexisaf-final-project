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
                    echo "Current directory:"
                    pwd
                    echo "Listing files in workspace:"
                    ls -la
                    echo "Navigating to frontend directory..."
                    cd frontend
                    echo "Listing files in frontend directory:"
                    ls -la
                    echo "Node.js version:"
                    node --version
                    echo "npm version:"
                    npm --version
                    echo "Installing dependencies..."
                    npm ci
                    echo "Checking for missing dependencies..."
                    if ! npm list react-router-dom; then
                        echo "react-router-dom is not installed, installing..."
                        npm install react-router-dom
                    fi
                    if ! npm list react-datepicker; then
                        echo "react-datepicker is not installed, installing..."
                        npm install react-datepicker
                    fi
                    echo "Building the project..."
                    npm run build
                    echo "Listing files after build:"
                    ls -la
                '''
            }
        }
    }
}