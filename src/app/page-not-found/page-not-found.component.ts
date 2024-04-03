import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

timer = 15;

constructor(private router: Router) { setInterval(()=> { this.tickDown() }, 1000); }

tickDown() {
    if (this.timer != 0) 
    {
        this.timer -= 1;
    }
    else
    {
        this.returnToHome();
    }
}

returnToHome() {
    this.router.navigate(['/welcome']);
}

}