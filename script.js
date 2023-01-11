import cardsDataBlue   from './data/mythicCards/blue/indexBlue.js';
import cardsDataBrown   from './data/mythicCards/brown/indexBrown.js';
import cardsDataGreen   from './data/mythicCards/green/indexGreen.js';
import ancientsData from './data/ancients.js';



const cardAncient = document.querySelector('.card-ancient');
const buttonLevel = document.querySelector('.level-button');
const condition = document.querySelector('.condition');
const cards  = document.querySelector('.cards');



cardAncient.addEventListener('click', () => {
    buttonLevel.classList.remove('off');
});


// общее число карт для всех этапов для древнего

let sumBlue = ancientsData[1].firstStage.blueCards + ancientsData[1].secondStage.blueCards + ancientsData[1].thirdStage.blueCards;
let sumBrown = ancientsData[1].firstStage.brownCards + ancientsData[1].secondStage.brownCards + ancientsData[1].thirdStage.brownCards;
let sumGreen = ancientsData[1].firstStage.greenCards + ancientsData[1].secondStage.greenCards + ancientsData[1].thirdStage.greenCards;

//создание мини колод
let greenMini = [];
let brownMini = [];
let blueMini = [];

// функция перемешивания колоды
function shuffle (deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    console.log('shuffle');
    return deck;
  };


// функция создания колод 
 function createDeck (deck, sum, arr) {
    shuffle(deck);
    for (let i = 0; i < sum; i++) {
        arr.push(deck[i]);
    };

    console.log(arr);
    return arr;
    
 };


//создание колод для каждого этапа 
let firstStageDeck = [];
let secondStageDeck = [];
let thirdStageDeck = [];

function createStageDeck (arr1, arr2, arr3, num1, num2, num3, arrStage) {
    for (let i = 0; i < num1; i++) {
        arrStage.push(arr1[i]);
    };
    
    for (let i = 0; i < num2; i++) {
        arrStage.push(arr2[i]);
    };
 
    for (let i = 0; i < num3; i++) {
        arrStage.push(arr3[i]);
    };

    shuffle(arrStage);
 };




//замешивание колод по всем этапам
buttonLevel.addEventListener('click', () => {
    condition.classList.remove('off');
    cards.classList.remove('off');

    console.log('blue',sumBlue);
    console.log('brown', sumBrown);
    console.log('green', sumGreen);

    // создание мини колод по цветам 
    console.log("create 3 mini color deck");
    createDeck(cardsDataBlue.slice(), sumBlue, blueMini);
    createDeck(cardsDataBrown.slice(), sumBrown, brownMini);
    createDeck(cardsDataGreen.slice(), sumGreen, greenMini);
  
    // созание колод для этапов
    //1 этап
    console.log("I stage deck");
    let blueMini1 = shuffle(blueMini.slice());
    let brownMini1 = shuffle(brownMini.slice());
    let greenMini1 = shuffle(greenMini.slice());
    createStageDeck(blueMini1 , brownMini1, greenMini1, ancientsData[1].firstStage.blueCards, ancientsData[1].firstStage.brownCards, ancientsData[1].firstStage.greenCards, firstStageDeck);

    //2 этап
    console.log("II stage deck");
    blueMini1.splice(0,ancientsData[1].firstStage.blueCards);
    brownMini1.splice(0, ancientsData[1].firstStage.brownCards);
    greenMini1.splice(0,ancientsData[1].firstStage.greenCards);

    let blueMini2 = shuffle(blueMini1.slice());
    let brownMini2 = shuffle(brownMini1.slice());
    let greenMini2 = shuffle(greenMini1.slice());
    createStageDeck(blueMini2, brownMini2, greenMini2, ancientsData[1].secondStage.blueCards, ancientsData[1].secondStage.brownCards, ancientsData[1].secondStage.greenCards, secondStageDeck);

    //3 этап
    console.log("III stage deck");
    blueMini2.splice(0,ancientsData[1].secondStage.blueCards);
    brownMini2.splice(0, ancientsData[1].secondStage.brownCards);
    greenMini2.splice(0,ancientsData[1].secondStage.greenCards);

    let blueMini3 = shuffle(blueMini2.slice());
    let brownMini3 = shuffle(brownMini2.slice());
    let greenMini3 = shuffle(greenMini2.slice());
    createStageDeck(blueMini3, brownMini3, greenMini3, ancientsData[1].thirdStage.blueCards, ancientsData[1].thirdStage.brownCards, ancientsData[1].thirdStage.greenCards, thirdStageDeck);

});


let blueCount1 = 2;
let brownCount1 = 2;

let brownCount2 = 3;
let greenCount2 = 1;

let brownCount3 = 4;
let greenCount3 = 3;

// переворачивание колоды
const image = document.getElementById("img");

var isCardOpen = false;
cards.addEventListener('click', () => {
    if (!isCardOpen) {
    image.src = `${firstStageDeck[0].cardFace}`;
    console.log(firstStageDeck[0].cardFace);
    isCardOpen = true;
    } else if (firstStageDeck.length !== 0) {
        openCardFirstStage();     
    } else if (firstStageDeck.length === 0 && secondStageDeck.length !== 0) {
        openCardSecondStage(); 
    } else if (secondStageDeck.length === 0 && thirdStageDeck.length !== 0 ) {
        openCardThirdStage();
    };
});


function openCardFirstStage () {
        if (firstStageDeck.length !== 1) {
            if (firstStageDeck[0].color === 'blue') {
                blueCount1--;
                document.getElementById("bl1").innerText = blueCount1;
            } else if (firstStageDeck[0].color === 'brown') {
                brownCount1--;
                document.getElementById("b1").innerText = brownCount1;
            };
            firstStageDeck.shift();
            image.src = `${firstStageDeck[0].cardFace}`;
            console.log(firstStageDeck[0].cardFace);
           
        } else if (firstStageDeck.length === 1) {
            if (firstStageDeck[0].color === 'blue') {
                blueCount1--;
                document.getElementById("bl1").innerText = blueCount1;
            } else if (firstStageDeck[0].color === 'brown') {
                brownCount1--;
                document.getElementById("b1").innerText = brownCount1;
            };
            firstStageDeck.shift();
            document.getElementById("I").classList.add('on');
            image.src = `${secondStageDeck[0].cardFace}`;
            console.log(secondStageDeck[0].cardFace);
        };
    };

function openCardSecondStage () {
    if (secondStageDeck.length !== 1) {
        if (secondStageDeck[0].color === 'green') {
            greenCount2--;
            document.getElementById("g2").innerText = greenCount2;
        } else if (secondStageDeck[0].color === 'brown') {
            brownCount2--;
            document.getElementById("b2").innerText = brownCount2;
        };
        secondStageDeck.shift();
        image.src = `${secondStageDeck[0].cardFace}`;
        console.log(secondStageDeck[0].cardFace);
    } else if (secondStageDeck.length === 1) {
        if (secondStageDeck[0].color === 'green') {
            greenCount2--;
            document.getElementById("g2").innerText = greenCount2;
        } else if (secondStageDeck[0].color === 'brown') {
            brownCount2--;
            document.getElementById("b2").innerText = brownCount2;
        };
        secondStageDeck.shift();
        document.getElementById("II").classList.add('on');
        image.src = `${thirdStageDeck[0].cardFace}`;
        console.log(thirdStageDeck[0].cardFace);
    };
};


function openCardThirdStage() {
    if (thirdStageDeck.length !== 1) {
        if (thirdStageDeck[0].color === 'green') {
            greenCount3--;
            document.getElementById("g3").innerText = greenCount3;
        } else if (thirdStageDeck[0].color === 'brown') {
            brownCount3--;
            document.getElementById("b3").innerText = brownCount3;
        };
        thirdStageDeck.shift();
        image.src = `${thirdStageDeck[0].cardFace}`;
        console.log(thirdStageDeck[0].cardFace);
    } else if (thirdStageDeck.length === 1) {
        if (thirdStageDeck[0].color === 'green') {
            greenCount3--;
            document.getElementById("g3").innerText = greenCount3;
    } else if (thirdStageDeck[0].color === 'brown') {
            brownCount3--;
            document.getElementById("b3").innerText = brownCount3;
    };
        thirdStageDeck.shift();
        document.getElementById("III").classList.add('on');

};
};


   