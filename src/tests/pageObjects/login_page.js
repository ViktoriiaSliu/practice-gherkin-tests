import BasePage from './base_page.js';

 class LoginPage extends BasePage {

    get emailInput() { return $('input[formcontrolname="email"]'); }
    get passwordInput() { return $('input[id="password"]'); }
    get loginButton() { return $('input[type="submit"]'); }
    get dashboardHeader() { return $('h1'); }


     open () {
        return super.open('auth/login');
    }
    

    async login(email, password) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }


    async getDashboardHeaderText() {
        await this.dashboardHeader.waitForDisplayed({ timeout: 5000 });
        return await this.dashboardHeader.getText();
    }

   
}

export default new LoginPage();