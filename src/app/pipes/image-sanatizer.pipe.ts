import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanatizer'
})
export class ImageSanatizerPipe implements PipeTransform {


  constructor(private domSanitizer: DomSanitizer){}

  transform(img: any): any {

    return this.domSanitizer.bypassSecurityTrustUrl(img);
  }

}
