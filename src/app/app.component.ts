import {Component} from '@angular/core';

export enum Shape {
  Empty = 'Empty',
  Cross = 'Cross',
  Circle = 'Circle'
}

export enum WinDirection {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
  Diagonal = 'Diagonal'
}

export enum WinLineNumber {
  First = 'First',
  Second = 'Second',
  Third = 'Third'
}

export enum WinState {
  Win = 'Win',
  Tie = 'Tie',
  Nothing = 'Nothing'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'morpio';

  public playerShape: Shape = Math.random() < 0.5 ? Shape.Circle : Shape.Cross;

  public tiles: ReadonlyArray<{ index: number, state: Shape }> = [
    {index: 0, state: Shape.Empty},
    {index: 1, state: Shape.Empty},
    {index: 2, state: Shape.Empty},
    {index: 3, state: Shape.Empty},
    {index: 4, state: Shape.Empty},
    {index: 5, state: Shape.Empty},
    {index: 6, state: Shape.Empty},
    {index: 7, state: Shape.Empty},
    {index: 8, state: Shape.Empty},
  ];

  public getIconFromTileState(tileState: Shape): string {
    if (tileState === Shape.Cross) {
      return 'close';
    } else if (tileState === Shape.Circle) {
      return 'panorama_fish_eye';
    }

  }

  public changeTileState(tileNumber: number): void {
    if (this.tiles[tileNumber].state === Shape.Empty) {
      if (this.playerShape === Shape.Circle) {
        this.tiles[tileNumber].state = Shape.Circle;
        this.playerShape = Shape.Cross;
      } else if (this.playerShape === Shape.Cross) {
        this.tiles[tileNumber].state = Shape.Cross;
        this.playerShape = Shape.Circle;
      }
    }
  }

  public get getWin(): { winState: WinState, winLineNumber: WinLineNumber, winDirection: WinDirection, winner: Shape } {
    const f = (i: number): Shape => this.tiles.find((el) => el.index === i).state;
    if ((f(0) === f(1)) && (f(1) === f(2)) && f(0) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Horizontal, winLineNumber: WinLineNumber.First, winner: f(0)};
    }
    if ((f(3) === f(4)) && (f(4) === f(5)) && f(3) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Horizontal, winLineNumber: WinLineNumber.Second, winner: f(3)};
    }
    if ((f(6) === f(7)) && (f(7) === f(8)) && f(6) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Horizontal, winLineNumber: WinLineNumber.Third, winner: f(6)};
    }
    if ((f(0) === f(3)) && (f(3) === f(6)) && f(0) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Vertical, winLineNumber: WinLineNumber.First, winner: f(0)};
    }
    if ((f(1) === f(4)) && (f(4) === f(7)) && f(1) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Vertical, winLineNumber: WinLineNumber.Second, winner: f(1)};
    }
    if ((f(2) === f(5)) && (f(5) === f(8)) && f(2) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Vertical, winLineNumber: WinLineNumber.Third, winner: f(2)};
    }
    if ((f(0) === f(4)) && (f(4) === f(8)) && f(0) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Diagonal, winLineNumber: WinLineNumber.First, winner: f(0)};
    }
    if ((f(2) === f(4)) && (f(4) === f(6)) && f(2) !== Shape.Empty) {
      return {winState: WinState.Win, winDirection: WinDirection.Diagonal, winLineNumber: WinLineNumber.Second, winner: f(2)};
    }
    if (!this.tiles.find((el) => el.state === Shape.Empty)) {
      return {winDirection: undefined, winLineNumber: undefined, winState: WinState.Tie, winner: undefined};
    } else {
      return {winDirection: undefined, winLineNumber: undefined, winState: WinState.Nothing, winner: undefined};
    }
  }

}
