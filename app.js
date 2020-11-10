/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What country is Machu Picchu in?', // #1
      answers: [
        'Peru',
        'Chile',
        'Uruguay',
        'Venezuela'
      ],
      correctAnswer: 'A',
      incorrectComment: 'Peru'
    },
    {
      question: 'What country is Haida Gwaii in??', // #2
      answers: [
        'Mexico',
        'Canada',
        'United States',
        'Greenland'
      ],
      correctAnswer: 'B',
      incorrectComment: 'Canada'
    },
    {
      question: 'What country is Table Mountain in?', // #3
      answers: [
        'Ghana',
        'Kenya',
        'South Africa',
        'Uganda'
      ],
      correctAnswer: 'C',
      incorrectComment: 'South Africa'
    },
    {
      question: 'What country is Paro Taktsang in?', // #4
      answers: [
        'China',
        'Tibet',
        'India',
        'Bhutan'
      ],
      correctAnswer: 'D',
      incorrectComment: 'Bhutan'
    },
    {
      question: 'What country is Santorini in?', // #5
      answers: [
        'Italy',
        'Greece',
        'Turkey',
        'Malta'
      ],
      correctAnswer: 'B',
      incorrectComment: 'Greece'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  feedbackMessage: '&nbsp;'
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function startQuiz() {
  store.score = 0;
  store.questionNumber = 0;
  store.quizStarted = true;

  return `
    <form id="welcome-screen" class="welcome-screen">
      <fieldset>
        <p>Welcome to the quiz!<p>
        <nav>
          <button type="button" id="start-button">Start</button>
        </nav>
      </fieldset>
      <p id="feedback" class="feedback">${store.feedbackMessage}</p>        
    </form>  
  `;
}

function generateQuestion() {
  let currentQuestion = store.questions[store.questionNumber];
  
  return `
    <div class="group">
      <div class="item">
        ${generateImage()}
      </div>
      <div class="item item-double">  
        <form id="questionnaire" class="questionnaire">
          <fieldset>
            <legend>${currentQuestion.question}</legend>  
            <ol type="A">
              ${generateAnswers(currentQuestion)}
            </ol>
            <nav>
              <button type="submit" id="submit-button">Submit</button>
              <button type="button" id="next-button">Next</button>
            </nav>  
          </fieldset>
          <p id="feedback" class="feedback">${store.feedbackMessage}</p>
        </form>
      </div>
    </div>
  `;
}

function generateImage(curQue) {
  if (store.questionNumber == 0) {
    return `  
      <img src="images/Machu-Picchu.jpg" alt="Ancient Ruins in the Mountains">
    `;
  } else if (store.questionNumber == 1) {
    return `  
      <img src="images/Gwaii-Haanas.jpg" alt="Trees Overlooking Calm Waters">
    `;
  } else if (store.questionNumber == 2) {
    return `  
      <img src="images/Table-Mountain.jpg" alt="Flat-topped Mountain">
    `;
  } else if (store.questionNumber == 3) {
    return `  
      <img src="images/Paro-Taktsang.jpg" alt="Cliff-side Temple Complex">
    `;    
  } else {
    return `  
      <img src="images/Santorini.jpg" alt="Town Overlooking the Sea">
    `;   
  }  
}

function generateAnswers(curQue) {
  return `
    <li>
      <input type="radio" id="A" name="answers" value="A" required>
      <label for="A">${curQue.answers[0]}</label>
    </li>
    <li>
      <input type="radio" id="B" name="answers" value="B" required>
      <label for="B">${curQue.answers[1]}</label>
    </li>
    <li>
      <input type="radio" id="C" name="answers" value="C" required>
      <label for="C">${curQue.answers[2]}</label>
    </li>
    <li>
      <input type="radio" id="D" name="answers" value="D" required>
      <label for="D">${curQue.answers[3]}</label>
    </li>
  `;
}

function gradeQuestion(submittedAnswer) {
  let currentQuestion = store.questions[store.questionNumber];

  if (submittedAnswer == 'right') {
    return `
      You are correct!
    `;  
  }  else {
    return `
      Incorrect. The answer is ${currentQuestion.incorrectComment}.
    `;
  }
}

function currentStatus() {
  let questionNum = Math.min(store.questionNumber + 1, 5);

  return `
    <footer>
      <div class="status">
        <h2>Question: ${questionNum} of ${store.questions.length}</h2>
        <div class="score">
          <h2>Score: ${store.score} of ${store.questions.length}</h2>
        </div>
      </div>
    </footer>
  `;
}

function updateScore() {
  $("div.score").replaceWith(`
    <div class="score">
      <h2>Score: ${store.score} of ${store.questions.length}</h2>
    </div>
  `);
}

function finishQuiz() {
  return `
    <form id="denouement" class="denouement">
      <fieldset>
        <p>Thanks for taking the quiz!<p>
        <nav>
          <button type="button" id="restart-button">Restart</button>
        </nav>
      </fieldset>  
      <p id="feedback" class="feedback">${store.feedbackMessage}</p>
    </form>
  `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  let htmlCode = '';

  if (store.quizStarted == false) {
    htmlCode = startQuiz();
    $('body').append(currentStatus());
  } else if (store.questionNumber < store.questions.length) {
    htmlCode = generateQuestion();
  } else {
    store.quizStarted = false;
    htmlCode = finishQuiz();
  }

//  htmlCode = test();
//  htmlCode += currentStatus();
  $('main').html(htmlCode);
  $('footer').replaceWith(currentStatus());
};

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function startButton() {
  $('body').on('click', '#start-button', function(event) {
    renderQuiz();
  });
}

function submitButton() {
  $('body').on('submit', '#questionnaire', function(event) {
    event.preventDefault();
    let currentQuestion = store.questions[store.questionNumber];
    let selectedAnswer = $('input[name=answers]:checked').val();

    if (selectedAnswer == currentQuestion.correctAnswer) {
    $('#feedback').append(gradeQuestion('right'));
      store.score++;
    } else {
    $('#feedback').append(gradeQuestion('wrong'));
    }

    $('#submit-button').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next-button').show();
    updateScore();
  });
}

function nextButton() {
  $('body').on('click', '#next-button', function(event) {
    store.questionNumber++;
    renderQuiz();
  });
}

function restartButton() {
  $('body').on('click', '#restart-button', function(event) {
    $('footer').replaceWith(``);
    renderQuiz();
  });  
}


function main() {
  renderQuiz();
  startButton();
  submitButton();
  nextButton();
  restartButton();
}  

$(main);