import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { HabitsListComponent } from './habits/components/habits-list/habits-list.component';
import { HabitsComponent } from './habits/containers/habits/habits.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/layout/components/menu/menu.component';
import { ToolbarComponent } from './shared/layout/components/toolbar/toolbar.component';
import { LayoutComponent } from './shared/layout/containers/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotFoundComponent } from './not-found/containers/not-found.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/containers/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HabitComponent } from './habits/containers/habit/habit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { LoadingComponent } from './shared/loading/containers/loading/loading.component';
import { LoadingDialogComponent } from './shared/loading/containers/loading-dialog/loading-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/containers/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HabitsComponent,
    HabitComponent,
    HabitsListComponent,
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    ToolbarComponent,
    LoadingComponent,
    LoadingDialogComponent,
    ConfirmDialogComponent,
  ],

  providers: [
    provideNativeDateAdapter(),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  imports: [
    PickerComponent,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,

    RouterModule.forRoot([
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
    ]),
  ],
})
export class AppModule {}
