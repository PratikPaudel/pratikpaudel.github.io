'use strict';
const modal = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const closeButtons = document.querySelectorAll('.close-modal');
const buttonsOpenModal = document.querySelectorAll('.show-modal');

const modalClose = function (i) {
        modal[i].classList.add('hidden');
        overlay.classList.add('hidden');
}

const modalOpen = function (i) {
    modal[i].classList.remove('hidden');
    overlay.classList.remove('hidden');
}

for (let i=0; i<buttonsOpenModal.length; i++) {
    buttonsOpenModal[i].addEventListener('click', function() {
        modalOpen(i);
    }
    )}

for (let i=0; i<closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function() {
        modalClose(i);
    })
}

overlay.addEventListener('click', function() {
    for (let i = 0; i < modal.length; i++) {
      modalClose(i);
    }
  });
