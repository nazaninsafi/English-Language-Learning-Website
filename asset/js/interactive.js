document.addEventListener('DOMContentLoaded', () => {
    // Add a live chat widget
    const addChatWidget = () => {
      const chatButton = document.createElement('button');
      chatButton.className = 'fixed bottom-5 right-20 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none z-50';
      chatButton.innerHTML = '<i class="fas fa-comments"></i>';
      chatButton.setAttribute('aria-label', 'Open chat');
      
      const chatWidget = document.createElement('div');
      chatWidget.className = 'fixed bottom-20 right-5 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 transform transition-transform duration-300 scale-0 origin-bottom-right';
      chatWidget.innerHTML = `
        <div class="p-4 bg-purple-600 text-white rounded-t-lg flex justify-between items-center">
          <h3 class="font-medium">Chat with a Tutor</h3>
          <button class="text-white hover:text-gray-200 focus:outline-none" id="close-chat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4 h-80 overflow-y-auto" id="chat-messages">
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0 mr-3">
              <div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
              <p class="text-sm text-gray-800 dark:text-gray-200">Hello! How can I help you with your English learning today?</p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex">
            <input type="text" id="chat-input" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" placeholder="Type your message...">
            <button id="send-message" class="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(chatButton);
      document.body.appendChild(chatWidget);
      
      // Toggle chat widget
      chatButton.addEventListener('click', () => {
        chatWidget.classList.toggle('scale-0');
        chatWidget.classList.toggle('scale-100');
      });
      
      // Close chat
      document.getElementById('close-chat').addEventListener('click', () => {
        chatWidget.classList.add('scale-0');
        chatWidget.classList.remove('scale-100');
      });
      
      // Send message
      const sendMessage = () => {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
          const messagesContainer = document.getElementById('chat-messages');
          
          // Add user message
          const userMessage = document.createElement('div');
          userMessage.className = 'flex items-start mb-4 justify-end';
          userMessage.innerHTML = `
            <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-3 max-w-xs">
              <p class="text-sm text-gray-800 dark:text-gray-200">${message}</p>
            </div>
            <div class="flex-shrink-0 ml-3">
              <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                <i class="fas fa-user"></i>
              </div>
            </div>
          `;
          
          messagesContainer.appendChild(userMessage);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          
          // Clear input
          input.value = '';
          
          // Simulate tutor response after a delay
          setTimeout(() => {
            const tutorMessage = document.createElement('div');
            tutorMessage.className = 'flex items-start mb-4';
            tutorMessage.innerHTML = `
              <div class="flex-shrink-0 mr-3">
                <div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                <p class="text-sm text-gray-800 dark:text-gray-200">Thanks for your message! Our tutors typically respond within 5 minutes. In the meantime, would you like to check out our FAQ section?</p>
              </div>
            `;
            
            messagesContainer.appendChild(tutorMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }, 1000);
        }
      };
      
      document.getElementById('send-message').addEventListener('click', sendMessage);
      
      document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    };
    
    // Add notification system
    const addNotifications = () => {
      const notifications = [
        { title: 'New lesson available', message: 'Check out our new lesson on Business English!' },
        { title: 'Practice reminder', message: 'Don\'t forget to practice your vocabulary today.' },
        { title: 'Achievement unlocked', message: 'You\'ve completed 5 days in a row. Keep it up!' }
      ];
      
      // Create notification container
      const notificationContainer = document.createElement('div');
      notificationContainer.className = 'fixed top-20 right-5 z-50 w-80 space-y-2';
      document.body.appendChild(notificationContainer);
      
      // Show a random notification after 10 seconds
      setTimeout(() => {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        const notification = document.createElement('div');
        notification.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transform transition-all duration-300 translate-x-full';
        notification.innerHTML = `
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <i class="fas fa-bell text-purple-600 dark:text-purple-400"></i>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">${randomNotification.title}</p>
                          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${randomNotification.message}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button class="close-notification bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <span class="sr-only">Close</span>
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
          notification.classList.remove('translate-x-full');
        }, 100);
        
        // Add close functionality
        notification.querySelector('.close-notification').addEventListener('click', () => {
          notification.classList.add('translate-x-full');
          setTimeout(() => {
            notification.remove();
          }, 300);
        });
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
          if (notification.parentNode) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
              notification.remove();
            }, 300);
          }
        }, 5000);
      }, 10000);
    };
    
    // Add language level assessment quiz
    const addLevelAssessment = () => {
      // Create assessment button in the hero section
      const heroButtons = document.querySelector('.hero-buttons');
      if (heroButtons) {
        const assessmentButton = document.createElement('button');
        assessmentButton.className = 'mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800 focus:outline-none';
        assessmentButton.innerHTML = '<i class="fas fa-tasks mr-2"></i> Take Level Assessment';
        assessmentButton.id = 'level-assessment-btn';
        
        heroButtons.appendChild(assessmentButton);
        
        // Create modal for the assessment
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 overflow-y-auto hidden';
        modal.id = 'assessment-modal';
        modal.innerHTML = `
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      English Level Assessment
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Answer these questions to help us determine your current English level.
                      </p>
                      
                      <div class="mt-4" id="assessment-questions">
                        <div class="question active">
                          <p class="font-medium text-gray-900 dark:text-white mb-2">1. Choose the correct sentence:</p>
                          <div class="space-y-2">
                            <label class="flex items-center">
                              <input type="radio" name="q1" value="a" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">She don't like coffee.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q1" value="b" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">She doesn't like coffee.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q1" value="c" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">She not like coffee.</span>
                            </label>
                          </div>
                        </div>
                        
                        <div class="question hidden">
                          <p class="font-medium text-gray-900 dark:text-white mb-2">2. Complete the sentence: "If I _____ rich, I would travel the world."</p>
                          <div class="space-y-2">
                            <label class="flex items-center">
                              <input type="radio" name="q2" value="a" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">am</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q2" value="b" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">would be</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q2" value="c" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">were</span>
                            </label>
                          </div>
                        </div>
                        
                        <div class="question hidden">
                          <p class="font-medium text-gray-900 dark:text-white mb-2">3. Which word is a synonym for "enormous"?</p>
                          <div class="space-y-2">
                            <label class="flex items-center">
                              <input type="radio" name="q3" value="a" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">Tiny</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q3" value="b" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">Huge</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q3" value="c" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                                                          <span class="ml-2 text-gray-700 dark:text-gray-300">Beautiful</span>
                            </label>
                          </div>
                        </div>
                        
                        <div class="question hidden">
                          <p class="font-medium text-gray-900 dark:text-white mb-2">4. Choose the correct sentence:</p>
                          <div class="space-y-2">
                            <label class="flex items-center">
                              <input type="radio" name="q4" value="a" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">I've been living here since three years.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q4" value="b" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">I've been living here for three years.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q4" value="c" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">I live here since three years.</span>
                            </label>
                          </div>
                        </div>
                        
                        <div class="question hidden">
                          <p class="font-medium text-gray-900 dark:text-white mb-2">5. What is the correct passive form of "They are building a new bridge"?</p>
                          <div class="space-y-2">
                            <label class="flex items-center">
                              <input type="radio" name="q5" value="a" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">A new bridge is building.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q5" value="b" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">A new bridge is being built.</span>
                            </label>
                            <label class="flex items-center">
                              <input type="radio" name="q5" value="c" class="h-4 w-4 text-purple-600 focus:ring-purple-500">
                              <span class="ml-2 text-gray-700 dark:text-gray-300">A new bridge has been built.</span>
                            </label>
                          </div>
                        </div>
                        
                        <div id="assessment-result" class="hidden mt-4 p-4 rounded-md">
                          <h4 class="font-medium text-lg mb-2">Your Assessment Result</h4>
                          <p class="mb-2">Based on your answers, your estimated English level is:</p>
                          <div class="text-center">
                            <span class="inline-block px-4 py-2 rounded-full text-white bg-purple-600 text-lg font-bold" id="level-result">Intermediate</span>
                          </div>
                          <p class="mt-4">We recommend starting with our:</p>
                          <div class="mt-2 text-center">
                            <a href="#courses" class="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-100 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors" id="recommended-course">Practical English Course</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" id="next-question" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Next
                </button>
                <button type="button" id="close-modal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Assessment functionality
        const assessmentBtn = document.getElementById('level-assessment-btn');
        const modal_el = document.getElementById('assessment-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const nextBtn = document.getElementById('next-question');
        const questions = document.querySelectorAll('.question');
        const result = document.getElementById('assessment-result');
        const levelResult = document.getElementById('level-result');
        const recommendedCourse = document.getElementById('recommended-course');
        
        let currentQuestion = 0;
        
        // Open modal
        assessmentBtn.addEventListener('click', () => {
          modal_el.classList.remove('hidden');
        });
        
        // Close modal
        closeModalBtn.addEventListener('click', () => {
          modal_el.classList.add('hidden');
          // Reset assessment
          currentQuestion = 0;
          questions.forEach((q, index) => {
            if (index === 0) {
              q.classList.remove('hidden');
              q.classList.add('active');
            } else {
              q.classList.add('hidden');
              q.classList.remove('active');
            }
          });
          result.classList.add('hidden');
          nextBtn.textContent = 'Next';
        });
        
        // Next question or show result
        nextBtn.addEventListener('click', () => {
          const activeQuestion = document.querySelector('.question.active');
          const radioName = `q${currentQuestion + 1}`;
          const selectedOption = document.querySelector(`input[name="${radioName}"]:checked`);
          
          // If no option selected, alert user
          if (!selectedOption && currentQuestion < questions.length - 1) {
            alert('Please select an answer before proceeding.');
            return;
          }
          
          // If last question, calculate result
          if (currentQuestion === questions.length - 1) {
            if (!selectedOption) {
              alert('Please select an answer before proceeding.');
              return;
            }
            
            // Hide last question and show result
            activeQuestion.classList.add('hidden');
            activeQuestion.classList.remove('active');
            result.classList.remove('hidden');
            
            // Calculate level based on answers
            const answers = {
              q1: document.querySelector('input[name="q1"]:checked')?.value,
              q2: document.querySelector('input[name="q2"]:checked')?.value,
              q3: document.querySelector('input[name="q3"]:checked')?.value,
              q4: document.querySelector('input[name="q4"]:checked')?.value,
              q5: document.querySelector('input[name="q5"]:checked')?.value
            };
            
            // Correct answers
            const correctAnswers = {
              q1: 'b', // She doesn't like coffee
              q2: 'c', // were
              q3: 'b', // Huge
              q4: 'b', // I've been living here for three years
              q5: 'b'  // A new bridge is being built
            };
            
            // Count correct answers
            let score = 0;
            for (const q in answers) {
              if (answers[q] === correctAnswers[q]) {
                score++;
              }
            }
            
            // Determine level based on score
            let level, course;
            if (score <= 1) {
              level = 'Beginner';
              course = 'English Fundamentals';
            } else if (score <= 3) {
              level = 'Intermediate';
              course = 'Practical English Course';
            } else {
              level = 'Advanced';
              course = 'Business English Course';
            }
            
            // Update result
            levelResult.textContent = level;
            recommendedCourse.textContent = course;
            
            // Change button text
            nextBtn.textContent = 'Take Again';
            
            // Reset for next attempt
            currentQuestion = -1;
          } else {
            // Hide current question and show next
            activeQuestion.classList.add('hidden');
            activeQuestion.classList.remove('active');
            
            currentQuestion++;
            
            questions[currentQuestion].classList.remove('hidden');
            questions[currentQuestion].classList.add('active');
            
            // Change button text on last question
            if (currentQuestion === questions.length - 1) {
              nextBtn.textContent = 'See Results';
            }
          }
        });
      }
    };
    
    // Add word of the day feature
    const addWordOfDay = () => {
      const words = [
        { word: 'Serendipity', definition: 'The occurrence of events by chance in a happy or beneficial way', example: 'It was pure serendipity that we met at the airport.' },
        { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', example: 'She gave an eloquent speech that moved the audience.' },
        { word: 'Resilience', definition: 'The capacity to recover quickly from difficulties', example: 'The resilience of the community was evident after the disaster.' },
        { word: 'Meticulous', definition: 'Showing great attention to detail; very careful and precise', example: 'He was meticulous in his preparation for the exam.' },
        { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', example: 'Mobile phones have become ubiquitous in modern society.' }
      ];
      
      // Select random word
      const randomWord = words[Math.floor(Math.random() * words.length)];
      
      // Create word of the day element
      const wordOfDayEl = document.createElement('div');
      wordOfDayEl.className = 'fixed bottom-5 left-5 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40 transform transition-transform duration-300 translate-y-full';
      wordOfDayEl.id = 'word-of-day';
      wordOfDayEl.innerHTML = `
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-sm font-medium text-purple-600 dark:text-purple-400">Word of the Day</h3>
            <button class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none" id="close-word">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-lg font-bold text-gray-900 dark:text-white">${randomWord.word}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">${randomWord.definition}</p>
          <p class="text-xs italic text-gray-500 dark:text-gray-400 mt-2">"${randomWord.example}"</p>
          <button class="mt-3 w-full px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-100 text-sm rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors" id="save-word">
            <i class="fas fa-bookmark mr-1"></i> Save to Vocabulary
          </button>
        </div>
      `;
      
      document.body.appendChild(wordOfDayEl);
      
      // Show word of the day after 15 seconds
      setTimeout(() => {
        wordOfDayEl.classList.remove('translate-y-full');
      }, 15000);
      
      // Close word of day
      document.getElementById('close-word').addEventListener('click', () => {
        wordOfDayEl.classList.add('translate-y-full');
      });
      
      // Save word functionality
      document.getElementById('save-word').addEventListener('click', (e) => {
        e.target.innerHTML = '<i class="fas fa-check mr-1"></i> Saved to Vocabulary';
        e.target.classList.add('bg-green-100', 'text-green-700', 'dark:bg-green-900', 'dark:text-green-100');
        e.target.classList.remove('bg-purple-100', 'text-purple-700', 'dark:bg-purple-900', 'dark:text-purple-100', 'hover:bg-purple-200', 'dark:hover:bg-purple-800');
        e.target.disabled = true;
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'text-xs text-green-600 dark:text-green-400 mt-1 text-center';
        confirmation.textContent = 'Word saved to your personal vocabulary list';
        e.target.parentNode.appendChild(confirmation);
      });
    };
    
    // Initialize all interactive features
    addChatWidget();
    addNotifications();
    addLevelAssessment();
    addWordOfDay();
  });
  