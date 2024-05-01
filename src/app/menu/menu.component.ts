import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})

export class MenuComponent  {
  menuItems: { icon:string, title: string, link: string }[] = [

    {
      icon: 'home',
      title: 'Inicio',
      link: '/home'
    },
    { icon: 'search',
      title: 'Buscar',
      link: '/search'
    },
    { icon: 'add',
      title: 'Agregar',
      link: '/add'
    },
    {icon: 'favorite',
      title: 'Favoritos',
      link: '/favorite'
    }
  ];
}
