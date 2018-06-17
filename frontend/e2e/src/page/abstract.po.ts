import { browser, by, element } from 'protractor';

export class AbstractPage {
  navigateTo(route?: string) {
    if (route) {
      return browser.get(route);
    }
    return browser.get('/');
  }

  getElement(cssSelector) {
    return element(by.css(cssSelector));
  }

  restartBrowserTab() {
    browser.restart();
  }
}
