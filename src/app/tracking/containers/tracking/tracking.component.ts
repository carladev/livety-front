import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { format, getISOWeek, getISOWeeksInYear } from 'date-fns';
import { LoadingService } from '../../../shared/loading/services/loading.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  weeklyData: any[] = [];
  monthlyData: any[] = [];

  todayWeekNumber = getISOWeek(new Date());
  todayMonthNumber = new Date().getMonth() + 1;
  weekForm: FormGroup;
  monthForm: FormGroup;
  currentYear = new Date().getFullYear();
  weeksArray: number[] = [];
  monthsArray: any[] = [];

  // options del heatmap
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '% de exito en el registro de habitos';
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
    this.weekForm = this.generateweeksForm(this.todayWeekNumber);
    this.monthForm = this.generatemonthsForm(this.todayMonthNumber);
  }

  ngOnInit(): void {
    this.loading.open();
    this.getWeeklyData(this.todayWeekNumber);
    this.weeksArray = this.getWeeksArray(this.currentYear);
    this.monthsArray = this.getMonthsArray(this.currentYear);
    this.loading.close();
    this.getMonthlyData(this.todayMonthNumber);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateweeksForm(todayWeekNumber: number): FormGroup {
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

  private generatemonthsForm(todayMonthNumber: number): FormGroup {
    const form = this.fb.group({
      monthNumber: [todayMonthNumber],
    });

    form
      .get('monthNumber')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((monthNumber) => {
        if (monthNumber !== null) {
          this.getMonthlyData(monthNumber);
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

      return this.weeklyData;
    });
  }
  private getMonthlyData(monthNumber: number): any {
    this.trackingService.getMonthlyTracking(monthNumber).subscribe((data) => {
      this.monthlyData = data.map((monthdayHabit) => ({
        name: monthdayHabit.monthdayNumber,
        series: monthdayHabit.habits.map((habit: any) => ({
          name: habit.icon,
          value: Number(habit.progress),
        })),
      }));

      return this.monthlyData;
    });
  }

  private getWeeksArray(year: number): number[] {
    const totalWeeks = getISOWeeksInYear(new Date(year, 0, 1));
    return Array.from({ length: totalWeeks }, (_, i) => i + 1);
  }

  private getMonthsArray(year: number) {
    for (let i = 1; i <= 12; i++) {
      const monthName = format(new Date(year, i - 1, 1), 'MMMM');
      this.monthsArray.push({ name: monthName, number: i });
    }
    return this.monthsArray;
  }
}
