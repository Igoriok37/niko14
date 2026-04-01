const slider = document.getElementById('mainSlider');
const slides = document.querySelectorAll('.slide');
let currentIdx = 0;
let isMoving = false;

let rotationTimer;
let heroCube = document.getElementById('hero-cube');
let sides = heroCube.querySelectorAll('.side');
let step = 0;
let isCubeAllowedToRotate = false; // Перенесли вверх для надежности

window.addEventListener('DOMContentLoaded', () => {
  /* const box = document.querySelector('.logo-box');
  const parts = document.querySelectorAll('.logo-parti');

  if (!box || parts.length === 0) return;

  // ШАГ 1: Разбрасываем детали мгновенно
  parts.forEach((part, index) => {
    const spreadX = (Math.random() - 0.5) * window.innerWidth * 2;
    const spreadY = (Math.random() - 0.5) * window.innerHeight * 2;
    const spreadZ = (Math.random() - 0.5) * 1000;
    const randomRotate = (Math.random() - 0.5) * 720;

    part.style.transition = 'none';
    part.style.transform = `translate3d(${spreadX}px, ${spreadY}px, ${spreadZ}px) rotate(${randomRotate}deg) scale(0.2)`;
    part.style.opacity = "0";
    part.dataset.delay = (index * 0.05).toFixed(2);
  });

  // ШАГ 2: Запускаем сборку
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      parts.forEach(part => {
        part.style.transition = '';
        part.style.transitionDelay = `${part.dataset.delay}s`;
        part.style.opacity = "1";
      });
      box.classList.add('is-assembled');
    });
  }); */
  setTimeout(() => {
    document.body.classList.add('is-ready');
  });
  // ШАГ 3: Активация куба (внутри DOMContentLoaded, чтобы всё было в одном потоке)
  setTimeout(() => {
    document.body.classList.add('show-cube');

    // Разрешаем вращение и запускаем цикл
    setTimeout(() => {
      isCubeAllowedToRotate = true;
      startInfiniteLoop(); // Единственный верный запуск
      console.log("Вращение запущено после сборки");
    }, 500);

  }, 500);
});

function startInfiniteLoop() {
  if (!isCubeAllowedToRotate) return;

  clearTimeout(rotationTimer);

  rotationTimer = setTimeout(() => {
    performRotation(); // Шаг 1

    rotationTimer = setTimeout(() => {
      performRotation(); // Шаг 2
      console.log("Замерли на ПЛОТНОМ слове");

      rotationTimer = setTimeout(() => {
        performRotation(); // Шаг 3

        rotationTimer = setTimeout(() => {
          performRotation(); // Шаг 4 

          rotationTimer = setTimeout(() => {
            heroCube.style.transition = 'none';
            step = 0;
            heroCube.style.transform = `rotateX(0deg)`;

            rotationTimer = setTimeout(() => {
              heroCube.style.transition = 'transform 0.8s ease-in';
              startInfiniteLoop();
            }, 1500);
          }, 5000);
        }, 1500);
      }, 3000);

    }, 1500);
  }, 1500);
}

function performRotation() {
  step++;
  heroCube.style.transform = `rotateX(${step * -90}deg)`;
  const currentIndex = step % 4;
  sides.forEach((side, index) => {
    side.classList.toggle('active-side', index === currentIndex);
  });
}


let isScrolling = false;
const viewport = document.querySelector('.cube-viewport');
// --- 1. ПЕРЕМЕННЫЕ ДЛЯ ПЛАВНОСТИ ---
let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
const ease = 0.04;
let isHeroActive = true;
let lastScrollY = 0;

function updateLogoAnimation() {
  // Плавный скролл
  currentScroll += (targetScroll - currentScroll) * ease;
  const vh = window.innerHeight;
  const vw = document.documentElement.clientWidth;
  const viewport = document.querySelector('.cube-viewport');
  const s1 = document.getElementById('slide-1');
  // --- УПРАВЛЕНИЕ ХЕДЕРОМ ---
  const header = document.querySelector('.main-header');
  const actualScroll = window.scrollY; // Берем реальный скролл для точности направления

  if (header) {
    // ЭТАП 1: Перекрашиваем в белый (на 4-й шторке)
    if (currentScroll > vh * 5.22) {
      header.classList.add('header-light');
      viewport.classList.add('cube-dark');
    } else {
      header.classList.remove('header-light');
      viewport.classList.remove('cube-dark');
    }

    // ЭТАП 2: Прятки (после 5-го экрана)
    if (actualScroll > vh * 5) {
      // Если крутим ВНИЗ — прячем. Если ВВЕРХ — показываем.
      // Добавим порог в 10px, чтобы хедер не дрожал от микро-движений
      if (actualScroll > lastScrollY + 10) {
        header.classList.add('header-hidden');
      } else if (actualScroll < lastScrollY - 10) {
        header.classList.remove('header-hidden');
      }
    } else {
      // Если мы вернулись выше 5-го экрана — всегда показываем хедер
      header.classList.remove('header-hidden');
    }

    lastScrollY = actualScroll; // Запоминаем текущий скролл для следующего кадра
  }
  if (window.innerWidth <= 768) {
    if (header) {
      // ЭТАП 1: Перекрашиваем в белый (на 4-й шторке)
      if (currentScroll > vh * 5.3) {
        header.classList.add('header-light');
      } else {
        header.classList.remove('header-light');
      }

      // ЭТАП 2: Прятки (после 5-го экрана)
      if (actualScroll > vh * 5) {
        // Если крутим ВНИЗ — прячем. Если ВВЕРХ — показываем.
        // Добавим порог в 10px, чтобы хедер не дрожал от микро-движений
        if (actualScroll > lastScrollY + 10) {
          header.classList.add('header-hidden');
        } else if (actualScroll < lastScrollY - 10) {
          header.classList.remove('header-hidden');
        }
      } else {
        // Если мы вернулись выше 5-го экрана — всегда показываем хедер
        header.classList.remove('header-hidden');
      }

      lastScrollY = actualScroll; // Запоминаем текущий скролл для следующего кадра
    }
  }


  // СЛАЙД 1: Уходит вверх
  if (s1) {
    s1.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
  }

  const s2 = document.getElementById('slide-2');
  const s3 = document.getElementById('slide-3');
  const s4 = document.getElementById('slide-4');
  const s5 = document.getElementById('slide-5');


  // 1. Двигаем ВТОРОЙ слайд (после 100vh), чтобы открыть ТРЕТИЙ
  if (currentScroll > vh) {
    const s2Offset = currentScroll - vh;
    if (s2) s2.style.transform = `translate3d(0, ${-s2Offset}px, 0)`;
  } else {
    if (s2) s2.style.transform = `translate3d(0, 0, 0)`;
  }

  // 2. Двигаем ТРЕТИЙ слайд (после 200vh), чтобы открыть ЧЕТВЕРТЫЙ
  if (currentScroll > vh * 2) {
    let s3Offset = currentScroll - vh * 2;
    if (s3) s3.style.transform = `translate3d(0, ${-s3Offset}px, 0)`;
  } else {
    if (s3) s3.style.transform = `translate3d(0, 0, 0)`;
  }

  if (currentScroll > vh * 3) {
    let s4Offset = currentScroll - vh * 3;
    if (s4) s4.style.transform = `translate3d(0, ${-s4Offset}px, 0)`;
  } else {
    if (s4) s4.style.transform = `translate3d(0, 0, 0)`;
  }

  // 4. Активация и Параллакс текстов
  const t2 = s2?.querySelector('.reveal-text');
  const t3 = s3?.querySelector('.reveal-text');
  const t4 = s4?.querySelector('.reveal-text');

  if (currentScroll > vh * 0.4) {
    s2?.classList.add('active');
    // ПАРАЛЛАКС для 2 слайда: текст чуть отстает от шторки
    if (t2 && currentScroll > vh) {
      let p2 = 85 - (currentScroll - vh) * 0.05;
      t2.style.transform = `translate3d(0%, ${p2}%, 0)`;
    }
  } else {
    s2?.classList.remove('active');
    if (t2) t2.style.transform = `translate3d(0%, 85%, 0)`;
  }

  if (currentScroll > vh * 1.2) {
    s3?.classList.add('active');
    // ПАРАЛЛАКС для 3 слайда
    if (t3 && currentScroll > vh * 2) {
      let p3 = 85 - (currentScroll - vh * 2) * 0.05;
      t3.style.transform = `translate3d(0%, ${p3}%, 0)`;
    }
  } else {
    s3?.classList.remove('active');
    if (t3) t3.style.transform = `translate3d(0%, 85%, 0)`;
  }

  if (currentScroll > vh * 2.4) {
    s4?.classList.add('active');
    // ПАРАЛЛАКС для 3 слайда
    if (t4 && currentScroll > vh * 3) {
      let p4 = 85 - (currentScroll - vh * 3) * 0.05;
      t4.style.transform = `translate3d(0%, ${p4}%, 0)`;
    }
  } else {
    s4?.classList.remove('active');
    if (t4) t4.style.transform = `translate3d(0%, 85%, 0)`;
  }


  if (!viewport) return; // Защита от ошибки, если вьюпорт не найден

  const firstSlideHeight = window.innerHeight;
  const finishDistance = firstSlideHeight - 100;

  let progress = currentScroll / finishDistance;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;



  // Настройки по умолчанию (Десктоп)
  let targetX = 130;
  let targetY = 62;

  if (window.innerWidth <= 1280) {
    targetX = 110;
    targetY = 62;
  }
  // АДАПТИВ: Если ширина экрана меньше 768px (Мобилки)
  if (window.innerWidth <= 1024) {
    // Вариант Б: Просто другие фиксированные числа для телефона
    targetX = 110;
    targetY = 48;
  }
  if (window.innerWidth <= 768) {
    // Вариант Б: Просто другие фиксированные числа для телефона
    targetX = 70;
    targetY = 40;
  }




  // Вычисляем: если у хедера есть класс скрытия, даем смещение вверх (например, -120px)
  // Если хедер на месте — смещение 0
  const headerShift = header && header.classList.contains('header-hidden') ? -124 : 0;

  // Твой текущий расчет (оставляем как есть)
  const moveX = (targetX - window.innerWidth / 2) * progress;
  // К вертикальному движению ПРИБАВЛЯЕМ наш headerShift
  const moveY = (targetY - window.innerHeight / 2) * progress + headerShift;

  const currentScale = 1 + (0.3 - 1) * progress;



  // ПРИМЕНЯЕМ (теперь moveY учитывает прятки хедера)
  viewport.style.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) scale(${currentScale})`;

  // Переменная-флаг (проверь, чтобы она была объявлена вверху скрипта)
  let isHeroActive = true;

  const allSides = viewport.querySelectorAll('.side');



  requestAnimationFrame(updateLogoAnimation);
}

// --- 3. ОБРАБОТЧИК СКРОЛЛА (только фиксирует цель) ---
window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
}, { passive: true });

// --- 4. ЗАПУСК ВСЕГО ПРОЦЕССА ---
requestAnimationFrame(updateLogoAnimation);


window.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.logo-box');
  const scrollPos = window.scrollY;

  // ЕСЛИ МЫ ВВЕРХУ (скролл меньше 100px) — запускаем сборку
  if (scrollPos < 100) {
  }
  // ЕСЛИ МЫ УЖЕ ПРОСКРОЛЛИЛИ — просто показываем брусок в углу
  else {
    if (box) box.style.display = 'none'; // Скрываем детали сразу
    document.body.classList.add('show-cube'); // Проявляем брусок
    isCubeAllowedToRotate = true;
    startInfiniteLoop(); // Запускаем вращение
  }
});




window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const s5 = document.getElementById('slide-5');


  // 1. УПРАВЛЕНИЕ 4-Й ШТОРКОЙ (Стык на 300vh - 400vh)
  if (s5) {
    if (scrollY > vh * 4.3 && scrollY <= vh * 5.3) {
      let offset = scrollY - vh * 4.3;
      s5.style.transform = `translate3d(0, ${-offset}px, 0)`;
    } else if (scrollY <= vh * 4.3) {
      s5.style.transform = `translate3d(0, 0, 0)`;
    } else {
      // Чтобы при быстром скролле шторка точно улетела
      s5.style.transform = `translate3d(0, -100vh, 0)`;
    }
  }
});

// Эта функция запустится ТОЛЬКО когда Swiper загрузится
window.initMySite = function () {
  console.log("Swiper успешно загружен. Запускаем слайдер...");

  const sourceCards = Array.from(document.querySelectorAll('#source-projects .project-item'));
  const wrapper = document.getElementById('projects-wrapper');
  let swiperInstance;

  function updateSwiper(filterValue) {
    const container = document.querySelector('.projects-container');


    // 1. Сначала скрываем контейнер
    container.classList.remove('swiper-ready');

    setTimeout(() => {
      if (swiperInstance) swiperInstance.destroy(true, true);
      wrapper.innerHTML = '';

      // 1. Фильтруем карточки
      let filtered = filterValue === 'all'
        ? [...sourceCards] // Копируем массив, чтобы не испортить оригинал на "складе"
        : sourceCards.filter(card => card.dataset.type === filterValue);

      // 2. Если выбрано "Все" — перемешиваем массив случайным образом
      if (filterValue === 'all') {
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
      }

      // 3. Отрисовываем слайды (как и раньше)
      filtered.forEach(card => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(card.cloneNode(true));
        wrapper.appendChild(slide);
      });

      // ... далее инициализация swiperInstance ...


      // Инициализация (slidesPerView: 'auto' требует ширины в CSS!)
      swiperInstance = new Swiper('.projects-container', {
        slidesPerView: 1.2,
        spaceBetween: 10,
        grabCursor: true,
        freeMode: true,
        mousewheel: { forceToAxis: true },

        // НАСТРОЙКИ ПАГИНАЦИИ
        pagination: {
          el: '.projects-pagination',
          clickable: true, // Точки станут кликабельными

        },

        navigation: {
          nextEl: '.projects-button-next',
          prevEl: '.projects-button-prev',
        },

        observer: true,
        observeParents: true,

        // Адаптив:
        breakpoints: {
          // Когда ширина экрана >= 768px (Планшеты)
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // Когда ширина экрана >= 1024px (Десктоп)
          1280: {
            slidesPerView: 1.7, // Видно две полных и край третьей
            spaceBetween: 30,
          }
        }
      });
      container.classList.add('swiper-ready');
    }, 150);
  }

  const filterButtons = document.querySelectorAll('.filter-btn');

  // Проверяем, есть ли вообще такие кнопки на текущей странице
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.getAttribute('data-filter');

        // Проверяем, существует ли функция и обертка слайдера перед вызовом
        if (typeof updateSwiper === 'function' && document.getElementById('projects-wrapper')) {
          updateSwiper(filter);
        }

        // Переключаем активный класс
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });
  }


  // Первый запуск
  updateSwiper('all');
};

// На случай, если Swiper загрузился ОЧЕНЬ быстро
if (window.isSwiperReady) window.initMySite();


const newsSwiper = new Swiper('.news-container', {
  slidesPerView: 1.2,
  spaceBetween: 10,
  grabCursor: true,
  freeMode: true,
  mousewheel: { forceToAxis: true },
  // НАСТРОЙКИ ПАГИНАЦИИ
  pagination: {
    el: '.news-pagination',
    clickable: true, // Точки станут кликабельными

  },

  // Адаптив:
  breakpoints: {
    // Когда ширина экрана >= 768px (Планшеты)
    768: {
      slidesPerView: 1.6,
      spaceBetween: 20,
    },
    // Когда ширина экрана >= 1024px (Десктоп)
    1280: {
      slidesPerView: 3, // Видно две полных и край третьей
      spaceBetween: 30,
    }
  }
});

