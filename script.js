// Script para landing page oamerican fit
document.addEventListener('DOMContentLoaded', function() {
    
    // Animação de entrada suave
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Animação sequencial dos elementos
    const elements = [
        '.logo-section',
        '.description', 
        '.cta-buttons',
        '.footer'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
    
    // Efeito de clique nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito ripple
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Feedback tátil para dispositivos móveis
        button.addEventListener('touchstart', function() {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
    
    // Otimização de scroll suave
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Preload crítico para links externos
    const preloadLink1 = document.createElement('link');
    preloadLink1.rel = 'dns-prefetch';
    preloadLink1.href = 'https://ev.braip.com';
    document.head.appendChild(preloadLink1);
    
    const preloadLink2 = document.createElement('link');
    preloadLink2.rel = 'dns-prefetch';
    preloadLink2.href = 'https://wa.me';
    document.head.appendChild(preloadLink2);
    
    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
            }
        });
        observer.observe({entryTypes: ['largest-contentful-paint']});
    }
    
    // Otimização para orientação da tela
    let orientationTimeout;
    window.addEventListener('orientationchange', function() {
        clearTimeout(orientationTimeout);
        orientationTimeout = setTimeout(() => {
            // Força um reflow para corrigir possíveis problemas de layout
            document.body.style.display = 'none';
            document.body.offsetHeight; // trigger reflow
            document.body.style.display = '';
        }, 100);
    });
    
    // Cache de viewport para otimizações
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    
    window.addEventListener('resize', function() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        
        // Ajustes dinâmicos para telas muito pequenas
        if (viewportWidth < 320) {
            document.body.classList.add('ultra-small-screen');
        } else {
            document.body.classList.remove('ultra-small-screen');
        }
    });
    
    // Inicialização imediata para viewport atual
    if (viewportWidth < 320) {
        document.body.classList.add('ultra-small-screen');
    }
});

// CSS para animação ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);