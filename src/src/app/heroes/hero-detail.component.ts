import { switchMap } from 'rxjs/operators';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation } from '../animations';

import { Hero, HeroService }  from './hero.service';

@Component({
  template: `
  <h2>HEROES{{id}}</h2>
  <div *ngIf="hero$ | async as hero">
    <h3>"{{ hero.name }}"</h3>
    <div>
      <label>Id: </label>{{ hero.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes(hero)">Back</button>
    </p>
  </div>
  `,
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  hero$: Observable<Hero>;
id='12'
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')
        
        ))
        
    );


     this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.id='45'+params.get('id');
        return this.service.getHeroes();
      })
    );
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/