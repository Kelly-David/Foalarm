import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  collapse: Boolean = true;
  service: any;
  foalDate320: any;
  foalDate340: any;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  /**
   * Calculate and set the expected foaling dates
   */
  getFoalingDates() {
    this.foalDate320 = new Date(this.service);
    this.foalDate320.setDate( this.foalDate320.getDate() + 320 );

    this.foalDate340 = new Date(this.service);
    this.foalDate340.setDate( this.foalDate340.getDate() + 340 );
  }

}
