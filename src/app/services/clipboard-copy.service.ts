import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Clipboard as MatClipboard } from "@angular/cdk/clipboard";

@Injectable({
  providedIn: 'any'
})
export class ClipboardCopyService {

  constructor(private clipboard: MatClipboard, private snackBar: MatSnackBar) { }

  copyShortText(shortText: string) {
    return this.clipboard.copy(shortText);
  }

  copyLongTextToClipboard(longText: string) {
    const pending = this.clipboard.beginCopy(longText);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        this.snackBar.open('Text Successfully Copied', '', {
          duration: 3000
        });
        return pending.destroy();
      }
    };
    attempt();
  }
}
