const sections = [...document.querySelectorAll('section')];
const display = document.querySelector('.maincontent');
const sideMenuItems = [...document.querySelectorAll('.fixed-menu__item')];

let inScrool = false;

sections[0].classList.add('active');
sideMenuItems[0].classList.add('fixed-menu__item--active');

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    return 0;
  }

  return position;
};

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
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items[itemEq].classList.add(activeClass);
  const allSiblings = getSiblings(items[itemEq]);

  for (let i = 0; i < allSiblings.length; i++) {
    allSiblings[i].classList.remove(activeClass);
  }
};

const performTransition = sectionEq => {
  if (inScrool === false) {
    const transitionOver = 1000;
    const mouseInertionOver = 200;
    inScrool = true;
    const position = countSectionPosition(sectionEq);

    display.style.transform = `translateY(${position}%)`;

    resetActiveClassForItem(sections, sectionEq, 'active');

    setTimeout(() => {
      inScrool = false;
      resetActiveClassForItem(sideMenuItems, sectionEq, 'fixed-menu__item--active');
    }, transitionOver + mouseInertionOver);
  }
};

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
};

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
    case 38:
      scrollViewport('prev');
      break;

    case 40:
      scrollViewport('next');
      break;
  }
});

const links = document.querySelectorAll('[data-scroll-to]');
const linksArr = [...links];

linksArr.forEach(item =>
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('data-scroll-to');

    const reqSection = document.querySelector(`[data-section-id=${target}]`);

    performTransition(sections.indexOf(reqSection));
  })
)