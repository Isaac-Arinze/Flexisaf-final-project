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
                    echo "Checking for package.json..."
                    if [ -f package.json ]; then
                        echo "package.json found"
                        node --version
                        npm --version
                        # Install react-router-dom explicitly
                        echo "Installing react-router-dom..."
                        npm install react-router-dom --save
                        # Then continue with normal build process
                        npm install
                        npm run build
                    else
                        echo "Error: package.json not found in frontend directory"
                        exit 1
                    fi
                '''
            }
        }
    }
}