const questions = [
    {
        question:"Which of the following is not a CSS preprocessor?",
        Choices: [
            {text: "Stylus", valid: false}, 
            {text:"Java", valid: true}, 
            {text: "Sass", valid: false}, 
            {text: "LESS", valid: false}, 
        ]
    },
    {
        question: "What does AJAX stand for in web development?",
        Choices: [
            {text: "All JavaScript and XML", valid: false}, 
            {text: "Advanced JavaScript and XML", valid: false}, 
            {text: "Asynchronous JavaScript and XML", valid: true}, 
            {text: "Asynchronous JavaScript and XHTML", valid: false}, 
        ]
    },
    {
        question: "Which of the following is a server-side web application framework written in Node.js?",
        Choices: [
            {text:"Express.js", valid: true}, 
            {text:"React.js" , valid: false}, 
            {text: "AngularJS" , valid: false}, 
            {text:"Vue.js" , valid: false}, 
        ]
    },
    {
        question: "Which of the following is a version control system commonly used in web development?",
        Choices: [
            {text: "SQL", valid: false}, 
            {text: "FTP", valid: false}, 
            {text: "GIT", valid: true}, 
            {text: "HTTP", valid: false}, 
        ]
    },
    {
        question:" Which CSS property is used to create rounded corners for elements?",
        Choices: [
            {text: "border-radius", valid: true}, 
            {text:"corner-radius", valid: false}, 
            {text: "rounded-border", valid: false}, 
            {text: " box-radius", valid: false}, 
        ]
    },
    ];

const questionElement = document.getElementById("question");
const ChoiceButtons = document.getElementById("choicebutton");
const nextButton = document.getElementById("proceedbuttton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.Choices.forEach(Choice => {
        const button = document.createElement("button");
        button.innerHTML = Choice.text;
        button.classList.add("btn");
        ChoiceButtons.appendChild(button);
        if(Choice.valid)
        {
            button.dataset.valid = Choice.valid;
        }
        button.addEventListener("click", selectChoice);
    })
}

function resetState()
{
    nextButton.style.display = "none";
    while(ChoiceButtons.firstChild)
    {
        ChoiceButtons.removeChild(ChoiceButtons.firstChild);
    }
}

function selectChoice(e)
{
    const selectBtn = e.target;
    const isvalid = selectBtn.dataset.valid === "true";
    if(isvalid)
    {
        selectBtn.classList.add("valid");
        score++;
    }
    else
    {
        selectBtn.classList.add("invalid");
    }
    Array.from(ChoiceButtons.children).forEach(button => {
        if(button.dataset.valid === "true")
        {
            button.classList.add("valid");
        }
        button.disabled = "true"; 
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = ` You scored  ${score} out of ${questions.length} !   ` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length)
    {
        showQuestion(); 
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
      if(currentQuestionIndex < questions.length)
      {
        handleNextButton();
      }
      else
      {
        startQuiz();
      }
});

startQuiz();