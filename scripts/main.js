// Cach
let boxes = document.querySelectorAll(".container .box"),
  count = 0,
  winnigConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  turn = "X",
  x = [],
  o = [],
  gameFinished = [];

//   To Make Sorting To All Arrays For The Winng Conditions
winnigConditions.forEach((winnigCondition) => {
  winnigCondition.sort();
});

boxes.forEach((box) => {
  //   To Set Data Count To All Boxes
  box.dataset.count = ++count;

  box.addEventListener("mouseenter", (e) => {
    //   Check If The Target Box Has Inner Html Or No By dataset Fill
    if (e.target.dataset.fill != "true") {
      // Set The Playing
      e.target.innerHTML = turn;
      //   Add Class Active
      e.target.classList.add("active");

      //   Remove The Play And Acitve Class If The Player Didn't Click On This Box On Mouse Leave
      box.addEventListener("mouseleave", (e) => {
        e.target.dataset.fill ? null : (e.target.innerHTML = "");
        e.target.classList.remove("active");
      });

      box.addEventListener("click", (e) => {
        //   Check If The Target Box Has No Inner Html
        if (e.target.dataset.fill != "true") {
          // Set Dataset Fill On This Box To Make The Player Connot Select On This Box Again
          e.target.dataset.fill = "true";

          //   To Make The Turn On Another Player
          e.target.innerHTML = turn;
          // Remove Class Active
          e.target.classList.remove();

          //   If The Turn Was For X Make It For O Else Make It For X
          turn == "X" ? (turn = "O") : (turn = "X");

          //   To Check If No Free Place End The Game And Make No Winner
          box.innerHTML != null ? gameFinished.push(true) : null;
          if (gameFinished.length >= 9) endGame("No Any Winner");

          isThereAWinner();
        }
      });
    }
  });
});

function isThereAWinner() {
  boxes.forEach((box) => {
    /* Check If This Data Count Not Exist On The X\O Array 
    To Make Check If He Is The Winner or Not */
    if (box.innerHTML === "X" && x.indexOf(+box.dataset.count) == -1)
      x.push(+box.dataset.count);
    else if (box.innerHTML === "O" && o.indexOf(+box.dataset.count) == -1)
      o.push(+box.dataset.count);
  });

  hasWinner(x, "X Is The Winner");
  hasWinner(o, "O Is The Winner");
}

function matchChecking(arr1, arr2) {
  // Make Sort On Winner Array
  arr1.sort();
  //   To Push The Player Array
  let lastArray = [];
  //   Loop To Check If The Player Array Like Winning Conditions Array Or No
  for (let i = 0; i < arr1.length; i++) {
    arr1[i] === arr2[i] ? lastArray.push(true) : null;
  }
  //   If The Player Count = 3 Return True Else Remove This Values To Push New Data Counts And Return False
  if (lastArray.length === 3) return true;
  else {
    lastArray.splice(0, lastArray.length);
    return false;
  }
}

function hasWinner(arr, winnerName) {
  // Check If Match Array Length = 3
  if (arr.length === 3) {
    //   Check If The Player Array Like Winning Conditions Array
    winnigConditions.forEach((winnigCondition) => {
      matchChecking(arr, winnigCondition) ? endGame(winnerName) : null;
    });
  } else if (arr.length > 3) {
    //   Else If The Player Array No Equal To 3

    arr.sort();
    // Remove Last Value To Make Check Again
    let lastValue = arr.pop();

    winnigConditions.forEach((winnigCondition) => {
      // If The Player Array Like Winning Conditions End The Game
      if (matchChecking(arr, winnigCondition)) endGame(winnerName);
      else {
        //   Return The Last Value
        arr.push(lastValue);
        // Remove First Value To Make Check Again
        arr.shift();

        winnigConditions.forEach((winnigCondition) => {
          matchChecking(arr, winnigCondition) ? endGame(winnerName) : null;
        });
      }
    });
  }
}

function endGame(whoIsTheWinner) {
  // Create End Game Section
  let endGameContainer = document.createElement("div"),
    endGame = document.createElement("div"),
    p = document.createElement("p"),
    winnerName = document.createTextNode(whoIsTheWinner),
    restartGame = document.createElement("button"),
    restartText = document.createTextNode("Restart Game");

  // End Game Section Style
  endGameContainer.style.cssText = `
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #6161e97a;
  display: grid;
  place-items: center;
`;

  endGame.style.cssText = `
    border: 2px solid black;
    padding: 15px 30px;
    text-align: center;
    `;

  p.style.cssText = `text-align: center;
  font-size: 30px;
  border: 2px solid black;
  background-color: white;
  padding: 5px 15px;`;

  restartGame.style.cssText = `
  padding: 5px 15px;
  margin-top: 6px;
  font-size: 18px;
  color: white;
  background-color: black;
  cursor: pointer;`;

  //   To Restart The Game On Click On Restart Button
  restartGame.onclick = () => window.location.reload();

  p.appendChild(winnerName);
  restartGame.appendChild(restartText);
  endGame.appendChild(p);
  endGame.appendChild(restartGame);
  endGameContainer.appendChild(endGame);

  document.body.appendChild(endGameContainer);
}
