const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopBtn = document.getElementById('back-to-top');

    menuBtn.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);

    function toggleMobileMenu() {
      if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px') {
        mobileMenu.style.maxHeight = '0px';
      } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      }
    }

    function handleScroll() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function submitForm(event) {
      event.preventDefault();
      const formMsg = document.getElementById('form-msg');
      // Simple validation simulation and reset
      formMsg.textContent = 'Thank you for reaching out! I will get back to you soon.';
      formMsg.classList.remove('hidden');
      event.target.reset();
      setTimeout(() => {
        formMsg.classList.add('hidden');
      }, 6000);
    }