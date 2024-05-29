import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  weeklyData: any[] = [];
  view: [number, number] = [700, 300];
  todayWeekNumber = getISOWeek(new Date());
  weekForm: FormGroup;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Días de la semana';
  yAxisLabel: string = 'Hábitos';

  colorScheme: Color = {
    domain: ['#d00a0a', '#f3b619', '#DDC753', '#b3ce5e'],
  };

  private destroy$ = new Subject<void>();

  constructor(
    private trackingService: TrackingService,
    private fb: FormBuilder
  ) {
    this.weekForm = this.generateForm(this.todayWeekNumber);
  }

  ngOnInit(): void {
    this.getWeeklyData(this.todayWeekNumber).subscribe((res) => {
      this.weeklyData = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateForm(todayWeekNumber: number): FormGroup {
    const form = this.fb.group({
      weekNumber: [todayWeekNumber],
    });

    form.valueChanges
      .pipe(
        switchMap(() =>
          this.getWeeklyData(form.get('weekNumber')?.value || todayWeekNumber)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    return form;
  }

  private getWeeklyData(weekNumber: number): Observable<any[]> {
    return this.trackingService.getWeeklyTracking(weekNumber).pipe(
      tap((data) => {
        console.log(data);
        this.weeklyData = data.map((weekdayHabit) => {
          const habits = Array.isArray(weekdayHabit.habits)
            ? weekdayHabit.habits
            : [];
          return {
            name: weekdayHabit.weekdayName,
            series: habits.map((habit: any) => ({
              name: habit.habitName,
              value: Number(habit.progress) || 0,
            })),
          };
        });
        console.log(this.weeklyData);
      })
    );
  }
}
