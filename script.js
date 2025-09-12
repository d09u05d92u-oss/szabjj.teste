document.addEventListener('DOMContentLoaded', () => {

    // === MENU HAMBURGUER (desktop + mobile) ===
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".side-menu");

    if (toggle && menu) {
        // Lógica de toggle: usa requestAnimationFrame para uma animação mais suave
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

    // === SCRIPT PARA ROLAGEM SUAVE NO BLOG ===
    // Uso de Intersection Observer para carregar suavemente apenas se o elemento estiver visível
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
                observer.unobserve(anchor); // Remove o observador após a ativação
            }
        });
    });

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        observer.observe(anchor);
    });

    // === SLIDESHOW (vários carrosséis na mesma página) ===
    // Utiliza 'requestIdleCallback' para carregar a funcionalidade quando o navegador estiver ocioso
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            loadSlideshows();
        }, { timeout: 2000 }); // Executa em até 2 segundos, se possível
    } else {
        setTimeout(loadSlideshows, 1000); // Fallback para navegadores mais antigos
    }

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
                navPrev.setAttribute('aria-label', 'Previous Slide'); // Acessibilidade
                navPrev.addEventListener('click', () => plusSlides(-1));
                slideshow.appendChild(navPrev);

                const navNext = document.createElement('button');
                navNext.className = 'nav-btn nav-next';
                navNext.innerHTML = '&#10095;';
                navNext.setAttribute('aria-label', 'Next Slide'); // Acessibilidade
                navNext.addEventListener('click', () => plusSlides(1));
                slideshow.appendChild(navNext);
            }

            showSlides();
        });
    }

    // === Botão de voltar ao topo ===
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        // Usa Intersection Observer para um monitoramento de rolagem mais eficiente
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const topBtnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // A visibilidade do botão é controlada pelo `window.scrollY`
                // O IntersectionObserver é usado para observar a visibilidade de um elemento sentinel
                if (window.scrollY > 280) {
                    topBtn.style.display = 'block';
                } else {
                    topBtn.style.display = 'none';
                }
            });
        }, observerOptions);

        topBtnObserver.observe(document.body); // Observa a visibilidade do corpo da página

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Remove a classe "active" de todos os links do menu e adiciona ao link da página atual
    // Essa lógica pode ser executada de forma assíncrona para não bloquear a thread principal
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
});