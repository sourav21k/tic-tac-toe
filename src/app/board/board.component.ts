import { Component, QueryList, ViewChildren } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { Movement } from '../models/movement';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @ViewChildren(BoxComponent) private boxes !: QueryList<BoxComponent>;
  movementHistory: Movement[] = [];
  currentPlayer: string = 'X';
  hasGameFinished: boolean = false;
  finishedAsDraw: boolean = false;
  
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  handleSquareClick(squareNumber: number) {
    let square : any = this.getSquare(squareNumber);
    this.movementHistory.push({
      player: this.currentPlayer,
      squareNumber: square.squareNumber
    });

    square.text = this.currentPlayer;
    square.enabled = false;

    if (this.hasCurrentPlayerWon()) {
      this.hasGameFinished = true;
      this.disableAllSquares();
    } else if (this.hasDrawHappend()) {
      this.finishedAsDraw = true;
    } else {
      this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
    }
  }

  restart() {
    this.hasGameFinished = false;
    this.finishedAsDraw = false;
    this.currentPlayer = 'X';
    this.movementHistory = [];
    this.boxes.forEach((square) => {
      square.text = '';
      square.enabled = true;
    })
  }

  getMovementsFromPlayer(playerName: string) {
    return this.movementHistory.filter((movement) => movement.player === playerName);
  }

  private getSquare(squareNumber: number): any {
    return this.boxes.find((square) => square.squareNumber == squareNumber);
  }

  private hasCurrentPlayerWon(): boolean {
    const currentPlayerMovements = this.movementHistory.filter((move) => move.player === this.currentPlayer);

    for (let i = 0; i < this.winningCombinations.length; i++) {
      const [a, b, c] = this.winningCombinations[i];
      const matchingMovements = currentPlayerMovements.filter((move) =>
        move.squareNumber === a ||
        move.squareNumber === b ||
        move.squareNumber === c);

      if (matchingMovements.length === 3) {
        return true;
      }
    }

    return false;
  }

  private hasDrawHappend() {
    return this.movementHistory.length === 9;
  }

  private disableAllSquares() {
    this.boxes.forEach((square) => {
      square.enabled = false;
    });
  }
}
