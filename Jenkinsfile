pipeline {
    agent any

        triggers {
        cron('H H/2 * * *')
    }
    stages { 

        stage('Install Dependencies') { 
            steps {
                echo "Installing Node.js dependencies..."
                bat 'npm ci' 
            }
        }

        stage('Run ESLint') {
            steps {
                echo "Linting code..."
                bat 'npm run lint'
            }
        }

        stage('Check Prettier Format') {
            steps {
                echo "Formatting code..."
                bat 'npm run format'
            }
        }

        stage('Run UI Tests by Cucumber') {
            steps {
                echo "Running WebdriverIO UI tests..."
                bat 'npx wdio run wdio.conf.js' 
            }
        }
        stage('Publish Allure Report') {
            steps {
                echo "Publishing Allure Report..."
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                    ])
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
