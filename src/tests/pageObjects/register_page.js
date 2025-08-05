import BasePage from './base_page.js';

class RegisterPage extends BasePage {
  get firstNameInput() {
    return $('input[formcontrolname="first_name"]');
  }
  get lastNameInput() {
    return $('input[formcontrolname="last_name"]');
  }
  get dateOfBirthInput() {
    return $('input[formcontrolname="dob"]');
  }
  get streetInput() {
    return $('input[formcontrolname="street"]');
  }
  get postalCodeInput() {
    return $('input[formcontrolname="postal_code"]');
  }
  get cityInput() {
    return $('input[formcontrolname="city"]');
  }
  get stateInput() {
    return $('input[formcontrolname="state"]');
  }
  get countryInput() {
    return $('select[formcontrolname="country"]');
  }
  get phoneInput() {
    return $('input[formcontrolname="phone"]');
  }
  get emailInput() {
    return $('input[formcontrolname="email"]');
  }
  get passwordInput() {
    return $('input[id="password"]');
  }
  get registerButton() {
    return $('button[class="btnSubmit mb-3"]');
  }
  get loginHeader() {
    return $('h3=Login');
  }
  get loginButton() {
    return $('input[data-test="login-submit"]');
  }
  get errorLoginMessage() {
    return $('[data-test="register-error"]');
  }

  async registerUser(user) {
    await this.firstNameInput.setValue(user.firstName);
    await this.lastNameInput.setValue(user.lastName);
    await this.dateOfBirthInput.click();
    await browser.keys(user.dob.split(''));
    await browser.keys('Tab');
    await this.streetInput.setValue(user.street);
    await this.postalCodeInput.setValue(user.postalCode);
    await this.cityInput.setValue(user.city);
    await this.stateInput.setValue(user.state);
    await this.countryInput.selectByAttribute('value', user.country);
    await this.phoneInput.setValue(user.phone);
    await this.emailInput.setValue(user.email);
    await this.passwordInput.setValue(user.password);
    await this.registerButton.click();
  }

  open() {
    return super.open('auth/register');
  }
}

export default new RegisterPage();
