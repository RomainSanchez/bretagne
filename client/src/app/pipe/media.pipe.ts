import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'media'
})
export class MediaPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(this.urlToMedia(value));
  }

  private urlToMedia(url: string): string {
    if (this.isVideo(url)) {
      return url;
    }

    return `<img src="${url}" alt="Smiley face" height="200" width="300">`;
  }

  private isVideo(url: string): boolean {
    return url.indexOf('youtu') !== -1;
  }
}
