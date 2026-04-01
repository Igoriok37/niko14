
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  burger.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');

    // Чтобы при открытом меню нельзя было скроллить основной сайт
    if (document.body.classList.contains('menu-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    document.body.classList.toggle('no-scroll');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
  
      // ПРОВЕРКА: Если ссылка внутренняя (начинается с #)
      if (href.startsWith('#')) {
        e.preventDefault(); // Отменяем стандартный мгновенный прыжок
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          // 1. Сначала закрываем меню и возвращаем скролл body
          document.body.classList.remove('menu-open');
          document.body.classList.remove('no-scroll');
          document.body.style.overflow = '';
  
          // 2. Небольшая пауза, чтобы браузер "раздуплил" высоту body после overflow:hidden
          setTimeout(() => {
            targetSection.scrollIntoView({
              behavior: 'smooth', // Плавный скролл
              block: 'start'
            });
          }, 200); // Даем время меню визуально закрыться
        }
      } else {
        // Если ссылка на другую страницу (например, architecture.html)
        // Просто закрываем меню, переход случится сам
        
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header'); // или твой класс .main-header
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Высота первого экрана

      // 1. ЛОГИКА ЦВЕТА: Делаем белый фон, когда ушли с первого экрана
      if (currentScrollY > heroHeight * 1) {
          header.classList.add('header-white');
      } else {
          header.classList.remove('header-white');
      }

      // 2. ЛОГИКА СКРЫТИЯ: Прячем при скролле вниз, показываем при скролле вверх
      if (currentScrollY > lastScrollY && currentScrollY > 800) {
          // Скроллим вниз — прячем
          header.classList.add('header-hidden');
      } else {
          // Скроллим вверх — показываем
          header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
  }, { passive: true });
});

// Добавь это в свой common.js или отдельный скрипт для этой страницы
const selectedSwiper = new Swiper('.selected__swiper', {
  slidesPerView: 1.2, // На мобильных
  spaceBetween: 10,
  grabCursor: true,
  freeMode: true,
  pagination: {
    el: '.selected-pagination',
    clickable: true, // Точки станут кликабельными
  },
  
  breakpoints: {
    768: {
      slidesPerView: 1.4, // Планшеты
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 1.6, // Десктоп (видно 3 полных и кусок 4-й)
      spaceBetween: 32,
    }
  }
});

// Добавь это ВНЕ DOMContentLoaded, в самый низ файла
window.addEventListener('load', () => {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 400); // Пауза чуть больше, чтобы все слайдеры успели отрисоваться
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Добавляем класс active
        entry.target.classList.add('active');
        // Убираем слежку, чтобы анимация не повторялась (по желанию)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Сработает, когда 10% элемента в кадре

  revealElements.forEach(el => observer.observe(el));
});


