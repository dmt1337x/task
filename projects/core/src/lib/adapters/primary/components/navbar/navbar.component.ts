import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() showSearch: boolean = false;
  @Input() showBack: boolean = true;
  @Input() count: number = 0;
  @Input() summaryTitle: string = '';
  @Output() searchValueEvent: EventEmitter<string> = new EventEmitter<string>();

  private readonly _onDestroy$ = new Subject<void>();
  private _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  readonly search$ = this._searchSubject.asObservable();

  readonly searchForm: FormGroup = new FormGroup({ search: new FormControl() });

  constructor(private _location: Location) {}

  ngOnInit(): void {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(takeUntil(this._onDestroy$))
      .subscribe((search: string) => {
        this.searchValueEvent.emit(search);
        this._searchSubject.next(search);
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  goBack(): void {
    this._location.back();
  }

  resetSearch(): void {
    this.searchForm.patchValue({ search: '' });
  }
}
