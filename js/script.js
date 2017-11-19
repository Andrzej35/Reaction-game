const doc = document;
const hex = '0123456789ABCDEF';
const ar = [];
const reactionRepeat = 3;
let createdTime;
let clickedTime;
let reactionTime;
let timer;
let count = 0;


// selecting element
const selectElement = function(id) {
    return doc.getElementById(id);
};

// creating element
const createDom = function(el){
    return doc.createElement(el);
};

// adding some attributes
const addAttributes = function(attr, name, element){
    return element.setAttribute(attr, name);
};

// append child to the parent
const appendChildToParent = function(child, parent){
    return parent.appendChild(child);
};

// hide element
const hideElement = function(el) {
    return el.style.display = 'none';
};

// get the time now
const getTheTime = function(){
    return new Date().getTime()/1000;
};

// random colour 
const randomColour = function() {
    const characters = hex.split('');
    let color = "#";
    const n = 6;

    characters.filter(function(x, i) {
      if (i < 6) {
        color += characters[Math.round(Math.random() * 15)];
      }
    });

    return color;
};

// random colour on dynamically created element 
const randomColourOnElement = function(fn, el) {
    return el.style.backgroundColor = randomColour();
};

// random position on the screen 
const randomPosition = function(el){
    const left = Math.random() * 500;
    const top = Math.random() * 500;
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.display = "block";
    return el;
};

// random shapes
const randomShape = function(el){
    const border = Math.random() * 50;
    el.style.borderRadius = border + 'px';
    return el;
};

const app = selectElement('app');
const box = createDom('div');
addAttributes('class', 'box', box);

const txt = createDom('div');
txt.innerHTML = `<h1>This game will  test your reaction speed.</h1>
<p>Play the game by clicking randomly apear figures on the screen.</p>
<p>The fastest, the better. Good luck.</p>`;

appendChildToParent(txt, app);

const startGameButton = createDom('button');
addAttributes('class', 'btn btn-primary', startGameButton);
appendChildToParent(startGameButton, app);
const buttonText = doc.createTextNode('start game');
startGameButton.appendChild(buttonText); 

const elementRender = function(){
    createdTime = getTheTime();
    appendChildToParent(box, app);
    randomColourOnElement(randomColour, box);
    randomShape(box);
    randomPosition(box);
};

const checkUndef = function(res) {
    return res !== undefined;
}

const randomRender = function(fn){
    count++;
    ar.push(reactionTime);
    let result = 0;
    if(count > reactionRepeat) {
        result = ar.reduce(function(all, item) {
            if(item === undefined) {
                item = 0;
            }
            all += item;
            return all;
        }, 0)
        app.innerHTML = '<h2>You avarage score is: <span style="color:#f00; font-weight:bold;">' + (result/reactionRepeat).toFixed(3) + '</span> seconds</h2><div><p class="lead">Your scores on the way:</p>'+ ar.filter(checkUndef).map(x => '<p>' + x.toFixed(3) + '</p>').join("") +'</div><button class="btn btn-primary" id="restart-game">Play Again</button>';
        doc.getElementById('restart-game').addEventListener('click', function(){
            location.reload();
        });
        return;
    }
    
    return setTimeout(fn, timer);

};

// game starts
const gameOn = function(){
    timer = Math.random() * 2000;
    clickedTime = getTheTime();
    reactionTime = clickedTime - createdTime;
    hideElement(box);
    randomRender(elementRender);
};

const playTheGame = function(){
    randomRender(elementRender);
    hideElement(this);
};

box.addEventListener('click', gameOn);
startGameButton.addEventListener('click', playTheGame);
