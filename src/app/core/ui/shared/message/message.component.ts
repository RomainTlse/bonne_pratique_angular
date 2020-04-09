import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.styl']
})
export class MessageComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faWindowClose = faWindowClose;
  faExclamationTriangle = faExclamationTriangle;
  faInfoCircle = faInfoCircle;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
