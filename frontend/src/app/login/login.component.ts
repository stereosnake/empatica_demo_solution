import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (window.localStorage.getItem("token")) {
      this.redirect();
      return;
    }
  }

  ngOnInit() {}

  check(): boolean {
    return Boolean(this.email) && Boolean(this.password);
  }

  do() {
    if (!this.check()) {
      this.snackBar.open("Please fill the missing fields");
      return;
    }
    this.api.login(this.email, this.password).subscribe(
      (response: any) => {
        this.setToken(response.token);
        this.redirect();
      },
      err => {
        this.snackBar.open("Invalid login");
      }
    );
  }

  redirect() {
    this.router.navigate(["/home"]);
  }

  setToken(token: string) {
    this.auth.setToken(token);
  }
}
