import { LoginPage } from './page/login.po';
import { HomePage } from './page/home.po';
import { AbstractPage } from './page/abstract.po';
import { browser } from 'protractor';


describe('Demo app', () => {
  const page: AbstractPage = new AbstractPage();
  const loginPage: LoginPage = new LoginPage();
  const homePage: HomePage = new HomePage();

  beforeEach(() => {
    page.restartBrowserTab();
    page.navigateTo(loginPage.route);
  });

  it('should log in existing user', () => {
    loginPage.logInAsDefaultUser();
    // avoiding checking name in case it might change
    expect(homePage.getGreetingsText()).toContain('Ciao');
    expect(homePage.getLogutLink().isDisplayed()).toBeTruthy();
    expect(browser.getCurrentUrl()).toBe(homePage.path);
  });

  it('should show error user does not have account but logs in', () => {
    loginPage.fillLoginForm('user+test@example.com', '123123')
    .submitLoginForm();
    expect(loginPage.getErrorOverlayMessage())
    .toBe('Invalid login');
  });

  it('should show error message if user logs in with invalid credentials', () => {
    loginPage.fillLoginForm('notanemail', '123123')
    .submitLoginForm();
    expect(loginPage.getErrorOverlayMessage())
    .toBe('Invalid login');
  });

  it('should show error message if user does not fill required fields', () => {
    loginPage.fillLoginForm('', '').submitLoginForm();
    expect(loginPage.getErrorOverlayMessage())
    .toBe('Please fill the missing fields');
  });

  it('should logout user', () => {
    loginPage.logInAsDefaultUser();
    homePage.logout();
    expect(browser.getCurrentUrl()).toBe(loginPage.path);
    expect(loginPage.getParagraphText()).toEqual('Demo App Login');
  });
});
