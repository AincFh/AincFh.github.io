document.addEventListener('DOMContentLoaded', () => {
    initializeParallaxEffects();
    initializeScrollAnimations();
    initializeMouseFollowers();
    initializeSmoothScroll();
    initializeTypewriterEffect();
    initializeCounterAnimations();
    initializeImageParallax();
});

function initializeParallaxEffects() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.1;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-down, .fade-left, .fade-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.dataset.delay) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeMouseFollowers() {
    const mouseFollowers = document.querySelectorAll('.mouse-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        mouseFollowers.forEach(follower => {
            const speed = follower.dataset.speed || 0.1;
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;
            
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        });
        requestAnimationFrame(animate);
    }

    animate();
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    });
}

function initializeCounterAnimations() {
    const counterElements = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const duration = parseInt(entry.target.dataset.duration) || 2000;
                let current = 0;
                const increment = target / (duration / 16);
                
                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });

    counterElements.forEach(element => observer.observe(element));
}

function initializeImageParallax() {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxImages.forEach(image => {
            const speed = image.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            image.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

function addFadeInClass() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        element.classList.add(`delay-${index + 1}`);
        element.classList.add('animate-fadeIn');
    });
}

function addFadeUpClass() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((element, index) => {
        element.classList.add(`delay-${index + 1}`);
        element.classList.add('animate-fadeInUp');
    });
}

function addScaleInClass() {
    const elements = document.querySelectorAll('.scale-in');
    elements.forEach((element, index) => {
        element.classList.add(`delay-${index + 1}`);
        element.classList.add('animate-scaleIn');
    });
}

addFadeInClass();
addFadeUpClass();
addScaleInClass();

function someFunction() {
    // ...
}