
let board;

function Gameboard() {
  const rows = 3;
  const columns = 3;
  board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };

  return { getBoard, /* dropToken, */ printBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`
    );
    // board.dropToken(column, getActivePlayer().token);

    /* This is where we would check for a winner and handle that logic,
       such as a win message. */

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard
  };
}



const opbtn = document.querySelector(".btn");

const sdia = document.querySelector(".dia");

const sbmt = document.querySelector(".submit");

const pone = document.querySelector("#textone");

const ptwo = document.querySelector("#texttwo");

const anone = document.querySelector(".anon1");

const antwo = document.querySelector(".anon2");

const resta = document.querySelector(".rstrt");

const anos = document.querySelector(".announce");

anos.style.fontSize = "20px";

const playerTurnDiv = document.querySelector('.turn');


opbtn.addEventListener("click", function() {

sdia.showModal();
});

let nameone;

let nametwo;

sbmt.addEventListener("click", function(event) {



   nameone = pone.value;

  nametwo = ptwo.value;

  anone.textContent += nameone;

  antwo.textContent += nametwo;

  playerTurnDiv.textContent = `${nameone}'s turn...`

  sdia.close();

});


/*let cellButtons = [];*/



function ScreenController() {
  const game = GameController();
  /*const playerTurnDiv = document.querySelector('.turn');*/
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    // Clear the board
    boardDiv.textContent = "";

    // Get the latest board and active player
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    

    // Display the current player's turn

    /*if (nameone === "") {*/
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
/*  }*/

 /* else (nameone !== "") {
    playerTurnDiv.textContent = `${nameone}'s turn...`
  }*/

    // Render board cells
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
     

        cellButton.id = rowIndex;

        cellButton.dataset.column = columnIndex;

      /* cellButton.textContent = cell.getValue(); // Display cell value*/
      cellButton.style.fontSize = "50px"
        boardDiv.appendChild(cellButton);

//Add each cellButton to the global array
      /*  cellButtons.push(cellButton);*/

        resta.addEventListener('click', () => {
     cellButton.textContent = "";

     anone.textContent = "Player 1: ";

     antwo.textContent = "Player 2: ";

     anos.textContent = "";

      activePlayer.name = "Player One"

     playerTurnDiv.textContent = "Player One's turn..."

     pone.value = "";

     ptwo.value = "";
    

        });


        cellButton.addEventListener('click', () => {

          const namone = pone.value;

          const namtwo = ptwo.value;

          const topLeftCell = document.querySelector('.cell[id="0"][data-column="0"]');

          const topCenterCell = document.querySelector('.cell[id="0"][data-column="1"]');

          const topRightCell = document.querySelector('.cell[id="0"][data-column="2"]');

          const centerLeftCell = document.querySelector('.cell[id="1"][data-column="0"]');

          const centerCenterCell = document.querySelector('.cell[id="1"][data-column="1"]');

          const centerRightCell = document.querySelector('.cell[id="1"][data-column="2"]');

          const bottomLeftCell = document.querySelector('.cell[id="2"][data-column="0"]');

          const bottomCenterCell = document.querySelector('.cell[id="2"][data-column="1"]');

          const bottomRightCell = document.querySelector('.cell[id="2"][data-column="2"]');


     const firstname = `${namone} WON THE GAME!`;

     const secondname = `${namtwo} WON THE GAME!`;

       if (activePlayer.name === "Player One" && cellButton.textContent === "" && namone !== "" && anos.textContent === ""  ) {
        cellButton.textContent = "X";
        activePlayer.name = "Player Two";

        playerTurnDiv.textContent = `${namtwo}'s turn...`;
      
       }

       else if (activePlayer.name === "Player Two" && cellButton.textContent === "" && namtwo !== ""  && anos.textContent === "") {
        cellButton.textContent = "O";
        activePlayer.name = "Player One";

        playerTurnDiv.textContent = `${namone}'s turn...`;
      
      
       }

       else if (activePlayer.name === "Player One" && cellButton.textContent === "" && namone === ""  && anos.textContent === "" ) {
        cellButton.textContent = "X";
       
        activePlayer.name = "Player Two";

        playerTurnDiv.textContent = "Player Two's turn...";
      
      
      
       }

       else if (activePlayer.name === "Player Two" && cellButton.textContent === "" && namtwo === ""  && anos.textContent === "") {
        cellButton.textContent = "O";
        activePlayer.name = "Player One";

        playerTurnDiv.textContent = 
        "Player One's turn...";
      

       }

      
       else {}

       // WINNING/TIE CONDITION

       //Player One

       if ( 

        anone.textContent === "Player 1: " && 

        (

        topLeftCell.textContent === "X" && 
        topCenterCell.textContent === "X" && 
        topRightCell.textContent === "X" ||

        centerLeftCell.textContent === "X" &&
        centerCenterCell.textContent === "X" &&
        centerRightCell.textContent === "X" ||

        bottomLeftCell.textContent === "X" &&
        bottomCenterCell.textContent === "X" &&
        bottomRightCell.textContent === "X" ||

        topLeftCell.textContent === "X" &&
        centerLeftCell.textContent === "X" &&
        bottomLeftCell.textContent === "X" ||

        topCenterCell.textContent === "X" &&

        centerCenterCell.textContent === "X" &&

        bottomCenterCell.textContent === "X" ||

        topRightCell.textContent  === "X" &&
        
        centerRightCell.textContent === "X" &&

        bottomRightCell.textContent === "X" ||

        topLeftCell.textContent === "X" &&
        centerCenterCell.textContent === "X" &&
        bottomRightCell.textContent === "X" ||

        bottomLeftCell.textContent === "X" &&
        centerCenterCell.textContent === "X" &&
        topRightCell.textContent === "X"
        
      )

       )
          
        { anos.textContent =  "PLAYER ONE WON THE GAME!" } 


       //Player One with input entry

       else if ( 

        anone.textContent !== "Player 1: "  && 


        ( 
          topLeftCell.textContent === "X" && 
          topCenterCell.textContent === "X" && 
          topRightCell.textContent === "X" || 
          centerLeftCell.textContent === "X" &&
          centerCenterCell.textContent === "X" &&
          centerRightCell.textContent === "X" || 
          bottomLeftCell.textContent === "X" &&
          bottomCenterCell.textContent === "X" &&
          bottomRightCell.textContent === "X" || 
          topLeftCell.textContent === "X" &&
          centerLeftCell.textContent === "X" &&
          bottomLeftCell.textContent === "X" || 
          topCenterCell.textContent === "X" &&
          centerCenterCell.textContent === "X" &&
          bottomCenterCell.textContent === "X" || 
          topRightCell.textContent  === "X" &&
          centerRightCell.textContent === "X" &&
          bottomRightCell.textContent === "X" || 
          topLeftCell.textContent === "X" &&
          centerCenterCell.textContent === "X" &&
          bottomRightCell.textContent === "X" || 
          bottomLeftCell.textContent === "X" &&
          centerCenterCell.textContent === "X" &&
          topRightCell.textContent === "X" 
        ) 
      ) 

       { anos.textContent = `${pone.value} WON THE GAME!`
      
      console.log(pone.value);

   
      
      } 

  
          
       

       

        //Player Two
      
      else if (

        antwo.textContent === "Player 2: "  &&

        (
         
        topLeftCell.textContent === "O" && 
        topCenterCell.textContent === "O" && 
        topRightCell.textContent === "O" ||

        centerLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        centerRightCell.textContent === "O" ||

        bottomLeftCell.textContent === "O" &&
        bottomCenterCell.textContent === "O" &&
        bottomRightCell.textContent === "O" ||

        topLeftCell.textContent === "O" &&
        centerLeftCell.textContent === "O" &&
        bottomLeftCell.textContent === "O" ||

        topCenterCell.textContent === "O" &&

        centerCenterCell.textContent === "O" &&

        bottomCenterCell.textContent === "O" ||

        topRightCell.textContent  === "O" &&
        
        centerRightCell.textContent === "O" &&

        bottomRightCell.textContent === "O" ||

        topLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        bottomRightCell.textContent === "O" ||

        bottomLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        topRightCell.textContent === "O"

      )

      )


      
       { 
        
        anos.textContent =  "PLAYER TWO WON THE GAME!";
     
       }

            //Player Two with input entry
      
      else if (

        antwo.textContent !== "Player 2: " &&

        (

        topLeftCell.textContent === "O" && 
        topCenterCell.textContent === "O" && 
        topRightCell.textContent === "O" ||

        centerLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        centerRightCell.textContent === "O" ||

        bottomLeftCell.textContent === "O" &&
        bottomCenterCell.textContent === "O" &&
        bottomRightCell.textContent === "O" ||

        topLeftCell.textContent === "O" &&
        centerLeftCell.textContent === "O" &&
        bottomLeftCell.textContent === "O" ||

        topCenterCell.textContent === "O" &&

        centerCenterCell.textContent === "O" &&

        bottomCenterCell.textContent === "O" ||

        topRightCell.textContent  === "O" &&
        
        centerRightCell.textContent === "O" &&

        bottomRightCell.textContent === "O" ||

        topLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        bottomRightCell.textContent === "O" ||

        bottomLeftCell.textContent === "O" &&
        centerCenterCell.textContent === "O" &&
        topRightCell.textContent === "O"

      )

      )

       { 
        
        anos.textContent =  `${ptwo.value} WON THE GAME!`;
     
       }

       //TIE

       else if (
        
          (topLeftCell.textContent === "X" || topLeftCell.textContent === "O") &&
          (topCenterCell.textContent === "X" || topCenterCell.textContent === "O") &&
          (topRightCell.textContent === "X" || topRightCell.textContent === "O") &&
          (centerLeftCell.textContent === "X" || centerLeftCell.textContent === "O") &&
          (centerCenterCell.textContent === "X" || centerCenterCell.textContent === "O") &&
          (centerRightCell.textContent === "X" || centerRightCell.textContent === "O") &&
          (bottomLeftCell.textContent === "X" || bottomLeftCell.textContent === "O") &&
          (bottomCenterCell.textContent === "X" || bottomCenterCell.textContent === "O") &&
          (bottomRightCell.textContent === "X" || bottomRightCell.textContent === "O")
       
  

       )

       {  anos.textContent =  "THE GAME IS A TIE!"; }

        });


      
    });
  });

 
  
  };


  updateScreen();
}

ScreenController();

