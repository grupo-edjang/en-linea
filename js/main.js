// Funcionalidad principal del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Menú de navegación responsivo
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Slider de servicios con efecto zoom
    const sliderContainer = document.querySelector('.slider-container');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (sliderContainer && serviceCards.length > 0) {
        // Inicializar el primer servicio como activo
        serviceCards[0].classList.add('active');
        
        // Función para activar un servicio específico
        function activateService(index) {
            // Remover clase activa de todos los servicios
            serviceCards.forEach(card => card.classList.remove('active'));
            
            // Añadir clase activa al servicio seleccionado
            serviceCards[index].classList.add('active');
            
            // Calcular la posición para centrar el servicio activo
            const cardWidth = serviceCards[0].offsetWidth;
            const containerWidth = sliderContainer.offsetWidth;
            const offset = (containerWidth / 2) - (cardWidth / 2) - (index * (cardWidth + 20));
            
            // Aplicar transformación para centrar el servicio activo
            sliderContainer.style.transform = `translateX(${offset}px)`;
        }
        
        // Añadir evento de clic a cada servicio
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                activateService(index);
            });
        });
        
        // Navegación con flechas (si existen)
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (prevBtn && nextBtn) {
            let currentIndex = 0;
            
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : serviceCards.length - 1;
                activateService(currentIndex);
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex < serviceCards.length - 1) ? currentIndex + 1 : 0;
                activateService(currentIndex);
            });
        }
    }
    
    // Animaciones al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar elementos al cargar la página
    checkFade();
    
    // Verificar elementos al hacer scroll
    window.addEventListener('scroll', checkFade);
});
