const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const questionDetail = document.getElementById('question-detail');
const questionTitleElem = document.getElementById('question-title');
const questionTextElem = document.getElementById('question-text');
const responsesList = document.getElementById('responses-list');
const responseForm = document.getElementById('response-form');
const resolveBtn = document.getElementById('resolve-btn');
const previousAnswers = document.getElementById('previous-answers');

let questions = [];
let currentQuestion = null;

questionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const questionText = document.getElementById('question').value;

  const question = {
    title: title,
    text: questionText,
    responses: [],
    id: questions.length + 1
  };

  questions.push(question);
  renderQuestionList();
  questionForm.reset();
});

function renderQuestionList() {
  questionList.innerHTML = '';
  questions.forEach((q) => {
    const li = document.createElement('li');
    li.classList.add('question-item');
    li.textContent = q.title;
    li.addEventListener('click', () => loadQuestionDetail(q));
    questionList.appendChild(li);
  });
}

function loadQuestionDetail(question) {
  currentQuestion = question;
  questionTitleElem.textContent = question.title;
  questionTextElem.textContent = question.text;
  responsesList.innerHTML = '';

  question.responses.forEach(response => {
    const responseElem = document.createElement('li');
    responseElem.classList.add('response-item');
    responseElem.innerHTML = `<strong>${response.name}</strong>: ${response.comment}`;
    responsesList.appendChild(responseElem);
  });

  questionDetail.style.display = 'block';
  resolveBtn.style.display = 'inline-block';
}

resolveBtn.addEventListener('click', () => {
  questionDetail.querySelector('h3').classList.add('resolved');
  resolveBtn.style.display = 'none';
});

responseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;

  const response = {
    name: name,
    comment: comment
  };

  currentQuestion.responses.push(response);
  loadQuestionDetail(currentQuestion);
  responseForm.reset();
});
