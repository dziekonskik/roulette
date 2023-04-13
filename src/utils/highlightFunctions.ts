import {
  highlightAdjecentFourBottom,
  highlightAdjecentFourTop,
  highlightAdjecentMinusTwo,
  highlightAdjecentMinusTwoAndZero,
  highlightAdjecentTwo,
  highlightAdjecentTwoAndZero,
  highlightColumn,
  highlightColumnAndZero,
  highlightCurrentAndNextColumn,
  highlightCurrentAndPreviousColumn,
  highlightPreviousFourBottom,
  highlightPreviousFourTop,
} from "./hoverHelpers";

export const handleHoverOnTop =
  (value: number, hoverLeft: boolean, hoverRight: boolean) =>
  (stateSetter: (newCells: number[]) => void) => {
    // value % 3 is a row number - 0 is row 1; 1 is row 3; 2 is row 2 - last parameter
    switch (value % 3) {
      case !hoverLeft && !hoverRight && 0:
        stateSetter(highlightColumn(value));
        break;
      case hoverLeft && value === 3 && 0:
        stateSetter(highlightColumnAndZero);
        break;
      case hoverLeft && value > 3 && 0:
        stateSetter(highlightCurrentAndPreviousColumn(value));
        break;
      case hoverRight && value < 36 && 0:
        stateSetter(highlightCurrentAndNextColumn(value));
        break;
      case !hoverLeft && !hoverRight && 1:
        stateSetter(highlightAdjecentTwo(value));
        break;
      case hoverLeft && value === 1 && 1:
        stateSetter(highlightAdjecentTwoAndZero(value));
        break;
      case hoverLeft && value > 1 && 1:
        stateSetter(highlightPreviousFourTop(value));
        break;
      case hoverRight && value < 34 && 1:
        stateSetter(highlightAdjecentFourTop(value));
        break;
      case !hoverLeft && !hoverRight && 2:
        stateSetter(highlightAdjecentTwo(value));
        break;
      case hoverLeft && value === 2 && 2:
        stateSetter(highlightAdjecentTwoAndZero(value));
        break;
      case hoverLeft && value > 2 && 2:
        stateSetter(highlightPreviousFourTop(value));
        break;
      case hoverRight && value < 35 && 2:
        stateSetter(highlightAdjecentFourTop(value));
        break;
      default:
        break;
    }
  };

export const handleHoverOnBottom =
  (value: number, hoverLeft: boolean, hoverRight: boolean) =>
  (stateSetter: (newCells: number[]) => void) => {
    switch (value % 3) {
      case !hoverLeft && !hoverRight && 0:
        stateSetter(highlightAdjecentMinusTwo(value));
        break;
      case hoverLeft && value === 3 && 0:
        stateSetter(highlightAdjecentMinusTwoAndZero(value));
        break;
      case hoverLeft && value > 3 && 0:
        stateSetter(highlightPreviousFourBottom(value));
        break;
      case hoverRight && value < 36 && 0:
        stateSetter(highlightAdjecentFourBottom(value));
        break;
      case !hoverLeft && !hoverRight && 2:
        stateSetter(highlightAdjecentMinusTwo(value));
        break;
      case hoverLeft && value === 2 && 2:
        stateSetter(highlightAdjecentMinusTwoAndZero(value));
        break;
      case hoverLeft && value > 2 && 2:
        stateSetter(highlightPreviousFourBottom(value));
        break;
      case hoverRight && value < 35 && 2:
        stateSetter(highlightAdjecentFourBottom(value));
        break;
      default:
        break;
    }
  };
