import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  @Output() close = new EventEmitter<void>();

  openDialog() {
    this.dialogRef.nativeElement.showModal();
  }

  closeDialog() {
    this.dialogRef.nativeElement.close();
    this.close.emit(); // Notify parent about the close event
  }
}