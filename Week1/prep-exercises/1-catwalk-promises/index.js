'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const CAT_WALK_URL = "http://www.anniemation.com/clip_art/images/cat-walk.gif"
function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    
     let currentPosition = startPos
     img.style.left = `${currentPosition}px`
   const currentInterval = setInterval(()=>{
    currentPosition += STEP_SIZE_PX
     img.style.left = `${currentPosition}px`
     
      if (currentPosition >= stopPos) {
      clearInterval(currentInterval)
       resolve()
  }
    },STEP_INTERVAL_MS)
     
 
  })
}

function dance(img) {
  return new Promise((resolve) => {
     img.src = DANCING_CAT_URL

     setTimeout(()=>{
       img.src = CAT_WALK_URL
       resolve()
     },DANCE_TIME_MS)
   
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

 walk(img,startPos,centerPos)
 .then(()=>dance(img))
 .then(()=> walk(img,centerPos,stopPos))
 .then(() =>catWalk())
}

window.addEventListener('load', catWalk);

