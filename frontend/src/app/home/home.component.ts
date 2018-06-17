import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private user: any;
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {
    if (!Boolean(this.auth.getToken())) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.api.getUser(1).subscribe(response => {
      this.user = response;
    });
  }
}
