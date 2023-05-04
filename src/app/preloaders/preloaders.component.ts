import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'preloaders',
  templateUrl: './preloaders.component.html',
  styleUrls: ['./preloaders.component.scss']
})
export class PreloadersComponent implements OnInit {
  @Input() condition: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
