document.addEventListener('DOMContentLoaded', () => {

    // === MENU HAMBURGUER (desktop + mobile) ===
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".side-menu");

    if (toggle && menu) {
        // Lógica de toggle
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            requestAnimationFrame(() => {
                menu.classList.toggle("active");
                toggle.classList.toggle("active");
            });
        });

        // Lógica de fechar o menu ao clicar fora dele
        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains("active")) {
                requestAnimationFrame(() => {
                    menu.classList.remove("active");
                    toggle.classList.remove("active");
                });
            }
        });
    }

    // === SCRIPT PARA ROLAGEM SUAVE NO BLOG (ÂNCORAS) ===
    // Uso de Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const anchor = entry.target;
                anchor.addEventListener("click", function(e) {
                    const target = document.querySelector(this.getAttribute("href"));
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                });
                observer.unobserve(anchor);
            }
        });
    });

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        observer.observe(anchor);
    });

    // --- Botão de Voltar ao Topo: Lógica CORRIGIDA ---
    const topBtn = document.getElementById('topBtn');
    
    if (topBtn) {
        const scrollThreshold = 280; // Altura de rolagem em pixels para o botão aparecer
        
        // 1. Lógica para mostrar/esconder o botão durante a rolagem (window.scrollY)
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        });

        // 2. Lógica para rolar para o topo ao clicar no botão
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- FIM: Botão de Voltar ao Topo ---

    // === SLIDESHOW (vários carrosséis na mesma página) ===
    // Lógica de slideshow. Esta função deve ser declarada fora da verificação de carregamento.
    // ... (O código da função loadSlideshows() está abaixo)

    // === ATIVAÇÃO DO SLIDESHOW ===
    // Utiliza 'requestIdleCallback'
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadSlideshows, { timeout: 2000 });
    } else {
        setTimeout(loadSlideshows, 1000);
    }

    // Remove a classe "active" de todos os links do menu e adiciona ao link da página atual
    setTimeout(() => {
        const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll("#side-menu a").forEach(link => {
            if (link.href.endsWith(currentPagePath)) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }, 100);
}); // Fim do 'DOMContentLoaded'

// === FUNÇÃO DE SLIDESHOW (DEVE FICAR FORA DA DOMContentLoaded PARA SER ACESSÍVEL) ===
function loadSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let slideIndex = 0;

        const showSlides = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === slideIndex);
            });
        };

        const plusSlides = (n) => {
            slideIndex += n;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            showSlides();
        };

        if (slides.length > 1) {
            const navPrev = document.createElement('button');
            navPrev.className = 'nav-btn nav-prev';
            navPrev.innerHTML = '&#10094;';
            navPrev.setAttribute('aria-label', 'Previous Slide');
            navPrev.addEventListener('click', () => plusSlides(-1));
            slideshow.appendChild(navPrev);

            const navNext = document.createElement('button');
            navNext.className = 'nav-btn nav-next';
            navNext.innerHTML = '&#10095;';
            navNext.setAttribute('aria-label', 'Next Slide');
            navNext.addEventListener('click', () => plusSlides(1));
            slideshow.appendChild(navNext);
        }

        showSlides();
    });
}
