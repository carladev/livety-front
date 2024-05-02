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
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { HabitsListComponent } from './habits/components/habits-list/habits-list.component';
import { HabitsComponent } from './habits/containers/habits.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/layout/components/menu/menu.component';
import { ToolbarComponent } from './shared/layout/components/toolbar/toolbar.component';
import { LayoutComponent } from './shared/layout/containers/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotFoundComponent } from './not-found/containers/not-found.component';
import {  RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        HabitsComponent,
        HabitsListComponent,
        LayoutComponent,
        MenuComponent,
        NotFoundComponent,
        ToolbarComponent     
    ],

    providers: [
        provideNativeDateAdapter(),
        provideClientHydration(),
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
 
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
        MatTableModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule,
        RouterModule.forRoot([
          {
            path: '',
            component: LayoutComponent,
            children: [
              {
                path: 'habits',
                component: HabitsComponent
              },
              {
                path: '**',
                component: NotFoundComponent
              }
            ]
          },]),
    ]
})
export class AppModule {}
