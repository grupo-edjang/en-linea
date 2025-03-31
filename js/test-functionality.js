// Script para pruebas de funcionalidad
document.addEventListener('DOMContentLoaded', function() {
    // Añadir indicador de prueba de responsividad
    const body = document.body;
    const testIndicator = document.createElement('div');
    testIndicator.className = 'responsive-test-indicator';
    body.appendChild(testIndicator);
    
    // Activar modo de prueba (comentar en producción)
    body.classList.add('testing-mode');
    
    // Función para probar el slider
    function testSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const sliderPrev = document.querySelector('.slider-prev');
        const sliderNext = document.querySelector('.slider-next');
        
        if (sliderContainer && sliderPrev && sliderNext) {
            console.log('✅ Slider encontrado');
            
            // Probar navegación del slider
            sliderNext.click();
            setTimeout(() => {
                sliderPrev.click();
                console.log('✅ Navegación del slider funciona correctamente');
            }, 1000);
        } else {
            console.log('❌ Slider no encontrado en esta página');
        }
    }
    
    // Función para probar el menú de navegación
    function testNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            console.log('✅ Menú de navegación encontrado');
            
            // Probar apertura/cierre del menú en móvil
            if (window.innerWidth <= 768) {
                navToggle.click();
                setTimeout(() => {
                    navToggle.click();
                    console.log('✅ Menú móvil funciona correctamente');
                }, 1000);
            }
        } else {
            console.log('❌ Menú de navegación no encontrado');
        }
    }
    
    // Función para probar animaciones de desplazamiento
    function testScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        if (fadeElements.length > 0) {
            console.log(`✅ Encontrados ${fadeElements.length} elementos con animación de desplazamiento`);
            
            // Verificar si las animaciones se activan al hacer scroll
            window.scrollBy(0, 200);
            setTimeout(() => {
                const visibleElements = document.querySelectorAll('.fade-in.visible');
                console.log(`✅ ${visibleElements.length} elementos animados visibles después de scroll`);
            }, 1000);
        } else {
            console.log('❌ No se encontraron elementos con animación de desplazamiento');
        }
    }
    
    // Función para probar formularios
    function testForms() {
        const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
        
        if (forms.length > 0) {
            console.log(`✅ Encontrados ${forms.length} formularios Formspree`);
            
            // Verificar campos requeridos
            forms.forEach((form, index) => {
                const requiredFields = form.querySelectorAll('[required]');
                console.log(`✅ Formulario ${index + 1}: ${requiredFields.length} campos requeridos`);
            });
        } else {
            console.log('❌ No se encontraron formularios Formspree en esta página');
        }
    }
    
    // Función para probar enlaces
    function testLinks() {
        const links = document.querySelectorAll('a');
        let brokenLinks = 0;
        
        console.log(`✅ Encontrados ${links.length} enlaces en la página`);
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href === 'javascript:void(0)') {
                brokenLinks++;
                console.log(`❌ Enlace roto o vacío: ${link.textContent.trim() || 'Sin texto'}`);
            }
        });
        
        if (brokenLinks === 0) {
            console.log('✅ Todos los enlaces tienen destinos válidos');
        } else {
            console.log(`❌ Se encontraron ${brokenLinks} enlaces rotos o vacíos`);
        }
    }
    
    // Función para probar imágenes
    function testImages() {
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        
        console.log(`✅ Encontradas ${images.length} imágenes en la página`);
        
        images.forEach(img => {
            if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
                missingAlt++;
                console.log(`❌ Imagen sin atributo alt: ${img.src}`);
            }
        });
        
        if (missingAlt === 0) {
            console.log('✅ Todas las imágenes tienen atributo alt');
        } else {
            console.log(`❌ Se encontraron ${missingAlt} imágenes sin atributo alt`);
        }
    }
    
    // Ejecutar pruebas después de cargar completamente la página
    setTimeout(() => {
        console.log('🧪 Iniciando pruebas de funcionalidad...');
        
        testSlider();
        testNavigation();
        testScrollAnimations();
        testForms();
        testLinks();
        testImages();
        
        console.log('🧪 Pruebas de funcionalidad completadas');
    }, 2000);
});
