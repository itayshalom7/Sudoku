var board = [];
var original = [];
var gameboard = [];
var chosenButton = [];

/////////////////////////////////////////////////
////////////////LOGIN////////////////////////////
/////////////////////////////////////////////////
const login = () => {
  let username = document.getElementById("Username").value;
  let pass = document.getElementById("Password").value;

  if (username == "abcd" && pass == "1234") {
    window.alert("Welcome");
    document.getElementById("loginPage").style.visibility = "hidden";
    document.getElementById("hardnessPage").style.visibility = "visible";
  } else window.alert("Invailed Username/Passwod");
};

/////////////////////////////////////////////////
///////////////PICK HARDNESS/////////////////////
/////////////////////////////////////////////////

const thePlayerChooseHardness = (hardness) => {
  board = createSuduko();
  let random = Math.floor(Math.random() * (100 - 1) + 1);
  for (let row = 0; row < 9; row++) {
    original[row] = [];
    for (let col = 0; col < 9; col++) {
      if (random < hardness) {
        original[row].push(board[row][col]);
      } else {
        original[row].push(0);
      }
      random = Math.floor(Math.random() * (100 - 1) + 1);
    }
  }
  copy();
  document.getElementById("hardnessPage").style.visibility = "hidden";
  document.getElementById("sudokuPage").style.visibility = "visible";
  showTheBoard();
};
/////////////////////////////////////////////////
////////////GENERATE EMPTY BOARD/////////////////
/////////////////////////////////////////////////

const emptySuduko = () => {
  let empty = [];
  for (let row = 0; row < 9; row++) {
    empty[row] = [];
    for (let col = 0; col < 9; col++) {
      empty[row][col] = 0;
    }
  }
  return empty;
};
/////////////////////////////////////////////////
////////////RANDOM NUMBER 1-9/////////////////
/////////////////////////////////////////////////

const getRandomNumber = () => {
  return Math.floor(Math.random() * (10 - 1) + 1);
};

/////////////////////////////////////////////////
////////////CHECK IF NUMBER IS RIGHT/////////////////
/////////////////////////////////////////////////

const checkCol = (sud, row, col, number) => {
  for (let i = 0; i < row; i++) {
    if (sud[i][col] == number) return false;
  }
  return true;
};

const checkRow = (sud, row, col, number) => {
  for (let i = 0; i < col; i++) {
    if (sud[row][i] == number) return false;
  }
  return true;
};

const check1To9in3x3this = (sud, row, col, number) => {
  let help1 = 0;
  let help2 = 0;
  if (row / 3 >= 2) help1 = 6;
  if (row / 3 < 2 && row / 3 >= 1) help1 = 3;
  if (col / 3 >= 2) help2 = 6;
  if (col / 3 < 2 && col / 3 >= 1) help2 = 3;

  for (let row3x3 = 0; row3x3 < 3; row3x3++) {
    for (let col3x3 = 0; col3x3 < 3; col3x3++) {
      if (sud[row3x3 + help1][col3x3 + help2] == number) {
        return false;
      }
    }
  }

  return true;
};

const checkAll = (sud, row, col, number) => {
  if (
    checkCol(sud, row, col, number) &&
    checkRow(sud, row, col, number) &&
    check1To9in3x3this(sud, row, col, number)
  ) {
    return true
  }
  else return false
}
/////////////////////////////////////////////////
/////////////BACKUP ORIGINAL BOARD///////////////
/////////////////////////////////////////////////

const copy = () => {
  for (let row = 0; row < 9; row++) {
    gameboard[row] = [];
    for (let col = 0; col < 9; col++) {
      gameboard[row][col] = original[row][col];
    }
  }
};

/////////////////////////////////////////////////
//////////////VICTORY CONDITIONS/////////////////
/////////////////////////////////////////////////

const checkIfFilled = () => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (gameboard[row][col] == 0) return false;
    }
  }
  return true;
};

// const checkIfWon = () => {
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (gameboard[row][col] != board[row][col]) return false;
//     }
//   }
//   return true;
// };

// const checkIfWon = () => {
//   return checkWin()
// };

const getArrysOfRows = () => {
  let rowsArry = []

  for (let counter = 0; counter < 9; counter++) {
    for (let col = 0; col < 9; col++) {
      rowsArry[counter] = (gameboard[counter][col])
    }
  }
  return rowsArry
}

const getArrysOfCols = () => {
  let rowsArry = []

  for (let counter = 0; counter < 9; counter++) {
    for (let row = 0; row < 9; row++) {
      rowsArry[counter] = (gameboard[row][counter])
    }
  }
  return rowsArry
}



const getTheArrays3x3 = () => {
  let arrysOf3x3 = []
  let counter = 0
  for (let counter1 = 0; counter1 < 9; counter1 += 3) {
    for (let counter2 = 0; counter2 < 9; counter2 += 3) {

      for (let row3x3 = 0; row3x3 < 3; row3x3++) {
        for (let col3x3 = 0; col3x3 < 3; col3x3++) {
          console.log(gameboard[row3x3 + counter1][col3x3 + counter2])
          arrysOf3x3[counter] = (gameboard[row3x3 + counter1][col3x3 + counter2])
        }
      }

      counter++
    }
  }
  return arrysOf3x3
}


const checkWin = () => {
  let demo = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let allArrys = [...getTheArrays3x3(), ...getArrysOfCols(), ...getArrysOfRows()]
  for (let i = 0; i < allArrys.length; i++) {

    const checking = allArrys.every(element => {
      return demo.includes(element);
    });
    if (!checking) {
      return false
    }
  }
  return true
}
/////////////////////////////////////////////////
////////////////////SUBMIT///////////////////////
/////////////////////////////////////////////////

const checkIfFilledUpCorrectly = () => {
  1
  if (!checkIfFilled()) {
    window.alert("Please fill up all the boxes in the suduko");
  } else {
    if (checkWin()) {
      window.alert("You Won! You are SMART! choose a different difficulty");
      options(1);
    } else {
      window.alert("The Suduku was filled incorrectly! try again");
    }
  }
};

/////////////////////////////////////////////////
//////////////RESET AND NEW BOARD/////////////////
/////////////////////////////////////////////////

const options = (status) => {
  if (status == 0) {
    copy();
    showTheBoard();
  }
  if (status == 1) {
    document.getElementById("sudokuPage").style.visibility = "hidden";
    document.getElementById("hardnessPage").style.visibility = "visible";
  }
};
/////////////////////////////////////////////////
//////////MARK NUMBER AND CHANGE/////////////////
/////////////////////////////////////////////////

const markIt = (row, col) => {
  if (chosenButton.length != 0) {
    document.getElementById(
      "td" + chosenButton[0] + chosenButton[1]
    ).style.backgroundColor = "transparent";
  }
  chosenButton = [row, col];
  document.getElementById("td" + row + col).style.backgroundColor =
    "rgba(53, 53, 53, 0.5)";
};

const setNumber = (num) => {
  if (chosenButton != 0) {
    document.getElementById(
      "td" + chosenButton[0] + chosenButton[1]
    ).innerHTML = num;
    document.getElementById(
      "td" + chosenButton[0] + chosenButton[1]
    ).style.backgroundColor = "transparent";
    gameboard[chosenButton[0]][chosenButton[1]] = num;
    chosenButton = [];
  }
};

/////////////////////////////////////////////////
/////////////GENERATE FULL BOARD/////////////////
/////////////////////////////////////////////////

const checkIf0 = (sud) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (sud[row][col] == 0) return createSuduko();
    }
  }
  return sud;
};

const createSuduko = () => {
  let sud = emptySuduko();
  let currentNumber;
  let advance = false;
  let count = 0;

  for (let row = 0; row < 9; row++) {
    for (col = 0; col < 9; col++) {
      if (getRandomNumber() > 0) {
        while (!advance) {
          currentNumber = getRandomNumber();
          if (
            checkAll(sud, row, col, currentNumber)) {
            sud[row][col] = currentNumber;
            advance = true;
          } else count++;
          if (count > 20) return checkIf0(sud);
        }
        count = 0;
      }
      advance = false;
    }
  }
  let res = checkIf0(sud);
  return res;
};
/////////////////////////////////////////////////
///////////LOAD THE GENERATED BOARD//////////////
/////////////////////////////////////////////////

const showTheBoard = () => {
  chosenButton = [];
  let table = document.getElementById("board");
  table.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    let tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      let td = document.createElement("td");
      if (gameboard[row][col] == 0) {
        td.id = "td" + row + col;
        td.onclick = () => {
          markIt(row, col);
        };
        td.innerHTML = "&nbsp;";
      } else {
        td.innerHTML = gameboard[row][col];
        td.style.fontWeight = "bold";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
};
