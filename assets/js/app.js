$(document).ready(function () {
  var questions = [
    {
      question:
        "What is the record for red cards given in a single soccer game?",
      options: {
        a: ["36", true],
        b: ["15", false],
        c: ["6", false],
        d: ["12", false],
      },
    },
    {
      question:
        "Which two countries participated in the first international soccer match?",
      options: {
        a: ["Germany-France", false],
        b: ["England-Germany", false],
        c: ["England-Scotland", true],
        d: ["Belgium-Netherlands", false],
      },
    },
    {
      question: "What is a soccer field called?",
      options: {
        a: ["Pitch", true],
        b: ["Paddock", false],
        c: ["Box", false],
        d: ["Court", false],
      },
    },
    // {
    //   question: "What was the fastest goal in World Cup history?",
    //   options: {
    //     a: ["13.4 seconds", false],
    //     b: ["20 seconds", false],
    //     c: ["6.3 seconds", false],
    //     d: ["10.8 seconds", true],
    //   },
    // },
    // {
    //   question: "Which country won the first women's World Cup?",
    //   options: {
    //     a: ["England", false],
    //     b: ["Brazil", false],
    //     c: ["Norway", false],
    //     d: ["United States", true],
    //   },
    // },
    // {
    //   question:
    //     "Which two countries went to war partially over a soccer match?",
    //   options: {
    //     a: ["England-Ireland", false],
    //     b: ["Sudan-Egypt", false],
    //     c: ["Turkey-Bulgaria", false],
    //     d: ["El Salvador-Honduras", true],
    //   },
    // },
    // {
    //   question:
    //     "Premier League club Manchester United is also known by which nickname?",
    //   options: {
    //     a: ["The Gunners", false],
    //     b: ["The Red Devils", true],
    //     c: ["The Foxes", false],
    //     d: ["The Scousers", false],
    //   },
    // },
    // {
    //   question:
    //     "Who is the only soccer player in history to win five FIFA Ballons d'Or?",
    //   options: {
    //     a: ["Lionel Messi", true],
    //     b: ["Luka Modric", false],
    //     c: ["Christiano Ronaldo", false],
    //     d: ["Diego Maradona", false],
    //   },
    // },
    // {
    //   question:
    //     "Who was the first English player to win league titles in four countries?",
    //   options: {
    //     a: ["Wayne Rooney", false],
    //     b: ["Steven Gerrard", false],
    //     c: ["David Beckham", true],
    //     d: ["Frank Lampard", false],
    //   },
    // },
    // {
    //   question: "What country was home to the world's first soccer league?",
    //   options: {
    //     a: ["Scotland", false],
    //     b: ["Germany", false],
    //     c: ["England", true],
    //     d: ["Brazil", false],
    //   },
    // },
  ];

  var count = 0;
  var timer = 15;
  var score = 0;
  var intervalId;

  function displayHud() {
    $(".hud").append(`<h3 id="timer">Timer: ${timer} </h3>`);
    $(".hud").append(`<h3 id="score">Score: ${score}</h3>`);
  }

  function displayQuestion() {
    $(".hud").empty();
    displayHud();
    $(".question").text(questions[count].question);
    $(".options").append(
      `<p class="option" val="${questions[count].options.a[1]}">A) ${questions[count].options.a[0]}</p>`
    );
    $(".options").append(
      `<p class="option" val="${questions[count].options.b[1]}">B) ${questions[count].options.b[0]}</p>`
    );
    $(".options").append(
      `<p class="option" val="${questions[count].options.c[1]}">C) ${questions[count].options.c[0]}</p>`
    );
    $(".options").append(
      `<p class="option" val="${questions[count].options.d[1]}">D) ${questions[count].options.d[0]}</p>`
    );

    // intervalId = setInterval(decrement, 1000);
    pickAnswer();
  }

  function decrement() {
    timer--;
    $("#timer").text(`Timer: ${timer}`);
    if (timer === 0) {
      alert("Time up!");
      clearInterval(intervalId);
      clearQuestion();
      nextQuestion();
    }
  }

  function pickAnswer() {
    $(".option").click(function (e) {
      $(".option").css("pointer-events", "none");
      clearInterval(intervalId);
      if (e.target.getAttribute("val") === "true") {
        $(e.target).addClass("correct");
        score++;
        setTimeout(function () {
          if (count === questions.length - 1) {
            if (score > 2) {
              finalScreen("You did well!", score);
            } else {
              finalScreen("You didn't do so well!", score);
            }
          } else {
            clearQuestion();
            nextQuestion();
          }
        }, 3000);
      } else {
        $(e.target).addClass("wrong");
        setTimeout(function () {
          if (count === questions.length - 1) {
            if (score > 2) {
              finalScreen("You did well!", score);
            } else {
              finalScreen("You didn't do so well! Try Again.", score);
            }
          } else {
            clearQuestion();
            nextQuestion();
          }
        }, 3000);
      }
    });
  }

  function clearQuestion() {
    $(".question").empty($(".option").remove());
  }

  function nextQuestion() {
    if (count === questions.length - 1) {
      alert("Game ova");
      score = 0;
    } else {
      count++;
      timer = 15;
      displayQuestion();
      $(".option").css("pointer-events", "auto");
    }
  }

  function finalScreen(message, score) {
    $(".game-container").empty();
    $(".game-container").append(`<div class="final-screen">
    <span><h1 id="final-header">Your final score is ${score}</h1></span>
    <hr>
    </div>`);

    $(".final-screen").append(`<h3 id="final-message">${message}</h3>`);
    $(".final-screen").append(
      `<button class="btn restart-btn" onClick="${() =>console.log("bum")}">Restart</button>`
    );
  }

  displayQuestion();
});
