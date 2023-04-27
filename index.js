window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}






let players = ['x', 'o'];
let activePlayer = 0;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];




function startGame () {
    // alert(`Первым ходит игрок ${activePlayer + 1}`);

    let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
    ];
    
    renderBoard(board);
    
  return;
}

function checkWinner (win) {
  showWinner(win);
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
      ];
return; 
}

function checkDiag (i) {
  const diag1 = [board[0][0], board[1][1], board[2][2]],
        diag2 = [board[0][2], board[1][1], board[2][0]];
        if ((diag1[0] && diag1[1] && diag1[2]) || (diag2[0] && diag2[1] && diag2[2]) == players[i]) {
          checkWinner(i);
        }
}

function checkVertical (i) {
  const vertical1 = [board[0][0], board[1][0], board[2][0]],
        vertical2 = [board[0][1], board[1][1], board[2][1]],
        vertical3 = [board[0][2], board[1][2], board[2][2]];

        if ((vertical1[0] && vertical1[1] && vertical1[2]) == players[i]) {
           checkWinner(i);
        } else if ((vertical2[0] && vertical2[1] && vertical2[2]) == players[i]) {
          checkWinner(i);
        } else if ((vertical3[0] && vertical3[1] && vertical3[2]) == players[i]) {
           checkWinner(i);
        }
}

function checkHorizontal (i) {
  const horizontal1 = [board[0][0], board[0][1], board[0][2]],
        horizontal2 = [board[1][0], board[1][1], board[1][1]],
        horizontal3 = [board[2][0], board[2][1], board[2][2]];

        if ((horizontal1[0] && horizontal1[1] && horizontal1[2]) == players[i]) {
           checkWinner(i);
        } else if ((horizontal2[0] && horizontal2[1] && horizontal2[2]) == players[i]) {
           checkWinner(i);
        } else if ((horizontal3[0] && horizontal3[1] && horizontal3[2]) == players[i]) {
          checkWinner(i);
        }
}


function click(row, col) {

      
    for (let i = 0; i < board.length; i++){

        if(activePlayer == 0) {
            
            board[row][col] = players[0];
            renderBoard(board);
            
                if(checkDiag(0) == true ){
                 checkDiag(0);
                }else if (checkVertical(0) == true) {
                   checkVertical(0);
                } else if (checkHorizontal(0) == true) {
                  checkHorizontal(0);
                } 
                else {
                    ++activePlayer;
                }

           } else {
              board[row][col] = players[1];
              renderBoard(board);
              if(checkDiag(1) == true){
                checkDiag(1);
                } else if (checkVertical(1) == true) {
                   checkVertical(1);
                } else if (checkHorizontal(1) == true) {
                   checkHorizontal(1);
                } 
                 else {
                    --activePlayer;
                }

              
           }
    }
    
}

// 1. Преобразовать массив к обычному виду;
// 2. Расписать выигрышные комбинации
// 3. Через цикл фор перебирать массив, где i - это порядковый номер, т.е, в случае с перебором по диагонали, i будет увеличиваться каждый перебор на 3, тем самым захватив позиции: 0,3,6
// 4. В случае с вертикалью : i = -. хуйня...