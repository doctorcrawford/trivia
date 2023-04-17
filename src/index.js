import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


// BUSINESS LOGIC

function getQuiz() {
  let request = new XMLHttpRequest();
  const url = `https://opentdb.com/api.php?amount=12&category=12&difficulty=medium&type=multiple`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printQuestions(response);
    } else {
      printError(this, response);
    }
  });


  request.open("GET", url, true);
  request.send();
}

// UI LOGIC



function printError(request, apiResponse) {
  document.querySelector('#show-gifs').innerText = `There was an error getting your Gifs! ${apiResponse.name}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

submit

function printQuestions(apiResponse) {
  const questions = apiResponse.results;
  const form = document.getElementById("form");
  questions.forEach(function (element) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const input = document.createElement("input");
    const label = document.createElement("label");
    // div.setAttribute("id", questionNum++);
    form.append(div);
    p.innerHTML = element.question;
    div.append(p);
    input.setAttribute("type", "radio");
    input.setAttribute("id", element.correct_answer);
    input.setAttribute("value", 1); 
    input.setAttribute("name", element.question);
    div.append(input);
    label.setAttribute("for", element.correct_answer);
    label.innerHTML = element.correct_answer;
    div.append(label);
    const incAnswers = element.incorrect_answers;
    incAnswers.forEach(function(badAnswer) {
  
      const input = document.createElement("input");
      const label = document.createElement("label");
      const br = document.createElement("br");
      input.setAttribute("type", "radio");
      input.setAttribute("id", badAnswer);
      input.setAttribute("value", 0);
      input.setAttribute("name", element.question);
      div.append(input);
      label.setAttribute("for", badAnswer);
      label.innerHTML = badAnswer;
      div.append(label);
    });
  });
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.innerText = "Quiz Me!";
  form.append(button);
}


window.addEventListener("load", function () {
  getQuiz();
  // document.querySelector('form').addEventListener("submit", );
});