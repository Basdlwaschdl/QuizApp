let questions = [
    {
        "question": "Welches Element hat das chemische Symbol Fe?",
        "options": ["Kohlenstoff", "Eisen", "Sauerstoff", "Wasserstoff"],
        "answer": "Answer2"
    },
    {
        "question": 'Wer hat den Roman "1984" geschrieben?',
        "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Ernest Hemingway"],
        "answer": "Answer1"
    },
    {
        "question": "Was ist die Hauptstadt von Frankreich?",
        "options": ["Berlin", "Rom", "Madrid", "Paris"],
        "answer": "Answer4"
    },
    {
        "question": "Wie heißt der größte Kontinent der Erde?",
        "options": ["Europa", "Afrika", "Asien", "Nordamerika"],
        "answer": "Answer3"
    },
    {
        "question": "Wie viele Planeten hat unser Sonnensystem?",
        "options": ["5", "7", "8", "10"],
        "answer": "Answer3"
    },
    {
        "question": 'Wer hat das berühmte Gemälde "Der Schrei" gemalt?',
        "options": ["Pablo Picasso", "Edvard Munch", "Vincent van Gogh", "Salvador Dalí"],
        "answer": "Answer2"
    },
    {
        "question": "Wie viele Beine hat eine Spinne?",
        "options": ["6", "8", "10", "12"],
        "answer": "Answer2"
    },
    {
        "question": "Wie heißt der längste Fluss der Welt?",
        "options": ["Nil", "Amazonas", "Jangtsekiang", "Mississippi"],
        "answer": "Answer1"
    },
    {
        "question": "Wer hat die Relativitätstheorie entwickelt?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Charles Darwin"],
        "answer": "Answer2"
    },
    {
        "question": "Wie heißt das höchste Gebäude der Welt?",
        "options": ["Burj Khalifa", "Shanghai Tower", "One World Trade Center", "Taipei 101"],
        "answer": "Answer1"
    }
];

let currentquestion = 0;
let rightAnswers = 0;
let progress = 0;
let audio_correct = new Audio('audio/correct.mp3');
let audio_incorrect = new Audio('audio/wrong.mp3');
let audio_endScreen = new Audio('audio/endScreen.mp3');


function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('progressBarsub').style.width = `${progress}%`;
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('question').style.display = '';
    if (currentquestion == questions.length) {
        showEndscreen();
    }
    else {
        let questionCount = currentquestion + 1;
        let progress = document.getElementById('progress');
        progress.innerHTML = `
    ${questionCount} von ${questions.length} Fragen`;
        showQuestion()
    }
}


function showQuestion() {
    enableButtons();
    let question = questions[currentquestion];
    document.getElementById('questionBox').innerHTML = `
    ${question['question']}`;
    document.getElementById('Answer1').innerHTML = `${question['options'][0]}`;
    document.getElementById('Answer2').innerHTML = `${question['options'][1]}`;
    document.getElementById('Answer3').innerHTML = `${question['options'][2]}`;
    document.getElementById('Answer4').innerHTML = `${question['options'][3]}`;
}


function answer(answer) {
    let rightAnswer = questions[currentquestion]['answer'];
    if (rightAnswer == answer) {
        audio_correct.play();
        rightAnswers += 1
        document.getElementById(answer).classList.add('rightAnswer');
        disableButtons();
    }
    else {
        audio_incorrect.play();
        document.getElementById(answer).classList.add('wrongAnswer');
        document.getElementById(rightAnswer).classList.add('rightAnswer');
        disableButtons();
    }
}


function disableButtons() {
    document.getElementById('buttonNext').disabled = false;
    document.getElementById('Answer1').disabled = true;
    document.getElementById('Answer2').disabled = true;
    document.getElementById('Answer3').disabled = true;
    document.getElementById('Answer4').disabled = true;
}


function enableButtons() {
    document.getElementById('Answer1').disabled = false;
    document.getElementById('Answer2').disabled = false;
    document.getElementById('Answer3').disabled = false;
    document.getElementById('Answer4').disabled = false;
}


function nextQuestion() {
    let rightAnswer = questions[currentquestion]['answer'];
    document.getElementById(rightAnswer).classList.remove('rightAnswer');
    document.getElementById('Answer1').classList.remove('wrongAnswer');
    document.getElementById('Answer2').classList.remove('wrongAnswer');
    document.getElementById('Answer3').classList.remove('wrongAnswer');
    document.getElementById('Answer4').classList.remove('wrongAnswer');
    document.getElementById('buttonNext').disabled = true;
    currentquestion += 1;
    progress += 10;
    startQuiz();
}


function showEndscreen() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('endScreen').style.display = ''
    audio_endScreen.play();
    document.getElementById('endScreen').innerHTML = `
        <div class="Endscreen">
         <span class="EndscreenText">Glückwunsch !!</span>
            <span>Du hast ${rightAnswers} von 10 Fragen richtig beantwortet</span>
            <button onclick="restart()"class="replyButton">Noch eine Runde</button>
        </div>`;
}


function restart() {
    currentquestion = 0;
    rightAnswers = 0;
    progress = 0;
    startQuiz();
}


function startScreen() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('startScreen').innerHTML = `    
        <div class="Endscreen">
            <span class="EndscreenText">Willkommen bei "WER WEIß ES ???"</span>
            <span>Bist du bereit dein Wissen zu testen?</span>
            <button onclick="startQuiz()" class="replyButton">Quiz starten</button>
        </div>`;
}