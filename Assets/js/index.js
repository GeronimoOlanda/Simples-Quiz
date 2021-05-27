const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questonContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestons, currentQuestionIndex;

startButton.addEventListener('click',() => {
    startGame();
});

nextButton.addEventListener('click',() => {
    currentQuestionIndex++;
    setNextQuestion();
});

let startGame = () => {
    startButton.classList.add('hide'); // adicionando a classe hide no startButton
    
    shuffledQuestons = questions.sort(() => Math.random() - .5); // ordena os elementos do negativo a o positivo
    currentQuestionIndex = 0; //começa do index 0

    questonContainerElement.classList.remove('hide'); //agora estamos removendo o hide do question-container para exibir as questoes.
    
    setNextQuestion();
}


let setNextQuestion = () => {
    resetState();
    showQuestion(shuffledQuestons[currentQuestionIndex]); //vai embaralhar as perguntas atraves do index, começando pelo index 0;
}

let showQuestion = (question) => {
    questionElement.innerText = question.question; //setando as perguntas que estao no array la em baixo

    //foreach para que todas as questoes sejam setadas nos botoes
    question.answers.forEach((answer) => {
        const button = document.createElement('button'); //criando um botao

        button.innerText = answer.text; //setando os textos no botao
        button.classList.add('btn'); //adicionando aclasse btn no botao
        
        //fazendo a verificacao se a resposta é verdadeira
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        //adicionando o elemento de click ao selecionar a resposta
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
           

    })
}
//funcao criada para 'resetar' as perguntas
let resetState = () => {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

let selectAnswer = (e) => {
    const selectedButton = e.target; //Uma referência ao objeto que enviou o evento.
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    // cria uma nova instancia dos botoes e itera as perguntas com as respostas
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    //fazendo verificação se existe ainda perguntas
    if(shuffledQuestons.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');

    }else{
        startButton.innerText = 'Restart'; //caso as perguntas acabe, aparecerá a mensagem de restart
        startButton.classList.remove('hide');// remove a classe hide o botao start
    }
   
}
//setando os estados de correto e errado no element(no nosso caso será o background)
let setStatusClass = (element, correct) => {
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}

//removendo as corres de correto e errado
let  clearStatusClass = (element) => {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

//perguntas
const questions = [
    {
        question: 'Qual o nome do Filho de Deus?',

        answers: [
            {text: 'Jesus Cristo', correct: true},
            {text: 'Barrabas', correct: false},
            {text: 'Pedro', correct:false},
            {text: 'João', correct: false}
        ]
    },
    {
        question: 'Quem é o Grande EU SOU?',
    
        answers: [
            {text: 'DEUS', correct: true},
            {text: 'Baal', correct: false},
            {text: 'Paulo', correct:false},
            {text: 'Estevão', correct: false}
        ]
    }
]