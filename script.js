const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultsBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizOverBox = document.querySelector(".quiz-over-box");
const quizHome = document.querySelector(".quiz-box");
const quizz = document.querySelector(".quiz");
const startAgainQuizBtn = document.querySelector(".restart-quiz-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];
let interval;

myApp = [

            {
                question: "Sluggish is a synonym for the word 'lethargic'",
                options:["True", "False"],
                answer: 0,
                description: "Sluggish is a synonym for the word lethargic."
            },

            {
                question: "Amber thinks Karen is a poised individual. What does she mean by 'poised'?",
                options:["Toxic", "Poisonous", "Composed", "Distracted"],
                answer: 2,
            },

            {
                question: "What is regression?",
                options:["Rediscovery", "Doing something again", "Going back to an earlier stage", "Retreat"],
                answer: 2,

            },

            {
                question: "Find the best match for the word 'draconian'.",
                options:["Having the appearance of Dracula", "Harsh and severe", "Mild", "Constantly miserable"],
                answer: 1,
                description: "Suprisingly, It is not having the appearance of Dracula."
            },

            {
                question: "When having a problem, it is best to dissect the situation. Dissect means...",
                options:["Control", "Discuss", "Ignore", "Analyze"],
                answer: 3,

            },

            {
                question: "Carolyn says her co-worker Jonah finds signatures to be ostentatious and would rather print his name. What does the word ostentatious mean?",
                options:["Unobstrusive", "Prententious", "Difficult", "Visually unpleasing"],
                answer: 1,
            },
      ]


    function load() {
        number++;
        questionText.innerHTML = myApp[questionIndex].question;
        createOptions();
        scoreBoard();
        currentQuestionNum.innerHTML = number + " / " + myApp.length;
    }

    function createOptions() {
        optionBox.innerHTML="";
        for ( let i = 0; i<myApp[questionIndex].options.length; i++){
            const option = document.createElement("div");
                option.innerHTML = myApp[questionIndex].options[i];
                option.classList.add("option");
                option.id= i;
        
                option.setAttribute("onclick", "check(this)");
                optionBox.appendChild(option);
        }
    }

    function generateRandomQuestion() {
        const randomNumber = Math.floor(Math.random() * myApp.length);
         let hitDuplicate = 0;

         if (myArray.length == 0){
            questionIndex = randomNumber;
         } else {
            for( let i = 0; i < myArray.length; i++){
                if ( randomNumber == myArray[i]) {
                    hitDuplicate = 1;
                }
            }

            if ( hitDuplicate == 1){
                generateRandomQuestion();
                return;

            } else {
                questionIndex = randomNumber;
            }
         }
            
            myArray.push(randomNumber);
            console.log(myArray);
            load();

     }

    function check(ele){

       const id = ele.id;
       if ( id == myApp[questionIndex].answer) {

        ele.classList.add("correct");
        score = score + 5;
        scoreBoard();
        startBounce();
       
        } else {
            ele.classList.add("wrong");
            // show correct answer when answering wrong
            for ( let i=0; i<optionBox.children.length; i++){
                if(optionBox.children[i].id == myApp[questionIndex].answer){
                    optionBox.children[i].classList.add("show-correct");
                }
            }
        }
        
        disableOptions();
        showAnswerDescription();
        showNextQuestionBtn();
        stopTimer();

        if ( number == myApp.length) {
            quizOver();
            attempt++;
        }
    }

    function timeIsUp() {
        // when time is up show correct answer
        timeUpText.classList.add("show");
        for ( let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id == myApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
                }
            }

            if ( number == myApp.length) {
                quizOver();
                attempt++;
                hideNextQuestionBtn();
                disableOptions();
                showAnswerDescription();

            } else {
                
                disableOptions();
                showAnswerDescription();
                showNextQuestionBtn();}
            
         }
        
    function startTimer() {
        let timeLimit = 15;
        remainingTime.innerHTML = timeLimit;
        remainingTime.classList.remove("less-time");
        interval = setInterval(()=>{
        timeLimit--;
        if ( timeLimit < 10 ) {
            timeLimit = "0" + timeLimit;
        }

        if ( timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }

        remainingTime.innerHTML = timeLimit;

        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();

         
        }
        }, 1000)
    }

    function stopTimer(){
        clearInterval(interval);
    }
    
    function disableOptions() {
        for ( let i=0; i<optionBox.children.length; i++) {
            optionBox.children[i].removeAttribute("onclick");
        }
    }

    function showAnswerDescription () {

        if ( typeof myApp[questionIndex].description !== 'undefined') {

        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[questionIndex].description;

        }

        quizz.classList.remove("animate");

    }

    function hideAnswerDescription () {
        answerDescription.classList.remove("show");
        answerDescription.innerHTML = "";
    }

    function showNextQuestionBtn () {
        nextQuestionBtn.classList.add("show");
    }

    function hideNextQuestionBtn () {
        nextQuestionBtn.classList.remove("show");
    }

    function hideTimeUpText() {
        timeUpText.classList.remove("show");
    }

    function scoreBoard() {
        correctAnswers.innerHTML = score;
    }

    function startBounce() {
        correctAnswers.style.display= "inline-block";
        correctAnswers.style.animation= "bounce 1s ease";
    }

    function endBounce() {
        correctAnswers.style.display= "inline-block";
        correctAnswers.style.animation= "none";
    }

    

    nextQuestionBtn.addEventListener("click", nextQuestion);

    function nextQuestion() {
        questionIndex++;
        generateRandomQuestion();
        hideNextQuestionBtn();
        hideAnswerDescription();
        hideTimeUpText();
        startTimer();
        endBounce();
        quizz.classList.add("animate");
        
        
    }

    function quizResult() {
        document.querySelector(".total-questions").innerHTML = myApp.length;
        document.querySelector(".total-attempts").innerHTML = attempt;
        document.querySelector(".total-correct").innerHTML = score + " " + "out of 30";
        const percentage = ( (score / 5) / myApp.length ) * 100;
        document.querySelector(".total-percentage").innerHTML = percentage.toFixed(1) + "%";
    }
    
    function resetQuiz() {
        score = 0;
        number = 0;
        myArray = [];
    }

    function quizOver() {
        nextQuestionBtn.classList.remove("show");
        seeResultsBtn.classList.add("show");
    }

    seeResultsBtn.addEventListener("click", ()=> {
        quizOverBox.classList.add("show");
        seeResultsBtn.classList.remove("show");
        quizz.style.display="none";
        quizResult();
    })

    startAgainQuizBtn.addEventListener("click", ()=> {
        quizOverBox.classList.remove("show");
        quizz.style.display="block";
        resetQuiz();
        nextQuestion();
    })

    startQuizBtn.addEventListener("click", () => {
        quizz.classList.add("show");
        nextQuestion();
        quizHome.style.display = "none";
    })
