document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const nameInput = document.getElementById("name");
  const themeSelect = document.getElementById("theme");
  const loginSection = document.getElementById("login-form-section");
  const kidCalcSection = document.getElementById("kidcalc-section");
  const welcomeMessage = document.getElementById("welcome-message");
  const expressionBox = document.getElementById("expression-box");
  const answerBox = document.getElementById("answer-box");
  const calcButtons = document.querySelectorAll("#calc-buttons button");
  const clearBtn = document.getElementById("clear-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const submitAnswerBtn = document.getElementById("submit-answer-btn");
  const resultsBox = document.getElementById("results-box");
  const kidCalcCounter = document.getElementById("kidcalc-counter");
  const infoBar = document.getElementById("info-bar");
  const loginLink = document.getElementById("login-link");
  const resetButton = document.getElementById("reset-btn");
  let correctAnswers = 0;

  function switchTheme(theme) {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    resetButton.click();
    const userName = document.getElementById("name").value;
    const theme = themeSelect.value;
    switchTheme(theme);
    loginSection.classList.add("hidden-section");
    kidCalcSection.classList.remove("hidden-section");
    infoBar.classList.remove("hidden-section");
    welcomeMessage.textContent = `Welcome, ${userName}!`;
    document.getElementById("info-bar").classList.remove("hidden-section");
  });

  loginLink.addEventListener("click", function () {
    kidCalcSection.classList.add("hidden-section");
    loginSection.classList.remove("hidden-section");
  });

  calcButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (
        this.classList.contains("op-btn") &&
        expressionBox.value !== "" &&
        !expressionBox.value.includes("+") &&
        !expressionBox.value.includes("-") &&
        !expressionBox.value.includes(">") &&
        !expressionBox.value.includes("<")
      ) {
        expressionBox.value += ` ${this.value} `;
      } else if (this.id === "equals-btn") {
        expressionBox.disabled = true;
        answerBox.focus();
      } else if (!this.classList.contains("op-btn")) {
        if (expressionBox.disabled) {
          answerBox.value += this.value;
        } else {
          expressionBox.value += this.value;
        }
      }
    });
  });

  clearBtn.addEventListener("click", function () {
    expressionBox.value = "";
    answerBox.value = "";
    expressionBox.disabled = false;
    resultsBox.textContent = "";
  });

  deleteBtn.addEventListener("click", function () {
    if (expressionBox.disabled) {
      answerBox.value = answerBox.value.slice(0, -1);
    } else {
      expressionBox.value = expressionBox.value.slice(0, -1);
    }
  });

  submitAnswerBtn.addEventListener("click", function () {
    const expression = expressionBox.value.split(" ");
    let result;
    switch (expression[1]) {
      case "+":
        result = Number(expression[0]) + Number(expression[2]);
        break;
      case "-":
        result = Number(expression[0]) - Number(expression[2]);
        break;
      case "*":
        result = Number(expression[0]) * Number(expression[2]);
        break;
      case "/":
        if (Number(expression[2]) === 0) {
          answerBox.value = "Error";
          resultsBox.textContent = "Cannot divide by zero";
          setTimeout(function () {
            clearBtn.click();
          }, 2000);
          return;
        }
        result = Number(expression[0]) / Number(expression[2]);
        break;
      case ">":
        result = parseInt(expression[0]) > parseInt(expression[2]);
        answerBox.value = result ? "True" : "False";
        break;
      case "<":
        result = parseInt(expression[0]) < parseInt(expression[2]);
        answerBox.value = result ? "True" : "False";
        break;
    }

    if (!isNaN(result)) {
      if (
        result === Number(answerBox.value) ||
        (answerBox.value.toLowerCase() === "true" && result)
      ) {
        resultsBox.textContent = "Great job!";
        correctAnswers++;
        kidCalcCounter.textContent = `Score: ${correctAnswers}`;
      } else {
        resultsBox.textContent = "Try again";
      }
    }
    setTimeout(function () {
      clearBtn.click();
    }, 2000);
  });

  resetButton.addEventListener("click", function () {
    correctAnswers = 0;
    document.getElementById("kidcalc-counter").innerText = "Score: 0";
    document.getElementById("expression-box").value = "";
    document.getElementById("answer-box").value = "";
    console.log("Game reset");
    resultsBox.textContent = "";
  });
  document
    .getElementById("theme-switcher")
    .addEventListener("change", function () {
      const theme = this.value;
      switchTheme(theme);
    });
});
