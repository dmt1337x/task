import { Directive, HostListener, Input } from '@angular/core';
import { EditUserDetailsModalComponent } from '../components/edit-user-details-modal/edit-user-details-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Directive({ selector: '[libEditDetails]', standalone: true })
export class EditDetailsDirective {
  @Input() libEditDetails: string = '';

  @HostListener('dblclick') onDoubleClick(): void {
    this.openModal();
  }

  constructor(private modalService: BsModalService) {}

  openModal(): void {
    const modalOptions = {
      initialState: {
        title: `Edit ${this.libEditDetails}`,
        closeBtnName: 'Close',
        saveBtnName: 'Save',
        propertyName: this.libEditDetails,
      },
    };

    this.modalService.show(EditUserDetailsModalComponent, modalOptions);
  }
}
