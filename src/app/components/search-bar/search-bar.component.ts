import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, startWith, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  filteredResultOptions: Observable<any>;

  constructor(private backendService: BackendService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    /** If within 300ms there has been no additional input the search is triggered */
    this.filteredResultOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      startWith(""),
      switchMap(searchValue =>
        this.backendService.getSearchResults(searchValue)
      )
    );
  }

  onOptionClicked(option) {
    console.log("Clicked: ", option);
  }
}
