import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';


import { HeroService } from '../hero.service';
import { MessageService } from '../message.service'; // endy koldanylmaidy

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heroes: Hero[];
  // selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {}
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  // onSelect( hero: Hero ) {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  // }
  ngOnInit(): void {
    this.getHeroes();
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
}
