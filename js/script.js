document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-links a');

  // Function to toggle 'menu-open' class based on checkbox state
  function toggleMenu() {
    if (menuToggle.checked) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }
  // Event listener for checkbox state change
  menuToggle.addEventListener('change', toggleMenu);

  // Function to close the menu
  function closeMenu() {
    if (menuToggle.checked) {
      menuToggle.checked = false;
      body.classList.remove('menu-open');
    }
  }
  // Add click event listeners to all navigation links to close the menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside the nav-links
  document.addEventListener('click', function (event) {
    const nav = document.querySelector('nav');
    if (menuToggle.checked && !nav.contains(event.target)) {
      menuToggle.checked = false;
      body.classList.remove('menu-open');
    }
  });

  // Initialize AOS Library
  AOS.init({
    duration: 600,
    once: true,
  });

  // Navbar Background Blur on Scroll
  window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Initialize Swiper Carousel for Services Section
  const prevButton = document.querySelector('.slider__prev');
  const nextButton = document.querySelector('.slider__next');
  const mySwiper = new Swiper('.my-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  prevButton.addEventListener('click', () => {
    mySwiper.slidePrev();
  });
  nextButton.addEventListener('click', () => {
    mySwiper.slideNext();
  });

  // Particles.js Configuration for Left (Pink Particles)
  particlesJS('particles-left', {
    particles: {
      number: { value: 200, density: { enable: true, value_area: 800 } },
      color: { value: '#fc62af' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 6, random: true },
      line_linked: { enable: true, distance: 150, color: '#fc62af', opacity: 0.4, width: 2 },
      move: { enable: true, speed: 2 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.6 } },
        bubble: { distance: 200, size: 10, duration: 2, opacity: 0.8 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // Particles.js Configuration for Right (Blue Particles)
  particlesJS('particles-right', {
    particles: {
      number: { value: 200, density: { enable: true, value_area: 800 } },
      color: { value: '#449dfd' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 6, random: true },
      line_linked: { enable: true, distance: 150, color: '#449dfd', opacity: 0.4, width: 2 },
      move: { enable: true, speed: 2 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.6 } },
        bubble: { distance: 200, size: 10, duration: 2, opacity: 0.8 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // Tab Switching Logic
  const tabs = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      // Remove 'current' class from all tabs and tab contents
      tabs.forEach((t) => t.classList.remove('current'));
      tabContents.forEach((content) => content.classList.remove('current'));

      // Add 'current' class to the clicked tab and corresponding content
      this.classList.add('current');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('current');
    });
  });

  // Form Validation and Submission
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (!name || !email || !company || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      return;
    }

    // If validation passes, submit the form to Formspree
    fetch('https://formspree.io/f/meoovjrv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Your message has been sent successfully!');
          document.getElementById('contactForm').reset(); // Reset the form
        } else {
          alert('There was an issue sending your message. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  });
});
