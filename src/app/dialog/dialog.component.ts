import { Component, Input, OnInit } from '@angular/core';
import { DialogInfo } from '../dialog-info';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() info!: DialogInfo;
  @Input() show!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.show = false;
  }

}
