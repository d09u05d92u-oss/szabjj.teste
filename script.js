document.addEventListener('DOMContentLoaded', () => {

    // === MENU HAMBURGUER (desktop + mobile) ===
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".side-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            // Alterna a classe 'active' tanto no menu quanto no botão
            menu.classList.toggle("active");
            toggle.classList.toggle("active"); 
        });
    }

    // Restante do seu JavaScript...
    // ... (scripts para rolagem suave, slideshow, botão voltar ao topo, etc.)

    // === SCRIPT PARA ROLAGEM SUAVE NO BLOG ===
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // === SLIDESHOW (vários carrosséis na mesma página) ===
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
            navPrev.addEventListener('click', () => plusSlides(-1));
            slideshow.appendChild(navPrev);

            const navNext = document.createElement('button');
            navNext.className = 'nav-btn nav-next';
            navNext.innerHTML = '&#10095;';
            navNext.addEventListener('click', () => plusSlides(1));
            slideshow.appendChild(navNext);
        }

        showSlides();
    });

    // === Botão de voltar ao topo ===
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 280) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Remove a classe "active" de todos os links do menu e adiciona ao link da página atual
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll("#side-menu a").forEach(link => {
        if (link.href.endsWith(currentPagePath)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});