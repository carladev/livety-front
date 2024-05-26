import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() isHandset?: boolean | null;
  @Output() logout = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      title: 'Habitos',
      icon: 'list',
      link: '/habits',
    },
    {
      title: 'Nuevo habito',
      icon: 'add',
      link: '/new-habit',
    },
    {
      title: 'Seguimiento',
      icon: 'equalizer',
      link: '/tracking',
    },
    {
      title: 'Configuración',
      icon: 'settings',
      link: '/settings',
    },
  ];
}
