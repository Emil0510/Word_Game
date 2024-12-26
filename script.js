let wordList = [
  {
    word: "javascript",
    hint: "a versatile programming language",
  },
  {
    word: "piano",
    hint: "a popular musical instrument",
  },
  {
    word: "goal",
    hint: "an objective or target",
  },
  {
    word: "mars",
    hint: "red planet of our solar system",
  },
  {
    word: "platinum",
    hint: "a precious silvery-white metal",
  },
  {
    word: "amazon",
    hint: "an online shopping platform",
  },
  {
    word: "swift",
    hint: "programming language for Apple development",
  },
  {
    word: "algorithm",
    hint: "a step-by-step computational process",
  },
  {
    word: "inception",
    hint: "a mind-bending science fiction movie",
  },
  {
    word: "debug",
    hint: "to identify and remove errors",
  },
  {
    word: "interstellar",
    hint: "a movie about space exploration",
  },
  {
    word: "bmp",
    hint: "bitmap image file format",
  },
  {
    word: "psychology",
    hint: "study of the mind and behavior",
  },
  {
    word: "atlas",
    hint: "a collection of maps",
  },
  {
    word: "peninsula",
    hint: "land surrounded by water on three sides",
  },
  {
    word: "cricket",
    hint: "a popular outdoor game",
  },
  {
    word: "scrabble",
    hint: "a word-based indoor game",
  },
  {
    word: "telegram",
    hint: "a messaging platform",
  },
  {
    word: "bitbucket",
    hint: "version control platform",
  },
  {
    word: "tiff",
    hint: "an image file format",
  },
  {
    word: "bronze",
    hint: "a brownish metal alloy",
  },
  {
    word: "tablet",
    hint: "a handheld electronic device",
  },
  {
    word: "cpu",
    hint: "brain of the computer",
  },
  {
    word: "kotlin",
    hint: "programming language for Android",
  },
  {
    word: "bing",
    hint: "a search engine by Microsoft",
  },
  {
    word: "paris",
    hint: "city of lights",
  },
  {
    word: "word",
    hint: "Microsoft office software",
  },
  {
    word: "postgresql",
    hint: "an advanced database system",
  },
  {
    word: "bhutan",
    hint: "a small Himalayan kingdom",
  },
  {
    word: "drum",
    hint: "a percussion musical instrument",
  },
  {
    word: "blockchain",
    hint: "technology behind cryptocurrency",
  },
  {
    word: "newton",
    hint: "unit of force in physics",
  },
  {
    word: "jupiter",
    hint: "largest planet in our solar system",
  },
  {
    word: "firewall",
    hint: "a security system for networks",
  },
  {
    word: "chat",
    hint: "online text communication",
  },
  {
    word: "css",
    hint: "stylesheet language for web design",
  },
  {
    word: "oxygen",
    hint: "essential gas for life",
  },
  {
    word: "concept",
    hint: "an abstract idea",
  },
  {
    word: "router",
    hint: "device for network connection",
  },
  {
    word: "webp",
    hint: "modern image file format",
  },
  {
    word: "pdf",
    hint: "a document file format",
  },
  {
    word: "explore",
    hint: "to travel or investigate",
  },
  {
    word: "lock",
    hint: "device for securing something",
  },
  {
    word: "canada",
    hint: "a country in North America",
  },
  {
    word: "thanos",
    hint: "a fictional character from a movie",
  },
  {
    word: "tokyo",
    hint: "capital city of Japan",
  },
  {
    word: "snapshot",
    hint: "a quick photograph",
  },
  {
    word: "amazon",
    hint: "largest river in South America",
  },
  {
    word: "snow",
    hint: "frozen water crystals falling from the sky",
  },
];

let start = document.querySelector(".start");
let timer = document.querySelector(".timer");
let timeContainer = document.querySelector(".time");
let score = document.querySelector(".scoreNum");
let keys = document.querySelectorAll(".keys>input");
let nextWord = document.querySelector(".next_word");
let hintButton = document.querySelector(".hint");
let hintBox = document.querySelector(".hintBox");
let wordBoxes = document.querySelector("#word");
let selectedWord = "";
let selectedHint = "";
let wordNumber = 0;
let time;
let isGameStarted = false;

function changeScore(point) {
  score.innerHTML = Number(score.innerHTML) + point;
}

function checkBoxes() {
  let boxes = document.querySelectorAll(".miniBoxes");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

function resetKeys() {
  keys.forEach((e) => {
    e.style.backgroundColor = "aqua";
  });
}

function startTimer() {
  time = 30;
  let interval = setInterval(() => {
    if (!isGameStarted) {
      clearInterval(interval);
      return;
    }

    timeContainer.style.backgroundColor = "green";
    timer.innerHTML = " " + time;

    if (time === 0) {
      isGameStarted = false;
      timeContainer.style.backgroundColor = "red";
      clearInterval(interval);
      setTimeout(() => {
        alert("Time is up!");
      }, 1);
      nextWord.removeEventListener("click", goToNextWord);
      keys.forEach((element) => {
        element.removeEventListener("click", fillTheLetters);
      });
    }

    time--;
  }, 1000);
}

function createBoxes() {
  wordBoxes.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    let div = document.createElement("div");
    div.classList.add("miniBoxes");
    wordBoxes.appendChild(div);
  }
}

function onStartGame() {
  wordNumber = 0;
  selectedWord = wordList[wordNumber].word;
  selectedHint = wordList[wordNumber].hint;
  wordBoxes.style.backgroundColor = "rgba(197, 184, 184, 0)";
  wordBoxes.style.padding = "0px";
  wordBoxes.style.width = "40%";
  createBoxes();
}

function fillTheLetters(e) {
  let boxes = document.querySelectorAll(".miniBoxes");

  if (selectedWord.includes(e.target.value)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === e.target.value) {
        boxes[i].innerHTML = e.target.value;
        changeScore(10);
        e.target.style.backgroundColor = "green";
        if (checkBoxes()) {
          setTimeout(() => {
            goToNextWord();
            resetKeys();
          }, 1000);
        }
      }
    }
  } else {
    changeScore(-10);
    e.target.style.backgroundColor = "red";
  }
}

function onStartButton() {
  if (!isGameStarted) {
    isGameStarted = true;
    score.innerHTML = "0";
    resetKeys();
    onStartGame();
    startTimer();
    hintButton.addEventListener("click", showHint);
    nextWord.addEventListener("click", goToNextWord);

    keys.forEach((element) => {
      element.addEventListener("click", fillTheLetters);
    });
  }
}

start.addEventListener("click", onStartButton);

function goToNextWord() {
  if (isGameStarted) {
    wordNumber++;
    if (wordNumber < wordList.length) {
      selectedWord = wordList[wordNumber].word;
      selectedHint = wordList[wordNumber].hint;
      createBoxes();
      hintBox.style.display = "none";
    } else {
      alert("You've completed all words!");
      isGameStarted = false;
    }
    resetKeys();
  }
}

function showHint() {
  if (isGameStarted) {
    hintBox.style.display = "block";
    hintBox.innerHTML = "";
    let div = document.createElement("p");

    div.innerHTML = selectedHint;
    hintBox.appendChild(div);
  }
}

