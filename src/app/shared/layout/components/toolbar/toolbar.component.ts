import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() isHandset?: boolean | null;
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() onBack = new EventEmitter<void>();

  title = '';
  navigateBackButton = false;
  mutationObserver?: MutationObserver;
  routerSubscription?: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const titleElement = this.document.querySelector('title');

    this.title = titleElement?.innerText ?? '';

    if (titleElement) {
      this.mutationObserver = new MutationObserver(mutations => {
        this.title = mutations?.[0].target.textContent ?? '';
        this.cdr.markForCheck();
      });

      this.mutationObserver.observe(titleElement, {
        subtree: true,
        characterData: true,
        childList: true
      });
    }

    this.routerSubscription = this.router.events.subscribe({
      next: event => {
        if (event instanceof NavigationEnd) {
          this.navigateBackButton = this.getDataBackButton();
          this.cdr.markForCheck();
        }
      },
      error: () => {
        this.navigateBackButton = false;
        this.cdr.markForCheck();
      }
    });

    this.navigateBackButton = this.getDataBackButton();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.mutationObserver?.disconnect();
  }

  private getDataBackButton(): boolean {
    let route = this.router.routerState.root as ActivatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return !!route.snapshot.data?.['backButton'];
  }
}
