const sections = [...document.querySelectorAll('section')];
const display = document.querySelector('.maincontent');

let inScrool = false;

sections[0].classList.add('active');

function getSiblings(elem) {
  var siblings = [];
  var sibling = elem;
  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  sibling = elem;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  return siblings;
}

const performTransition = sectionEq => {
  if (inScrool === false) {
    inScrool = true;
    const position = sectionEq * -100;

    const sideMenuItem = [...document.querySelectorAll('.fixed-menu__item')];

    display.style.transform = 'translateY(${position}%)';

    sections[sectionEq].classList.add('active');

    const allSiblings = getSiblings(sections[sectionEq]);

    for (let i = 0; i < allSiblings.length; i++) {
      allSiblings[i].classList.remove('active');
    }

    sideMenuItem[sectionEq].classList.add('fixed-menu__item--active');


    setTimeout(() => {
      inScrool = false;
      for (let i = 0; i < allSiblings.length; i++) {
        sideMenuItem[i].classList.remove('fixed-menu__item--active');
      }
    }, 1300);
  }
}

const scrollViewport = direction => {
  const activeSection = sections.find(item => item.classList[1] === 'active');
  const nextSection = activeSection.nextElementSibling;
  const prevSection = activeSection.previousElementSibling;

  if (direction === 'next' && nextSection) {
    performTransition(sections.indexOf(nextSection));
  }

  if (direction === 'prev' && prevSection) {
    performTransition(sections.indexOf(prevSection));
  }
}

window.addEventListener('wheel', e => {
  const deltaY = e.deltaY;

  if (deltaY > 0) {
    scrollViewport('next');
  }

  if (deltaY < 0) {
    scrollViewport('prev');
  }
});

window.addEventListener('keydown', e => {

  switch (e.keyCode) {
    case 38: //prev
      scrollViewport('prev');
      break;

    case 40: //next
      scrollViewport('next');
      break;
  }
})