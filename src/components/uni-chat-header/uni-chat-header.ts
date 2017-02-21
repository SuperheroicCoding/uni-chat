import {Component, Input, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'uni-chat-header',
  templateUrl: 'uni-chat-header.html'
})
export class UniChatHeaderComponent {

  @Input() title: string;

  constructor(private translate: TranslateService) {
  }


}
