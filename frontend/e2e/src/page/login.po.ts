import { AbstractPage } from './abstract.po.ts';
import { browser } from 'protractor';

const defalutUser = {
  email: 'demo@empatica.com',
  password: 'passw0rd'
};

export class LoginPage extends AbstractPage {
  elements = {
    header: 'app-root h1',
    emailInput: 'input[name=email]',
    passwordInput: 'input[name=password]',
    submitButton: 'button[type=submit]',
    errorOverlay: '.cdk-visually-hidden'
  };

  route = '/';
  path = browser.baseUrl + this.route;

  getParagraphText() {
    return this.getElement(this.elements.header).getText();
  }

  fillLoginForm(email, password) {
    this.getElement(this.elements.emailInput).sendKeys(email);
    this.getElement(this.elements.passwordInput).sendKeys(password);
    return this;
  }

  submitLoginForm() {
    this.getElement(this.elements.submitButton).click();
  }

  logInAsDefaultUser() {
    this.fillLoginForm(defalutUser.email, defalutUser.password)
    .submitLoginForm();
  }

  getErrorOverlayMessage() {
    return this.getElement(this.elements.errorOverlay).getText();
  }
}
