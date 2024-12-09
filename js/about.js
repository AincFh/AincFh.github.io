document.addEventListener('DOMContentLoaded', function() {
    // 处理滚动动画
    const animatedElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 团队成员交互效果
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-social').style.opacity = '1';
            this.querySelector('.member-social').style.transform = 'translateY(0)';
        });

        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-social').style.opacity = '0';
            this.querySelector('.member-social').style.transform = 'translateY(10px)';
        });
    });

    // 价值观项目交互效果
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.backgroundPositionY = `${rate}px`;
        });
    });

    // 故事图片懒加载
    const storyImage = document.querySelector('.story-image img');
    if (storyImage) {
        const loadHighResImage = () => {
            const highResUrl = storyImage.getAttribute('data-high-res');
            if (highResUrl) {
                const img = new Image();
                img.src = highResUrl;
                img.onload = () => {
                    storyImage.src = highResUrl;
                    storyImage.classList.add('loaded');
                };
            }
        };

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadHighResImage();
                        imageObserver.unobserve(entry.target);
                    }
                });
            });
            imageObserver.observe(storyImage);
        } else {
            loadHighResImage();
        }
    }

    // 团队成员图片加载动画
    const teamImages = document.querySelectorAll('.member-image img');
    teamImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // 价值观图标动画
    const valueIcons = document.querySelectorAll('.value-item i');
    valueIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(360deg)';
        });

        icon.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0deg)';
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 响应式布局处理
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            if (entry.target.classList.contains('about-container')) {
                const width = entry.contentRect.width;
                if (width <= 768) {
                    entry.target.classList.add('mobile');
                } else {
                    entry.target.classList.remove('mobile');
                }
            }
        });
    });

    document.querySelectorAll('.about-container').forEach(container => {
        resizeObserver.observe(container);
    });
});

// 页面加载完成后的处理
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 头部内容动画
    setTimeout(() => {
        document.querySelectorAll('.about-header-content > *').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 300);
});