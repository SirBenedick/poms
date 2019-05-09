import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() orderId: String;
  @Input() dueDate: String;
  @Input() priority: String;

  constructor() { }

  ngOnInit() {
  }
  onCardClick(event) {
    console.log(event);
  }
}
