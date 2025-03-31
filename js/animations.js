// Funciones para el slider con efecto zoom
document.addEventListener('DOMContentLoaded', function() {
    // Slider de servicios en la página principal
    const sliderContainer = document.querySelector('.slider-container');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    
    if (sliderContainer && sliderPrev && sliderNext) {
        const serviceCards = sliderContainer.querySelectorAll('.service-card');
        let currentIndex = 0;
        const cardWidth = serviceCards[0].offsetWidth;
        const visibleCards = 3; // Número de tarjetas visibles a la vez
        
        // Función para actualizar el slider
        function updateSlider() {
            // Resetear todas las tarjetas a su tamaño normal
            serviceCards.forEach(card => {
                card.classList.remove('active');
                card.style.transform = 'scale(1)';
                card.style.opacity = '0.7';
                card.style.zIndex = '1';
            });
            
            // Hacer zoom en la tarjeta activa
            serviceCards[currentIndex].classList.add('active');
            serviceCards[currentIndex].style.transform = 'scale(1.1)';
            serviceCards[currentIndex].style.opacity = '1';
            serviceCards[currentIndex].style.zIndex = '2';
            
            // Mover el slider para centrar la tarjeta activa
            const offset = -currentIndex * (cardWidth + 20); // 20px es el espacio entre tarjetas
            sliderContainer.style.transform = `translateX(${offset}px)`;
        }
        
        // Inicializar el slider
        updateSlider();
        
        // Event listeners para los botones de navegación
        sliderPrev.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : serviceCards.length - 1;
            updateSlider();
        });
        
        sliderNext.addEventListener('click', function() {
            currentIndex = (currentIndex < serviceCards.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
        
        // Hacer que las tarjetas sean clickeables
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
    }
    
    // Animaciones de desplazamiento
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Comprobar elementos visibles al cargar la página
    checkFade();
    
    // Comprobar elementos visibles al hacer scroll
    window.addEventListener('scroll', checkFade);
    
    // Menú de navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Submenús en dispositivos móviles
    const hasSubmenu = document.querySelectorAll('.nav-menu > li > a + .submenu');
    
    hasSubmenu.forEach(submenu => {
        const parentLink = submenu.previousElementSibling;
        
        parentLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                submenu.classList.toggle('active');
            }
        });
    });
    
    // Animación para las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');
        
        if (question && answer && icon) {
            // Inicialmente ocultar todas las respuestas
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                // Alternar la visibilidad de la respuesta
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    icon.classList.add('rotate');
                } else {
                    answer.style.display = 'none';
                    icon.classList.remove('rotate');
                }
            });
        }
    });
    
    // Animación para la galería de proyectos
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-item, .project-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay, .portfolio-overlay, .project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay, .portfolio-overlay, .project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Animación para el header al hacer scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animación para los números en la sección de estadísticas
    const statItems = document.querySelectorAll('.stat-item');
    
    function animateStats() {
        statItems.forEach(item => {
            const statNumber = item.querySelector('.stat-number');
            const targetNumber = parseInt(statNumber.getAttribute('data-target'));
            const duration = 2000; // Duración de la animación en ms
            const startTime = Date.now();
            
            function updateNumber() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentNumber = Math.floor(targetNumber * progress);
                
                statNumber.textContent = currentNumber;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    statNumber.textContent = targetNumber;
                }
            }
            
            updateNumber();
        });
    }
    
    // Iniciar animación de estadísticas cuando sean visibles
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
    
    // Efecto parallax para secciones hero
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Animación para los iconos de características
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('pulse');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.remove('pulse');
            }
        });
    });
});
