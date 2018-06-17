import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private route: Router) {
    this.do();
    this.redirect();
  }

  ngOnInit() {}

  do() {
    this.auth.deleteToken();
  }

  redirect() {
    this.route.navigate(["/"]);
  }
}
