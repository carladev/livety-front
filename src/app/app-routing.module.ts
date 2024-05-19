import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/containers/layout/layout.component';
import { HabitsComponent } from './habits/containers/habits/habits.component';
import { HabitComponent } from './habits/containers/habit/habit.component';
import { LoginComponent } from './login/containers/login/login.component';
import { NotFoundComponent } from './not-found/containers/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    title: 'Iniciar sesión',
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        title: 'Habitos',
        path: 'habits',
        component: HabitsComponent,
      },
      {
        title: 'Nuevo habito',
        path: 'new-habit',
        component: HabitComponent,
      },
      {
        title: 'Editar habito',
        path: 'edit-habit/:habitId',
        component: HabitComponent,
      },
    ],
  },
  {
    title: 'Pagina no encontrada',
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
