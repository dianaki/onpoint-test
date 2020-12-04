const myRange = document.querySelector('#myRange');
const levelItems = [...document.querySelectorAll('.level__item')];

const activeClass = 'level__item--active';

levelItems[0].classList.add('level__item--active');

myRange.addEventListener('input', e => {

  if (myRange.value <= 25) {
    itemEq = 0;
    resetActiveClassForItem(levelItems, itemEq, activeClass);
  }
    
  if (myRange.value > 25 && myRange.value <= 75) {
    itemEq = 1;
    resetActiveClassForItem(levelItems, itemEq, activeClass);
  }
  
  if (myRange.value > 75) {
    itemEq = 2;
    resetActiveClassForItem(levelItems, itemEq, activeClass);
  }
});