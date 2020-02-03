import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Location } from '../shared/sdk';
import { ImageItem, YoutubeItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {
  items: any[];

  constructor(
    @Optional() public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public location: Location
  ) {}

  ngOnInit() {
    this.items = this.location.medias.map(media => {
      if (media.url.indexOf('youtu') !== -1) {
        const videoId = media.url.split('=')[1];

        return new YoutubeItem({ src: videoId });
      }

      return new ImageItem({
        src: media.url,
        thumb: media.url,
        title: media.name
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
