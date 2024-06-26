import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { format, getISOWeek, getISOWeeksInYear } from 'date-fns';
import { es } from 'date-fns/locale';
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
    name: 'colors',
    selectable: true,
    group: ScaleType.Linear,
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
    this.getWeeklyData(this.todayWeekNumber);
    this.weeksArray = this.getWeeksArray(this.currentYear);
    this.monthsArray = this.getMonthsArray(this.currentYear);
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
    this.loading.open();
    this.trackingService.getWeeklyTracking(weekNumber).subscribe((data) => {
      this.weeklyData = data.map((weekdayHabit) => ({
        name: weekdayHabit.weekdayName,
        series: weekdayHabit.habits.map((habit: any) => ({
          name: habit.icon + ' ' + habit.habitName,
          value: Number(habit.progress),
        })),
      }));
      this.loading.close();
      return this.weeklyData;
    });
  }
  private getMonthlyData(monthNumber: number): any {
    this.loading.open();
    this.trackingService.getMonthlyTracking(monthNumber).subscribe((data) => {
      this.monthlyData = data.map((monthdayHabit) => ({
        name: monthdayHabit.monthdayNumber,
        series: monthdayHabit.habits.map((habit: any) => ({
          name: habit.icon + ' ' + habit.habitName,
          value: Number(habit.progress),
        })),
      }));
      this.loading.close();
      return this.monthlyData;
    });
  }

  private getWeeksArray(year: number): number[] {
    const totalWeeks = getISOWeeksInYear(new Date(year, 0, 1));
    return Array.from({ length: totalWeeks }, (_, i) => i + 1);
  }

  private getMonthsArray(year: number) {
    this.monthsArray = [];
    for (let i = 1; i <= 12; i++) {
      const monthName = format(new Date(year, i - 1, 1), 'MMMM', {
        locale: es,
      });
      this.monthsArray.push({ name: monthName, number: i });
    }
    return this.monthsArray;
  }
}
