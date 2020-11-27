let questionsArray = JSON.parse(localStorage.getItem('questions'));
let gameCard = document.getElementById('gameCard');
let gameResult = document.getElementById('gameResult');
let gameResultInfo = document.getElementById('gameResultInfo');
let question = document.getElementById('question');
let options = document.querySelectorAll('.btn-option');
let totalPrize = document.getElementById('totalPrize');
let currentPrize = document.getElementById('currentPrize');
let btnStart = document.getElementById('btnStart');
let btnSkip = document.getElementById('btnSkip');
let totPrize, curPrize, indexArray;

let skipQuestion = () => {
    btnSkip.disabled = true;
    displayCard();
}
let generateArr = (length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
}
let getRandom = (arr) => {
    let min = 0;
    let max = arr.length - 1;
    return arr[Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)];
}
let reset = () => {
    totPrize = 0;
    curPrize = 100;
    totalPrize.innerHTML = 'Total prize: ' + totPrize;
    currentPrize.innerHTML = 'Prize of current round: ' + curPrize;
}
let openGame = () => {
    gameCard.classList.add('display-flex');
    btnSkip.classList.add('display');
    gameResult.classList.remove('display');
    reset();
    displayCard();
    btnSkip.disabled = false;
}
let showGameResult = (text) => {
    gameCard.classList.remove('display-flex');
    btnSkip.classList.remove('display');
    gameResult.classList.add('display');
    gameResultInfo.innerHTML = text;
}
let checkResult = (qIndex, option) => {
    if (option === questionsArray[qIndex].correct) {
        totPrize += curPrize;
        if (totPrize < 1000000) {
            curPrize *= 2;
            totalPrize.innerHTML = 'Total prize: ' + totPrize;
            currentPrize.innerHTML = 'Prize of current round: ' + curPrize;
            displayCard();
        } else {
            showGameResult('Congratulations! You won 1000000.');
        }
    } else {
        showGameResult('Game over. Your prize is: ' + totPrize);
    }
}
let displayCard = () => {
    indexArray = indexArray === undefined ? generateArr(questionsArray.length) : indexArray;
    let questionIndex = getRandom(indexArray);
    question.innerHTML = questionsArray[questionIndex].question;
    for (let i = 0; i < options.length; i++) {
        options[i].innerHTML = questionsArray[questionIndex].content[i];
        options[i].onclick = () => checkResult(questionIndex, i);
    }
    indexArray = indexArray.filter(i => i !== questionIndex);
}
btnStart.onclick = openGame;
btnSkip.onclick = skipQuestion;