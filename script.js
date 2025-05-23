document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    // Function to show section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(sectionId).classList.add('active');

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });

        // Smooth scroll to section
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle navigation clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            showSection(sectionId);
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Initialize filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter').toLowerCase();
            
            // Filter projects
            projectCards.forEach(card => {
                const technologies = card.getAttribute('data-technologies').toLowerCase();
                card.style.display = filter === 'all' || technologies.includes(filter) ? 'block' : 'none';
            });
        });
    });

    // Show all projects initially
    document.querySelector('[data-filter="all"]').click();

    // Handle scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animate skill percentages on hover
    document.querySelectorAll('.skill-card').forEach(card => {
        const percentageSpan = card.querySelector('.skill-progress span');
        const targetValue = parseInt(percentageSpan.getAttribute('data-value'));
        let animationFrame;
        let currentValue = 0;
        let startTime;

        card.addEventListener('mouseenter', () => {
            startTime = performance.now();
            currentValue = 0;
            percentageSpan.textContent = '0%';
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / 1500, 1); // 1.5 seconds duration
                
                currentValue = Math.floor(progress * targetValue);
                percentageSpan.textContent = `${currentValue}%`;
                
                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            }
            
            animationFrame = requestAnimationFrame(animate);
        });

        card.addEventListener('mouseleave', () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            percentageSpan.textContent = `${targetValue}%`;
        });
    });
}); 