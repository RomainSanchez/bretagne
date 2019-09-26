import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Location } from '../shared/sdk';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {

  constructor(
    @Optional() public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public location: Location) {
      console.log(location)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
