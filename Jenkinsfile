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
                    echo "Checking for frontend directory..."
                    if [ -d frontend ]; then
                        echo "frontend directory found"
                        cd frontend
                        echo "Listing files in frontend directory:"
                        ls -la
                        if [ -f package.json ]; then
                            echo "package.json found in frontend directory"
                            node --version
                            npm --version
                            npm install
                            npm run build
                        else
                            echo "Error: package.json not found in frontend directory"
                            exit 1
                        fi
                    else
                        echo "Error: frontend directory not found"
                        exit 1
                    fi
                '''
            }
        }
    }
}