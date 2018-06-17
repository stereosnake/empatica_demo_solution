import { AbstractPage } from './abstract.po.ts';
import { browser, by, element } from 'protractor';

export class HomePage extends AbstractPage {
  elements = {
    greetingsPar: 'app-home p',
    logoutLink: 'a[href="/logout"]'
  };

  route = '/home';
  path = browser.baseUrl + this.route;

  getGreetingsText() {
    return this.getElement(this.elements.greetingsPar).getText();
  }

  getLogutLink() {
    return this.getElement(this.elements.logoutLink);
  }

  logout() {
    this.getLogutLink().click();
  }
}
