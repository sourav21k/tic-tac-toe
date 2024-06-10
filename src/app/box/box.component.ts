import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
  @Input('squareNumber') squareNumber: number = 0;
  @Input('text') text: string = '';
  @Input('enabled') enabled: boolean = true;
  @Output('onSquareClick') onSquareClick: EventEmitter<number> = new EventEmitter();

  

  handleClick() {
    this.onSquareClick.emit(this.squareNumber);
  }
}
