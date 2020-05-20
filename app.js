const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".all-question-number");
const answerDescription = document.querySelector(".correct-answer-is");
const nextQuestionButton = document.querySelector(".next-question-btn");
const seeResultBtn = document.querySelector(".see-result-btn");
const correctAnswers = document.querySelector(".correct");
const runningTime = document.querySelector(".remaining-time");
// ene n html dotroosoo haichina .time-is-up-txt iig  yes yag tiim2
// aanh yag2
const timeUpTxt = document.querySelector(".time-is-up-txt");
const quizBox = document.querySelector(".quiz-box");
const quizHomeBox = document.querySelector(".signature-box");
const resultBox = document.querySelector(".quiz-result-box");
const retryAgain = document.querySelector(".retry-btn");
const mainMenu = document.querySelector(".main-menu-btn");
const socialMenu = document.querySelector("social-menu-btn");
const startQuizBtn = document.querySelector(".start-btn");
let attempt = 0;
let questionIndex = 0;
let myArray = [];
let score = 0;
let number = 0;
let interval;
// массив
myApp = [{
    question: "ОооШсн ; oh Fuck me <3 бүлгэмийн мисс нь хэн бэ?",
    options: ["Чинзоо", "Сайхнаа", "Пүүдээ"],
    answer: 0,
    description: "mongolian next top model чинзо <3",
  },
  {
    //1
    question: "Шатарт хүний хэдэн дүрс байдаг вэ?",
    options: ["20", "2", "3"],
    answer: 0,
    description: "нийт 20 дүрс байдаг",
  },
  {
    question: "ОооШсн ; oh Fuck me <3 бүлгэм хэдэн гишүүнтэй вэ?",
    options: ["179", "180", "181"],
    answer: 1,
    description: "Хамгийн сүүлд хархад 180 байсан",
  },
  {
    question: "Агаарын хэдэн хувийг О2 эзэлдэг вэ?",
    options: ["19.95%", "39.95%", "20.95%"],
    answer: 2,
  },
  {
    //1 and 3
    question: "Ихэнх сард 3? хоног байдаг. Мөн зарим сард 31 хоног байдаг. Тэгвэл хэдэн сард 28 хоног байдаг вэ?",
    options: ["2", "1", "12"],
    answer: 2,
    description: "хэдэн сард 2, хоног байдаг вэ ? гэж асуусан бүх сард 28-н гэж байдаг тул хариулт 12 keke",
  },
  {
    question: "Монголт бичигт (Мэнэхэй) бол монгол хэлэнд хөрвүүлвэл ямар үг вэ?",
    options: ["Мэлхий", "Мэнэнгийн тал", "Мерседэс бенз"],
    answer: 0,
    description: "мэлхий",
  },
  {
    question: " 3 алимнаас 2-г авав. Чамд хэдэн алим байгаа вэ ?",
    options: ["1", "2", "3"],
    answer: 1,
    description: "Чамд 3 алим байсан гэж өгөгдөөгүй тул та өөртөө 2 алим авсан гэсэн үг",
  },
  {
    question: "Дэлхий хэдэн градус хазайж эргэдэг вэ ?",
    options: ["365", "23.5", "32.5"],
    answer: 1,
    description: "23.5 градус",
  },
  {
    question: "Хөл бөмбөгний хаалганы тор хэдэн нүдтэй вэ?",
    options: ["санахгүй байна", "мэдэхгүй байна", "би нэрээ мэдэхгүй байна"],
    //answer: ,
    description: "Зөв хариултаа баруун доод буланд байрлах чатаар илгээнэ үү :)",
  },
];
//
function load() {
  number++;

  questionText.innerHTML = myApp[questionIndex].question;
  createOptions();
  scoreBoard();
  currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
  optionBox.innerHTML = "";
  for (let i = 0; i < myApp[questionIndex].options.length; i++) {
    const option = document.createElement("div");
    option.innerHTML = myApp[questionIndex].options[i];
    option.classList.add("option");
    option.id = i;
    option.setAttribute("onclick", "check(this)");
    optionBox.appendChild(option);
  }
}

function generateRandomQuestion() {
  const randomNumber = Math.floor(Math.random() * myApp.length);
  let duplicater = 0;
  if (myArray.length == 0) {
    questionIndex = randomNumber;
  } else {
    for (let i = 0; i < myArray.length; i++) {
      if (randomNumber == myArray[i]) {
        duplicater = 1;
      }
    }
    if (duplicater == 1) {
      generateRandomQuestion();
      return;
    } else {
      questionIndex = randomNumber;
    }
  }
  // add adilhan
  myArray.push(randomNumber);
  // console gargana
  console.log(myArray);
  load();
}

function check(ele) {
  // end bol id gesen huwsagch vvsgeed baigaa bizde  "const" gej awaad bn
  // ele.id gedgn sain oilgodogqee
  const id = ele.id;
  if (id == myApp[questionIndex].answer) {
    // aan oilgochloo anda
    ele.classList.add("correct");
    // herwee zow baij ym bol onoogoo nemne
    score++;
    // onooonii sambar
    scoreBoard();
  } else {
    // buruu baih ym bol
    ele.classList.add("wrong");
    for (let i = 0; i < optionBox.children.length; i++) {
      if (optionBox.children[i].id == myApp[questionIndex].answer) {
        // zow hariultiig n gargaj irne  yes
        optionBox.children[i].classList.add("show-correct");
      }
    }
  }
  //
  attempt++;
  disableOptions();
  showAnswer();
  showNextQuestionButton();
  stopTimer();
  // aanhaan yag2 yeye  tiim baina
  if (number == myApp.length) {
    duuslaa();
  }
}

function timeIsUp() {
  // toogoor haruulah function mhn
  showTimeUpTxt();

  for (let i = 0; i < optionBox.children.length; i++) {
    // 0 bish2 0s ehleed ywnashd tgd 1 eer nemgdvvl bgd  yag hargalzah utga n gsn vg tgd chi tvrvvn yu gd bsin tiimerhv
    if (optionBox.children[i].id == myApp[questionIndex].answer) {
      optionBox.children[i].classList.add("show-correct");
    }
  }
  // ene 3 g duudna ene 3 aa ugsa  odoo yrilaa
  disableOptions();
  showAnswer();
  showNextQuestionButton();
}

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/5de5f7a5d96992700fca6af5/default";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
// tsag vvsgej baiga function
function startTimer() {
  // ehnii utga n 15s ehlene
  let timeSec = 15;
  // innerhtml eesee html dotroso 15s ehlene gedee haruulna
  runningTime.innerHTML = timeSec;
  // interval n 15-0 n hoorond => ene n suman funtion fej js deer yridag baihaa mergejliin bichiglel ym shig bnle ghd niih mergejliin ch bish
  interval = setInterval(() => {
    // 15 hasaad ywna
    timeSec--;
    // 15,4..11.09.08 gej ywna bzd ok2
    if (timeSec < 10) {
      timeSec = "0" + timeSec;
    }
    // 6s door orhn bol ulaan ongo sanuulah bsn bn te azgq sda ajildagq naasn
    if (timeSec < 6) {
      runningTime.classList.add("less-time");
    }
    runningTime.innerHTML = timeSec;
    if (timeSec == 0) {
      clearInterval(interval);
      timeIsUp();
    }
    // mlsek 1sek gsn vg haha medhgq sda ahha
  }, 1000);
}
// daraagn 15s ehlene gedeg n l ym shig bnshd
function stopTimer() {
  clearInterval(interval);
}
//
function disableOptions() {
  for (let i = 0; i < optionBox.children.length; i++) {
    // hariulsan asuultuud n ym  yu in?zaa ain aanh
    // aan anzaarwuu aanh dawhar songoj bolohgq gsn ym bn te yes
    optionBox.children[i].classList.add("answered");
  }
}
// ene bol ale n zow buruu baisanga gargaj irden function
function showAnswer() {
  // undefined gedeg n zarlagdaad ashifgladgaagq ch ymu tiimerhv baij bolno baih tegj sanaad baina
  if (typeof myApp[questionIndex].description === "undefined") {} else {
    answerDescription.classList.add("show");
    // desctiptionoo  html deere nemne saynii ter lagaag l hiij bga
    // description awtsan baigaashd daraagn huudasnd ter n baihqui shineer ehlene gsn vg
    answerDescription.innerHTML = myApp[questionIndex].description;
  }
}
// function nerneeseee tod baigaazd
function hideAnswer() {
  answerDescription.classList.remove("show");
  // haraadhi halit aaan ok22  tus tusdaa omno asuult holboot bvh ymiig l hide hiine gsn vg ustgahgq hide hiine sanah oid baina keke
  answerDescription.innerHTML = "";
}
// nee ch gsn  tod bizd
function showNextQuestionButton() {
  nextQuestionButton.classList.add("show");
}
// neee ch gsn tod ain haana sda data yag duuschlaa 9gb maane
function hideNextQuestionButton() {
  nextQuestionButton.classList.remove("show");
}
// tsagniiha toog haruulna
function showTimeUpTxt() {
  // html huudsan deeree nemne show
  timeUpTxt.classList.add("show");
}
// tsag duussan bol ter lalrin toogoo daraagin hudasnas archin
function hideTimeUpText() {
  // 15s ehleene
  timeUpTxt.classList.remove("show");
}
// onoo haruulah sambar gsh shee
function scoreBoard() {
  // aanh
  correctAnswers.innerHTML = score;
}
// add event listner n yronhiidoo click hiihed daraan asuult ged oilgochih yriul ih ym bolno  ugsa l tiim ym chine ghd

nextQuestionButton.addEventListener("click", nextQuestion);
// gui2 click hiihn bol nextquestion duudaj baigaazd
// ene funtion gsn {}
function nextQuestion() {
  generateRandomQuestion();
  hideNextQuestionButton();
  hideAnswer();
  hideTimeUpText();
  startTimer();
}
// ene bol shuud nogoo hugtsaa duuusaah hed zow hed buruu gedegiig shaaj baigazd ain yu gej
// ydag gichii ve
// ed nar bol oilgomjt bizd bvgdn html duudsandaa   document.querySelector ene tuslamjtaigaar shaaj bn gsn vgshd
function quizResult() {
  document.querySelector(".total-question").innerHTML = myApp.length;

  document.querySelector(".total-attempt").innerHTML = attempt;

  document.querySelector(".total-correct").innerHTML = score;

  document.querySelector(".total-wrong").innerHTML = attempt - score;

  const percentage = (score / myApp.length) * 100;

  document.querySelector(".total-percentage").innerHTML =
    percentage.toFixed(2) + "%";
}
// nee bol anhnii utgauudaa l onoogd ogchiloo  new game
function resetQuiz() {
  attempt = 0;
  myArray = [];
  score = 0;
  number = 0;
}

function social() {}
// asuultuud duusahrr n daraagn asuult shaaj bgn n ym bishv ? tiin te
function duuslaa() {
  nextQuestionButton.classList.remove("show");
  seeResultBtn.classList.add("show");
}
seeResultBtn.addEventListener("click", () => {
  //  quizBox.style.display="none";
  quizBox.classList.remove("show");
  seeResultBtn.classList.remove("show");
  // console.log("Hi"); //checking signal done
  resultBox.classList.add("show");
  quizResult();
});
retryAgain.addEventListener("click", () => {
  quizBox.classList.add("show");
  resultBox.classList.remove("show");
  resetQuiz();
  nextQuestion();
});
mainMenu.addEventListener("click", () => {
  resultBox.classList.remove("show");
  quizHomeBox.classList.add("show");
  resetQuiz();
});
startQuizBtn.addEventListener("click", () => {
  quizHomeBox.classList.remove("show");
  quizBox.classList.add("show");
  startTimer();
  generateRandomQuestion();
});
mainMenu.addEventListener("click", () => {
  resultBox.classList.remove("show");
  quizHomeBox.classList.add("show");
});
// window.onload=()=>{
//     //  load();
// }
