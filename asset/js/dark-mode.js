// // Dark mode functionality
// document.addEventListener('DOMContentLoaded', () => {
//     const darkModeToggle = document.getElementById('darkModeToggle');
//     const html = document.documentElement;
    
//     // Check for saved theme preference or use system preference
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     // Apply the right theme
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       html.classList.add('dark');
//     } else {
//       html.classList.remove('dark');
//     }
    
//     // Toggle dark/light mode
//     darkModeToggle.addEventListener('click', () => {
//       html.classList.toggle('dark');
      
//       // Save preference
//       if (html.classList.contains('dark')) {
//         localStorage.setItem('theme', 'dark');
//       } else {
//         localStorage.setItem('theme', 'light');
//       }
//     });

    
//     // Listen for system preference changes
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//       if (!localStorage.getItem('theme')) {
//         if (e.matches) {
//           html.classList.add('dark');
//         } else {
//           html.classList.remove('dark');
//         }
//       }
//     });
//   });
  



// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Function to apply dark mode
    const applyDarkMode = () => {
      html.classList.add('dark');
      // Update toggle button appearance
      const moonIcon = darkModeToggle.querySelector('.fa-moon');
      const sunIcon = darkModeToggle.querySelector('.fa-sun');
      if (moonIcon && sunIcon) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      }
      localStorage.setItem('theme', 'dark');
    };
    
    // Function to apply light mode
    const applyLightMode = () => {
      html.classList.remove('dark');
      // Update toggle button appearance
      const moonIcon = darkModeToggle.querySelector('.fa-moon');
      const sunIcon = darkModeToggle.querySelector('.fa-sun');
      if (moonIcon && sunIcon) {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
      }
      localStorage.setItem('theme', 'light');
    };
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply the right theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
    
    // Toggle dark/light mode
    darkModeToggle.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        applyLightMode();
      } else {
        applyDarkMode();
      }
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          applyDarkMode();
        } else {
          applyLightMode();
        }
      }
    });
  });
  