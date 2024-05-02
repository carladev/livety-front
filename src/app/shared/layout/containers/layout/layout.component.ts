import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  opened = true;
  isHandset = true;
  breakpointObservable?: Subscription;
  routerObservable?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.breakpointObservable = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(res => {
        this.isHandset = res.matches;
        this.opened = !this.isHandset;
        this.cdr.markForCheck();
      });

    this.routerObservable = this.router.events.subscribe(() => {
      if (this.isHandset) {
        this.opened = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.breakpointObservable?.unsubscribe();
    this.routerObservable?.unsubscribe();
  }

  onToggleMenu(): void {
    this.opened = !this.opened;
    this.cdr.markForCheck();
  }

  onBack(): void {
    this.location.back();
  }

 
}
