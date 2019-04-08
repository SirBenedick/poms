import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent {
  gutter = 16;
  count = 4;
  marksGutter = {
    8: 8,
    16: 16,
    24: 24,
    32: 32,
    40: 40,
    48: 48
  };
  marksCount = {
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    8: 8,
    12: 12
  };
}
