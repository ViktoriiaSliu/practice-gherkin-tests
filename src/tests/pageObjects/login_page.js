import BasePage from './base_page.js';

class LoginPage extends BasePage {
  get emailInput() {
    return $('input[id="email"]');
  }
  get passwordInput() {
    return $('input[id="password"]');
  }
  get loginButton() {
    return $('input[type="submit"]');
  }
  get dashboardHeader() {
    return $('h1');
  }

  open() {
    return super.open('auth/login');
  }

/*async login(email, password) {
  console.log('Logging in with:', email, password);

  await this.emailInput.waitForDisplayed({ timeout: 5000 });
  console.log('Email input displayed');

  const isEnabled = await this.emailInput.isEnabled();
  const isClickable = await this.emailInput.isClickable();
  console.log('Email input: enabled =', isEnabled, 'clickable =', isClickable);

  await this.emailInput.click();
  await this.emailInput.setValue(email);
  
  await this.passwordInput.waitForDisplayed({ timeout: 5000 });
  console.log('Password input displayed');

  await this.passwordInput.click();
  await this.passwordInput.setValue(password);

  await this.loginButton.waitForClickable({ timeout: 5000 });
  console.log('Login button clickable');

  await this.loginButton.click();
}*/

  async getDashboardHeaderText() {
    await this.dashboardHeader.waitForDisplayed({ timeout: this.timeout });
    return await this.dashboardHeader.getText();
  }
}

export default new LoginPage();
