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
    component: LayoutComponent,
    children: [
      {
        path: 'habits',
        component: HabitsComponent,
      },
      {
        path: 'new-habit',
        component: HabitComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
