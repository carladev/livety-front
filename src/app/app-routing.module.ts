import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/containers/layout/layout.component';
import { HabitsComponent } from './habits/containers/habits/habits.component';
import { HabitComponent } from './habits/containers/habit/habit.component';
import { LoginComponent } from './login/containers/login/login.component';
import { NotFoundComponent } from './not-found/containers/not-found.component';
import { RegisterComponent } from './login/containers/register/register.component';
import { StartComponent } from './login/containers/start/start.component';
import { TrackingComponent } from './tracking/containers/tracking/tracking.component';

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
    title: 'Register',
    path: 'register',
    component: RegisterComponent,
  },
  {
    title: 'Start',
    path: 'start',
    component: StartComponent,
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
      {
        title: 'Seguimiento',
        path: 'tracking',
        component: TrackingComponent,
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
