document.addEventListener('DOMContentLoaded', () => {
    // Vocabulary matching game
    const dragWords = document.querySelectorAll('.drag-word');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkButton = document.getElementById('check-answers');
    
    let draggedWord = null;
    
    // Set up drag and drop functionality
    dragWords.forEach(word => {
      word.addEventListener('dragstart', e => {
        draggedWord = word;
        e.dataTransfer.setData('text/plain', word.textContent);
        setTimeout(() => {
          word.classList.add('opacity-50');
        }, 0);
      });
      
      word.addEventListener('dragend', () => {
        word.classList.remove('opacity-50');
        draggedWord = null;
      });
    });
    
      dropZones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('highlight');
      });
      
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('highlight');
      });
      
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('highlight');
        
        // If the zone is already filled, don't allow another drop
        if (zone.textContent.trim() !== '') {
          return;
        }
        
        // Clone the word and add it to the drop zone
        const clone = draggedWord.cloneNode(true);
        clone.classList.remove('drag-word');
        clone.classList.add('dropped-word');
        clone.setAttribute('draggable', 'false');
        
        // Add a remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-times ml-2"></i>';
        removeBtn.className = 'text-gray-500 hover:text-red-500 focus:outline-none';
        removeBtn.addEventListener('click', () => {
          zone.textContent = '';
          zone.classList.remove('correct', 'incorrect');
        });
        
        zone.textContent = '';
        zone.appendChild(clone);
        zone.appendChild(removeBtn);
        
        // Hide the original word
        draggedWord.classList.add('invisible');
      });
    });
    
    // Check answers functionality
    checkButton.addEventListener('click', () => {
      let allCorrect = true;
      
      dropZones.forEach(zone => {
        const droppedWord = zone.querySelector('.dropped-word');
        
        if (!droppedWord) {
          allCorrect = false;
          return;
        }
        
        const wordValue = droppedWord.getAttribute('data-word');
        const correctMatch = zone.getAttribute('data-match');
        
        // Check if the word matches the correct definition
        const definitions = {
          'enormous': 'very large in size or amount',
          'essential': 'absolutely necessary',
          'diverse': 'showing a great deal of variety'
        };
        
        if (definitions[wordValue] === correctMatch) {
          zone.classList.add('correct');
          zone.classList.remove('incorrect');
        } else {
          zone.classList.add('incorrect');
          zone.classList.remove('correct');
          allCorrect = false;
        }
      });
      
      // Show feedback
      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'mt-4 p-3 rounded animate-fade-in text-center';
      
      if (allCorrect) {
        feedbackEl.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-200');
        feedbackEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Excellent! All matches are correct.';
      } else {
        feedbackEl.classList.add('bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900', 'dark:text-yellow-200');
        feedbackEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Some matches are incorrect. Try again!';
      }
      
      // Remove previous feedback if exists
      const previousFeedback = document.querySelector('#vocabulary-game > div.mt-4');
      if (previousFeedback) {
        previousFeedback.remove();
      }
      
      document.getElementById('vocabulary-game').appendChild(feedbackEl);
      
      // If all correct, show a success animation
      if (allCorrect) {
        setTimeout(() => {
          feedbackEl.innerHTML = '<i class="fas fa-trophy mr-2"></i> You\'ve completed this exercise! Try the next one.';
          feedbackEl.classList.remove('bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-200');
          feedbackEl.classList.add('bg-purple-100', 'text-purple-800', 'dark:bg-purple-900', 'dark:text-purple-200');
        }, 2000);
      }
    });
    
    // Reset functionality
    const resetGame = () => {
      dropZones.forEach(zone => {
        zone.textContent = '';
        zone.classList.remove('correct', 'incorrect', 'highlight');
      });
      
      dragWords.forEach(word => {
        word.classList.remove('invisible');
      });
      
      // Remove feedback
      const feedback = document.querySelector('#vocabulary-game > div.mt-4');
      if (feedback) {
        feedback.remove();
      }
    };
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.className = 'mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none';
    resetButton.textContent = 'Reset Exercise';
    resetButton.addEventListener('click', resetGame);
    
    // Add reset button after check button
    checkButton.parentNode.appendChild(resetButton);
    
    // Add progress tracking
    const addProgressTracking = () => {
      const progressContainer = document.createElement('div');
      progressContainer.className = 'mt-6 pt-4 border-t border-gray-200 dark:border-gray-700';
      
      const progressTitle = document.createElement('h4');
      progressTitle.className = 'text-sm font-medium text-gray-900 dark:text-white mb-2';
      progressTitle.textContent = 'Your Progress';
      
      const progressBar = document.createElement('div');
      progressBar.className = 'w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5';
      
      const progressFill = document.createElement('div');
      progressFill.className = 'bg-purple-600 h-2.5 rounded-full';
      progressFill.style.width = '33%'; // Example progress
      
      const progressStats = document.createElement('div');
      progressStats.className = 'flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400';
      progressStats.innerHTML = '<span>1/3 exercises completed</span><span>Keep going!</span>';
      
      progressBar.appendChild(progressFill);
      progressContainer.appendChild(progressTitle);
      progressContainer.appendChild(progressBar);
      progressContainer.appendChild(progressStats);
      
      document.querySelector('#vocabulary-game').parentNode.appendChild(progressContainer);
    };
    
    // Add progress tracking to the page
    addProgressTracking();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        resetGame();
      }
    });
    
    // Add animations to elements as they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.course-card, .testimonial-slide, #features dl > div');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    };
    
    // Initialize animations
    animateOnScroll();
  });
  
  