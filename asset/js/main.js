document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    let currentIndex = 0;
    let slideWidth = testimonialSlides[0].clientWidth;
    let slidesToShow = 1;
    
    // Determine how many slides to show based on screen width
    function updateSlidesToShow() {
      if (window.innerWidth >= 1024) {
        slidesToShow = 3;
      } else if (window.innerWidth >= 768) {
        slidesToShow = 2;
      } else {
        slidesToShow = 1;
      }
      
      slideWidth = testimonialSlides[0].clientWidth;
      goToSlide(currentIndex);
    }
    
    function goToSlide(index) {
      if (index < 0) {
        index = testimonialSlides.length - slidesToShow;
      } else if (index > testimonialSlides.length - slidesToShow) {
        index = 0;
      }
      
      currentIndex = index;
      testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    prevButton.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
    
    nextButton.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
    
    // Update on resize
    window.addEventListener('resize', updateSlidesToShow);
    
    // Initialize slider
    updateSlidesToShow();
    
    // Auto-rotate testimonials
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    // Audio playback for pronunciation practice
    const playButtons = document.querySelectorAll('.play-audio');
    const recordButtons = document.querySelectorAll('.record-audio');
    
    playButtons.forEach(button => {
      button.addEventListener('click', () => {
        // In a real app, this would play the audio file
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-play"></i>';
          // Show a success message
          const message = document.createElement('div');
          message.className = 'text-xs text-green-600 mt-1 animate-fade-in';
          message.textContent = 'Audio played successfully';
          button.parentNode.appendChild(message);
          
          setTimeout(() => {
            message.remove();
          }, 2000);
        }, 1000);
      });
    });
    
    recordButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle recording state
        if (button.classList.contains('recording')) {
          button.classList.remove('recording', 'bg-red-500');
          button.classList.add('bg-gray-200', 'dark:bg-gray-700');
          button.innerHTML = '<i class="fas fa-microphone"></i>';
        } else {
          button.classList.add('recording', 'bg-red-500');
          button.classList.remove('bg-gray-200', 'dark:bg-gray-700');
          button.innerHTML = '<i class="fas fa-stop"></i>';
          
          // Simulate recording for 3 seconds
          setTimeout(() => {
            if (button.classList.contains('recording')) {
              button.classList.remove('recording', 'bg-red-500');
              button.classList.add('bg-gray-200', 'dark:bg-gray-700');
              button.innerHTML = '<i class="fas fa-microphone"></i>';
              
              // Show feedback
              const feedback = document.createElement('div');
              feedback.className = 'text-xs text-green-600 mt-1 animate-fade-in';
              feedback.textContent = 'Good pronunciation! Keep practicing.';
              button.parentNode.appendChild(feedback);
              
              setTimeout(() => {
                feedback.remove();
              }, 3000);
            }
          }, 3000);
        }
      });
    });
  });