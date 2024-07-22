import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MastermenuComponent } from "./mastermenu/mastermenu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MastermenuComponent]
})
export class AppComponent implements OnInit {
  title = 'corporategovernance';
  ngOnInit(): void {
    
  }
}
