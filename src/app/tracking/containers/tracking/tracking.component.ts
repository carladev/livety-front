import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { getISOWeek, getISOWeeksInYear } from 'date-fns';
import { LoadingService } from '../../../shared/loading/services/loading.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  weeklyData: any[] = [];

  todayWeekNumber = getISOWeek(new Date());
  weekForm: FormGroup;
  currentYear = new Date().getFullYear();
  weeksArray: number[] = [];

  // options del heatmap
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mapa de calor de habitos';
  yAxisLabel: string = 'Hábitos';

  colorScheme: Color = {
    domain: ['#d00a0a', '#f3b619', '#DDC753', '#b3ce5e'],
  };

  private destroy$ = new Subject<void>();

  constructor(
    private trackingService: TrackingService,
    private fb: FormBuilder,
    private loading: LoadingService
  ) {
    this.weekForm = this.generateForm(this.todayWeekNumber);
  }

  ngOnInit(): void {
    this.loading.open();
    this.getWeeklyData(this.todayWeekNumber);
    this.weeksArray = this.getWeeksArray(this.currentYear);
    this.loading.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateForm(todayWeekNumber: number): FormGroup {
    const form = this.fb.group({
      weekNumber: [todayWeekNumber],
    });

    form
      .get('weekNumber')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((weekNumber) => {
        if (weekNumber !== null) {
          this.getWeeklyData(weekNumber);
        }
      });

    return form;
  }

  private getWeeklyData(weekNumber: number): any {
    this.trackingService.getWeeklyTracking(weekNumber).subscribe((data) => {
      this.weeklyData = data.map((weekdayHabit) => ({
        name: weekdayHabit.weekdayName,
        series: weekdayHabit.habits.map((habit: any) => ({
          name: habit.icon,
          value: Number(habit.progress),
        })),
      }));
      console.log(this.weeklyData);
      return this.weeklyData;
    });
  }
  private getWeeksArray(year: number): number[] {
    const totalWeeks = getISOWeeksInYear(new Date(year, 0, 1));
    return Array.from({ length: totalWeeks }, (_, i) => i + 1);
  }
}
