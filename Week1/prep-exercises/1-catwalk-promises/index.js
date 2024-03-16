'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
   const intervalId =setInterval(function(){
    img.style.left= startPos+'px';
    startPos+= STEP_SIZE_PX;
    if(startPos>stopPos){
      clearInterval(intervalId);
      resolve()
    }
  },STEP_INTERVAL_MS)
  });
}

function dance(img) {
  return new Promise((resolve) => {
   img.src = DANCING_CAT_URL;
    setTimeout(()=>{
      img.src = "http://www.anniemation.com/clip_art/images/cat-walk.gif";
       resolve();
  
    },DANCE_TIME_MS);
   });

}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use the `walk()` and `dance()` functions to let the cat do the following:
  // 1. Walk from `startPos` to `centerPos`.
  // 2. Then dance for 5 secs.
  // 3. Then walk from `centerPos` to `stopPos`.
  // 4. Repeat the first three steps indefinitely.
  walk(img,startPos,centerPos)
  .then(()=>dance(img))
  .then(()=>walk(img,centerPos,stopPos))
  .then(()=>catWalk());
}

window.addEventListener('load', catWalk);