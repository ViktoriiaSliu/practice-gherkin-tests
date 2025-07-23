pipeline {
    agent any

        triggers {
        cron('H H/2 * * *')
    }

    stages { 

        stage('Install Dependencies') { 
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install' 
            }
        }

        stage('Run UI Tests') {
            steps {
                echo "Running WebdriverIO UI tests..."
                sh 'npx wdio run wdio.conf.js' 
            }
        }
    }

    post {
        always { 
            echo 'Pipeline finished!'

        }
        success {
            echo 'UI Tests passed successfully!'
          
        }
        failure { 
            echo 'UI Tests failed!'
            
        }
    }
}
