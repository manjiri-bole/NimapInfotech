import { Component, OnInit, ViewChild } from '@angular/core';
import { SlideUpDownAnimation } from '../../../shared/animation/collapse-animate';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
export let MENU_ITEM = [];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SlideUpDownAnimation]
})

export class LoginComponent implements OnInit {
  public product: Observable<[]> = of([]);
  hide = true;
  animationState = 'down';

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.router.navigate(['/dashboard']);
  }

}




