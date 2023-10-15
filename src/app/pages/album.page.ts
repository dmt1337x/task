import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './album.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumPage {
}
