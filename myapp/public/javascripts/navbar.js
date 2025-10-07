"use strict"

console.log('working');

const bar = document.querySelector('.bar');
const list = document.querySelector('.list');

bar.addEventListener('click', ()=>{
  console.log('clicked');
list.classList.toggle("hidden");
});
