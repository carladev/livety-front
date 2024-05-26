import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import moment from 'moment';
import * as echarts from 'echarts';
import { EChartsOption, HeatmapSeriesOption } from 'echarts';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  weeklyTracking = signal<any[]>([]);
  private destroyRef = inject(DestroyRef);

  weekForm: FormGroup;
  monthForm: FormGroup;
  yearForm: FormGroup;

  chartOption!: EChartsOption;

  constructor(
    private trackingService: TrackingService,
    private fb: FormBuilder
  ) {
    this.weekForm = this.fb.group({
      weekNumber: [moment().week()],
    });

    this.monthForm = this.fb.group({
      month: [new Date().toISOString().substring(0, 7)],
    });

    this.yearForm = this.fb.group({
      year: [new Date().getFullYear()],
    });
  }

  ngOnInit() {
    this.getWeeklyTracking().subscribe();

    this.weekForm.valueChanges
      .pipe(
        switchMap(() => this.getWeeklyTracking()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.renderChart();
  }

  ngOnDestroy() {
    // Clean up subscriptions or other resources here if needed
  }

  private getWeeklyTracking(): Observable<any[]> {
    return this.trackingService
      .getWeeklyTracking(
        20
        // this.weekForm.get('weekNumber')?.value || moment().week()
      )
      .pipe(
        tap((tracking: any[]) => {
          this.weeklyTracking.set(tracking);

          console.log('eeee', this.weeklyTracking);
          if (tracking.length) {
            this.chartOption = {
              title: {
                top: 30,
                left: 'center',
                text: tracking[0].weekNumber + ' Semana',
              },
              tooltip: {},
              visualMap: {
                min: 0,
                max: 10000,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65,
              },
              calendar: {
                top: 120,
                left: 30,
                right: 30,
                cellSize: ['auto', 13],
                range: '2016',
                itemStyle: {
                  borderWidth: 0.5,
                },
                yearLabel: { show: false },
              },
              series: [
                {
                  type: 'heatmap',
                  coordinateSystem: 'calendar',
                  data: this.getVirtualData(tracking),
                } as HeatmapSeriesOption,
              ],
            };
          } else {
            this.chartOption = {
              title: {
                top: 30,
                left: 'center',
                text: 'Sem registros',
              },
            };
          }
          this.renderChart();
        })
      );
  }

  private getVirtualData(trackingData: any[]) {
    const data: [string, number][] = [];
    trackingData.forEach((habit) => {
      const date = moment().day('Monday').isoWeek(habit.weekNumber);
      const dateString = date.format('YYYY-MM-DD');
      data.push([dateString, habit.weeklyRecord]);
    });
    return data;
  }

  private renderChart() {
    const chartDom = document.getElementById('heatmap-calendar')!;
    const myChart = echarts.init(chartDom);
    myChart.setOption(this.chartOption);
  }
}
