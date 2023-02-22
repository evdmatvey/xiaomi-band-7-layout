// slider
const swiper = new Swiper('.info__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2.2,
  spaceBetween: 30,
  navigation: {
    nextEl: '.info__slider-next',
  },
});

// scroll
(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach((each) => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

// modal

const buttonsThatOpenModals = document.querySelectorAll('[data-modal]');
const buttonsThatCloseModals = document.querySelectorAll('.modal__close');
const buttonThatRedirectToPayment = document.querySelector('.order__buy');

const closeModals = () => {
  console.log(1);
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    modal.classList.remove('open');
  });
  document.body.classList.remove('modal-open');
};

const isModalOpen = () => {
  const modals = document.querySelectorAll('.modal');
  let isOpen = false;

  modals.forEach((modal) => {
    if (modal.classList.contains('open')) {
      isOpen = true;
    }
  });

  return isOpen;
};

const openModal = (button) => {
  closeModals();
  modal = button.dataset.modal;
  document.querySelector(`.modal__${modal}`).classList.add('open');
  document.body.classList.add('modal-open');
};

buttonsThatOpenModals.forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

buttonsThatCloseModals.forEach((button) => {
  button.addEventListener('click', closeModals);
});

buttonThatRedirectToPayment.addEventListener('click', (e) => {
  e.stopPropagation();
  closeModals();
});
