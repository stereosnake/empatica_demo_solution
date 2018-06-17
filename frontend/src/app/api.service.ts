import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl = "http://localhost:9000";
  constructor(private auth: AuthService, private http: HttpClient) {}

  login(email: string, password: string) {
    var payload = { email: email, password: password };
    return this.http.post(this.baseUrl + "/login", payload);
  }

  getUser(userId: number) {
    return this.http.get(this.baseUrl + "/users/" + userId, this.getHeader());
  }

  getHeader() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.auth.getToken()
      })
    };
  }
}
