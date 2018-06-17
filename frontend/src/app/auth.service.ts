import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private tokenKey: string = "token";
  constructor() {}

  getToken() {
    return window.localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    return window.localStorage.setItem(this.tokenKey, token);
  }

  deleteToken() {
    return window.localStorage.removeItem(this.tokenKey);
  }
}
