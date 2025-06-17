const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const downloadBtn = document.getElementById('download-resume');
const loadingModal = document.getElementById('loading-modal');
const resumeText = document.getElementById('resume-text');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .nav__link.active {
        color: var(--color-navy) !important;
    }
    .nav__link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

let isRickrollInProgress = false;

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isRickrollInProgress) return;
    isRickrollInProgress = true;
    
    loadingModal.classList.add('active');
    
    const originalText = resumeText.textContent;
    resumeText.textContent = 'Preparing...';
    downloadBtn.style.pointerEvents = 'none';
    
    const loadingMessages = [
        'Preparing your resume download...',
        'Generating PDF document...',
        'Optimizing file size...',
        'Almost ready...'
    ];
    
    const modalText = loadingModal.querySelector('p');
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
            messageIndex++;
            modalText.textContent = loadingMessages[messageIndex];
        }
    }, 700);
    
    setTimeout(() => {
        clearInterval(messageInterval);
        
        loadingModal.classList.remove('active');
        resumeText.textContent = originalText;
        downloadBtn.style.pointerEvents = 'auto';
        
        const videoModal = document.getElementById('video-modal');
        const video = document.getElementById('rickroll-video');
        videoModal.classList.add('active');
        video.volume = 1;
        video.play();
        
        video.onended = function() {
            videoModal.classList.remove('active');
            isRickrollInProgress = false;
        };
        
        document.getElementById('close-video').addEventListener('click', () => {
            videoModal.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            isRickrollInProgress = false;
        });
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                video.pause();
                video.currentTime = 0;
                isRickrollInProgress = false;
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                video.pause();
                video.currentTime = 0;
                isRickrollInProgress = false;
            }
        });
    }, 3000);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .experience-card, .project-card, .award-item, .timeline__item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

document.querySelectorAll('.skill-category, .experience-card, .project-card, .award-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-4px)';
    });
});

loadingModal.addEventListener('click', (e) => {
    if (e.target === loadingModal) {
        loadingModal.classList.remove('active');
        resumeText.textContent = 'Download Resume';
        downloadBtn.style.pointerEvents = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        loadingModal.classList.remove('active');
        resumeText.textContent = 'Download Resume';
        downloadBtn.style.pointerEvents = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.hero__tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});