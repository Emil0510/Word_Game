let wordList = [
  {
    word: "python",
    hint: "programming language",
  },
  {
    word: "guitar",
    hint: "a musical instrument",
  },
  {
    word: "aim",
    hint: "a purpose or intention",
  },
  {
    word: "venus",
    hint: "planet of our solar system",
  },
  {
    word: "gold",
    hint: "a yellow precious metal",
  },
  {
    word: "ebay",
    hint: "online shopping site",
  },
  {
    word: "golang",
    hint: "programming language",
  },
  {
    word: "coding",
    hint: "related to programming",
  },
  {
    word: "matrix",
    hint: "science fiction movie",
  },
  {
    word: "bugs",
    hint: "related to programming",
  },
  {
    word: "avatar",
    hint: "epic science fiction film",
  },
  {
    word: "gif",
    hint: "a file format for image",
  },
  {
    word: "mental",
    hint: "related to the mind",
  },
  {
    word: "map",
    hint: "diagram represent of an area",
  },
  {
    word: "island",
    hint: "land surrounded by water",
  },
  {
    word: "hockey",
    hint: "a famous outdoor game",
  },
  {
    word: "chess",
    hint: "related to a indoor game",
  },
  {
    word: "viber",
    hint: "a social media app",
  },
  {
    word: "github",
    hint: "code hosting platform",
  },
  {
    word: "png",
    hint: "a image file format",
  },
  {
    word: "silver",
    hint: "precious greyish-white metal",
  },
  {
    word: "mobile",
    hint: "an electronic device",
  },
  {
    word: "gpu",
    hint: "computer component",
  },
  {
    word: "java",
    hint: "programming language",
  },
  {
    word: "google",
    hint: "famous search engine",
  },
  {
    word: "venice",
    hint: "famous city of waters",
  },
  {
    word: "excel",
    hint: "microsoft product for windows",
  },
  {
    word: "mysql",
    hint: "a relational database system",
  },
  {
    word: "nepal",
    hint: "developing country name",
  },
  {
    word: "flute",
    hint: "a musical instrument",
  },
  {
    word: "crypto",
    hint: "related to cryptocurrency",
  },
  {
    word: "tesla",
    hint: "unit of magnetic flux density",
  },
  {
    word: "mars",
    hint: "planet of our solar system",
  },
  {
    word: "proxy",
    hint: "related to server application",
  },
  {
    word: "email",
    hint: "related to exchanging message",
  },
  {
    word: "html",
    hint: "markup language for the web",
  },
  {
    word: "air",
    hint: "related to a gas",
  },
  {
    word: "idea",
    hint: "a thought or suggestion",
  },
  {
    word: "server",
    hint: "related to computer or system",
  },
  {
    word: "svg",
    hint: "a vector image format",
  },
  {
    word: "jpeg",
    hint: "a image file format",
  },
  {
    word: "search",
    hint: "act to find something",
  },
  {
    word: "key",
    hint: "small piece of metal",
  },
  {
    word: "egypt",
    hint: "a country name",
  },
  {
    word: "joker",
    hint: "a popular psychological thriller film",
  },
  {
    word: "dubai",
    hint: "a developed country name",
  },
  {
    word: "photo",
    hint: "representation of person or scene",
  },
  {
    word: "nile",
    hint: "largest river in the world",
  },
  {
    word: "rain",
    hint: "drops of water come from sky",
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
let wordNumber;
let time;

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
  time = 3;
  let interval = setInterval(() => {
    timeContainer.style.backgroundColor = "green";
    timer.innerHTML = " " + time;

    if (time === 0) {
      timeContainer.style.backgroundColor = "red";
      clearInterval(interval);
      setTimeout(() => {
        alert("Time is up!");
      }, 1);
      start.nextWord.removeEventListener("click", goToNextWord);
      keys.forEach((element) => {
        element.removeEventListener(
          "click",
          fillTheLetters
        ); /*deyir remove'lanmaram ki remove'lanmaram :( */
      });
    }

    time--;
  }, 1000);
  start.addEventListener("click", () => {
    clearInterval(interval);
  });
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
  wordBoxes.style.backgroundColor = "rgb(197, 184, 184, 0)";
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
  score.innerHTML = "";
  resetKeys();
  onStartGame();
  startTimer();
  hintButton.addEventListener("click", showHint);
  nextWord.addEventListener("click", goToNextWord);

  keys.forEach((element) => {
    element.addEventListener("click", fillTheLetters);
  });
}
start.addEventListener("click", onStartButton);

function goToNextWord() {
  wordNumber++;
  if (wordNumber < wordList.length) {
    selectedWord = wordList[wordNumber].word;
    selectedHint = wordList[wordNumber].hint;
    createBoxes();
    hintBox.style.display = "none";
  } else {
    alert("You've completed all words!");
  }
  resetKeys();
}

function showHint() {
  hintBox.style.display = "block";
  hintBox.innerHTML = "";
  let div = document.createElement("p");

  div.innerHTML = selectedHint;
  hintBox.appendChild(div);
}
