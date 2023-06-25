/*
  - Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
  - Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
  - Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

  RAGIONAMENTO BASE
  1. creare un bottone nell'html che fà partire il gioco
  2. creare una funzione che ritorna numeri casuali da 1 a x
  //////////// possibile bonus /////////////
  il range di numeri casuali dipende dalla difficoltà scelta dall'utente 
    es. easy i numeri casuali andranno da 1 a 10
        medium i numeri casuali andranno da 1 a 50
        hard i numeri casuali andranno da 1 a 100
  ///////////////////////////////////////////
  3. renderizzare i numeri nell'html
  4. al momento in cui i numeri vengono renderizzati far partire il timer che dopo 30 secondi rimuove i numeri dall'html
    - una volta rimossi i nummeri far partire i prompt che domanderanno all'utente i numeri uno per volta (uno per prompt)
    - comparare i numeri inviati dall'utente con numeri creati randomicamente (quindi avremo bisogno di un array che contegga i numeri random)
    /////// versione possibile bonus//////
  4.1 dato che nel programma iniziale è richiesto di comparare i numeri cosi come sono scritti
    - comparare il primo numero inserito dall'utente solo con il primo elemento dell'array di numeri creato all'inizio
  4.2 in una versione successiva potremmo comparare i numeri inseriti dall'utente uno a uno con tutti quelli dell'array in maniera da verificare se i numeri sono corretti ma l'ordine è differente 
    - se il numero è  corretto ma la posizione è differente diamo un solo punto 
    - altrimenti se il numero è corretto e la posizione è uguale al indice dell'array daremo 2 punti
    - altrimenti nessun punto 
   ////////////// fine possibile bonus////////////// 
  5. dire all'utente quali numeri ha ricordato e per ogni numero riceverà un punto
    - stampare in pagina i numeri iniziali (ossia quelli randomici contenuti nell'array) e quelli inseriti dall'utente 
    - dare il colore rosso a quelli che non sono uguali
*/

//HTML Elements
const buttonStart = document.getElementById('start-button');
const numberDisplay = document.querySelectorAll('.ms-number-container')
const playerNumberDisplay = document.querySelectorAll('.ms-player-number-container')
const playerTitle = document.getElementById('player-title')
const timerDisplay = document.getElementById('timer')
const pointsDisplay = document.getElementById('player-points') 

//Globals variables
const initialTime = 10;
let time =  initialTime;
let initialNumbersArray = []
let inputPlayerNumbers = []
let point = 0
const maxRangeNumber = 10;

//Game functions
const gameStart = ()=> {
  inputPlayerNumbers = [] 
  playerNumberDisplay.forEach(element => {
    element.classList.add('d-none')
  })
  playerTitle.classList.add('d-none')
  pointsDisplay.parentElement.classList.add('d-none')
  renderHtml(time + 's', timerDisplay)
  initialNumbersArray = createRandomUniqueNumbers(1, maxRangeNumber);
  renderHtml(initialNumbersArray, numberDisplay)
  createInterval()
  buttonStart.setAttribute("disabled", "")
};

const randomNumber= (min,  max)=> {
  const number = Math.floor(Math.random() * (max - min + 1) ) + min;
  return number;
};

const createRandomUniqueNumbers = (min,  max) => {
  const randomNumberArray = [];
  do {
    const number = randomNumber(min,  max);
    if(!randomNumberArray.includes(number)){
      randomNumberArray.push(number);
    }
  } while (randomNumberArray.length < 5);
  return randomNumberArray;
};

const createInterval = () => {
  const clearHtml =  setTimeout(() => {
    numberDisplay.forEach(singleDisplay => {
      renderHtml('', singleDisplay)
    });
    clearInterval(timer);
    time = initialTime;
  }, (initialTime * 1000) + 100);

  const initPromps = setTimeout(()=>{
    inputPlayerNumbers = getPlayerInput()
    renderHtml(initialNumbersArray,  numberDisplay)
    playerNumberDisplay.forEach(element => {
      element.classList.remove('d-none')
    })
    renderHtml(verificatePints(inputPlayerNumbers), pointsDisplay)
    playerTitle.classList.remove('d-none')
    pointsDisplay.parentElement.classList.remove('d-none')
    buttonStart.removeAttribute("disabled")
    renderHtml('Play Again', buttonStart)
    renderHtml(inputPlayerNumbers, playerNumberDisplay)
  }, (initialTime * 1000) + 200 );

  const timer = setInterval(() => {
    time--;
    const timeToString = String(time)
    renderHtml(timeToString.padStart(2, "0") + 's', timerDisplay)
  }, 1000);
};

const getPlayerInput = ()=> {
  const arrayPlayerNumbers = []
  const number1 = prompt('inserisci il primo nummero della sequenza')
  const number2 = prompt('inserisci il secondo nummero della sequenza')
  const number3 = prompt('inserisci il terzo nummero della sequenza')
  const number4 = prompt('inserisci il quarto nummero della sequenza')
  const number5 = prompt('inserisci il quinto nummero della sequenza')

  arrayPlayerNumbers.push(number1,number2,number3,number4,number5)

  return arrayPlayerNumbers
}

const renderHtml = (elements, destinationElement) => {
  if(typeof elements == "object"){
    for (let i = 0; i < elements.length; i++) {
      const number = elements[i];
      destinationElement[i].innerHTML = number;
    }
  }else {
    destinationElement.innerHTML = elements;
  }

};

const verificatePints = (inputPlayerArray) =>{
  point = 0
  for (let i = 0; i < initialNumbersArray.length; i++) {
    const currentNumber = initialNumbersArray[i];
  
    if(inputPlayerArray[i] == currentNumber && inputPlayerArray[i] != ""){
      console.log(inputPlayerArray)
      for (let j = 0; j < playerNumberDisplay.length; j++) {
        const element = playerNumberDisplay[i];
        element.style.backgroundColor = 'rgb(65, 136, 65)'
        element.style.color = '#fff'
      }
      point++
    }else if(inputPlayerArray[i] != currentNumber ){
       for (let j = 0; j < playerNumberDisplay.length; j++) {
        const element = playerNumberDisplay[i];
        element.style.backgroundColor = 'rgb(151, 43, 43)'
        element.style.color = '#fff'
      }
    }
  }
  return point
}


buttonStart.addEventListener('click', gameStart);