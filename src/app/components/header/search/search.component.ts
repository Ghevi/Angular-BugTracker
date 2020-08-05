import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  showError = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(type: string, value: string) {
    // console.log(`type: ${type}`, `value: ${value}`);
    if (!(value === null || value.length === 0)) {
      this.router.navigateByUrl(`/search/${type}/${value}`);
    } else {
      this.showError = !this.showError;
      setTimeout(() => {
        this.showError = !this.showError;
      }, 2500);
    }
  }
}
