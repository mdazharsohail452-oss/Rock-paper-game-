let userScore = 0;
let compScore = 0;
let roundCount = 0;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const body = document.body;

// Create and add New Game button
const newGameBtn = document.createElement("button");
newGameBtn.innerText = "New Game";
newGameBtn.id = "new-game-btn";
newGameBtn.style.display = "none";
newGameBtn.style.marginTop = "2rem";
newGameBtn.style.padding = "0.8rem 1.5rem";
newGameBtn.style.fontSize = "1.2rem";
newGameBtn.style.backgroundColor = "#47d492";
newGameBtn.style.color = "#081b31";
newGameBtn.style.border = "none";
newGameBtn.style.borderRadius = "0.5rem";
newGameBtn.style.cursor = "pointer";
newGameBtn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
document.body.appendChild(newGameBtn);

// Hover effect
newGameBtn.addEventListener("mouseenter", () => {
  newGameBtn.style.backgroundColor = "#36b882";
});
newGameBtn.addEventListener("mouseleave", () => {
  newGameBtn.style.backgroundColor = "#47d492";
});

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const endGame = () => {
  // for  Disabling  choices after end of a game
  choices.forEach(choice => {
    choice.style.pointerEvents = "none";
  });

  // Show result
  if (userScore > compScore) {
    msg.innerText = "🎉 You won the Best of 5!";
    msg.style.backgroundColor = "green";
  } else if (compScore > userScore) {
    msg.innerText = "💻 Computer wins the Best of 5!";
    msg.style.backgroundColor = "red";
  } else {
    msg.innerText = " It's a tie!";
    msg.style.backgroundColor = "#081b31";
  }

  newGameBtn.style.display = "inline-block";
};

const showWinner = (userWin, userChoice, compChoice) => {
  const userChoiceDiv = document.getElementById(userChoice);
  const compChoiceDiv = document.getElementById(compChoice);

  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    body.classList.add("winner-flash");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    body.classList.add("loser-flash");
  }

  userChoiceDiv.classList.add("clicked");
  compChoiceDiv.classList.add("clicked");

  setTimeout(() => {
    userChoiceDiv.classList.remove("clicked");
    compChoiceDiv.classList.remove("clicked");
    body.classList.remove("winner-flash", "loser-flash");
  }, 400);
};

const playGame = (userChoice) => {
  if (roundCount >= maxRounds) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  roundCount++;

  if (roundCount === maxRounds) {
    endGame();
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

newGameBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  roundCount = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  newGameBtn.style.display = "none";

  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
  });
});
