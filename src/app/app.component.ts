import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('dlg', { read: ElementRef, static: true })
  dlgRef: ElementRef<HTMLDialogElement>;

  handleClose(ev: Event) {
    const dlg = this.dlgRef.nativeElement;
    /** racket notation bcs it doesnt compile otherwise in SB */
    const returnValue = dlg['returnValue'];
    if (returnValue === 'submit') {
      const form = dlg.getElementsByTagName('form')[0];
      console.log(fdtoObject(new FormData(form)));
    }
  }
}

function fdtoObject(fd: FormData) {
  const result = {};
  Array.from(fd['entries']()).forEach(([key, value]) => {
    if (key.includes('.')) {
      key.split('.').reduce((r, key, i, a) => {
        if (i === a.length - 1) {
          r[key] = value;
        } else {
          r[key] = r[key] ?? {};
          return r[key];
        }
        return r;
      }, result);
    } else {
      result[key] = value;
    }
  });
  return result;
}
