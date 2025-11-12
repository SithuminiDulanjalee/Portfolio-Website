document.addEventListener("DOMContentLoaded", function() {

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('a');

    hamburgerMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        navbar.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    }));

    const sections = document.querySelectorAll('section');
    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const navObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    const hiddenElements = document.querySelectorAll('.hidden');
    const scrollObserverOptions = {
        threshold: 0.2
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    hiddenElements.forEach(el => scrollObserver.observe(el));


    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });


    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['#8a2be2', '#a042f0', '#f0f0f0', '#5d1a96'];

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y, size, color, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speed = speed;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 1.5 + 0.5;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let color = colors[Math.floor(Math.random() * colors.length)];
            let speed = Math.random() * 1 + 0.2;
            particlesArray.push(new Particle(x, y, size, color, speed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const textToType = "Hi, I'm Sithumini Dulanjalee";
    let charIndex = 0;
    const typingSpeed = 150;

    function typeOnce() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeOnce, typingSpeed);
        }
    }

    typeOnce();
});