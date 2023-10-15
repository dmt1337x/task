import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosForSpecificUser, UserDetailsComponent } from '@user-albums';

@Component({
  templateUrl: './user-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserDetailsComponent, PhotosForSpecificUser],
})
export class UserDetailsPage {}
