const doc = document;
const boxEl = doc.querySelector('.box');

const randomBackground = () => {
  const characters = '0123456789ABCDEF'.split('');
  let color = "#";
  const n = 6;

  characters.filter((x, i) => {
    if (i < 6) {
      color += characters[Math.round(Math.random() * 15)];
    }
  });

  return color;
}

let createdTime;
let clickedTime;
let reactionTime;

const setTheBox = () => {
  let timer = Math.random();
  timer *= 3000;

  setTimeout(() => {
    if (Math.random() >= 0.33) {
      
      boxEl.style.borderRadius = "50px";
    
    } else if (Math.random() <= 0.66) {
      
      boxEl.style.borderRadius = "20px";
    
    } else {
      
      boxEl.style.borderRadius = "0";
    
    }

    boxEl.style.backgroundColor = randomBackground();
    const left = Math.random() * 300;
    const top = Math.random() * 300;
    boxEl.style.left = left + "px";
    boxEl.style.top = top + "px";
    boxEl.style.display = "block";
    createdTime = Date.now();
  }, timer);
};

boxEl.onclick = function () {
  this.style.display = "none";
  setTheBox();
  clickedTime = Date.now();
  reactionTime = (clickedTime - createdTime) / 1000;
  doc.getElementById('reaction').innerHTML = reactionTime;
};
setTheBox();
