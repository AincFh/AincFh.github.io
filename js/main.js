window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('loaded');
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });

    // 使用全局实例
    const i18n = window.i18nManager;

    // 初始化页面翻译
    i18n.updatePageTranslations();

    // 语言切换功能
    function initLanguageSwitcher() {
        const langSwitcher = document.querySelector('.language-switcher');
        const langBtn = document.querySelector('.lang-btn');
        const currentLang = document.querySelector('.current-lang');
        const langOptions = document.querySelectorAll('.lang-option');

        // 切换下拉菜单
        langBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = langSwitcher.querySelector('.language-dropdown');
            dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
            dropdown.style.visibility = dropdown.style.opacity === '1' ? 'visible' : 'hidden';
            dropdown.style.transform = dropdown.style.opacity === '1' ? 'translateY(0)' : 'translateY(10px)';
        });

        // 选择语言
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                const langText = option.querySelector('.lang-name').textContent;
                
                // 更新当前语言显示
                currentLang.textContent = langText;
                
                // 更新选中状态
                langOptions.forEach(opt => {
                    opt.querySelector('.lang-check').style.opacity = '0';
                });
                option.querySelector('.lang-check').style.opacity = '1';
                
                // 关闭下拉菜单
                const dropdown = langSwitcher.querySelector('.language-dropdown');
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
                
                // 更新语言
                i18n.setLanguage(lang);
            });
        });

        // 点击外部关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!langSwitcher?.contains(e.target)) {
                const dropdown = langSwitcher?.querySelector('.language-dropdown');
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(10px)';
                }
            }
        });
    }

    // 初始化语言切换器
    initLanguageSwitcher();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.global-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn?.contains(e.target) && !navLinks?.contains(e.target)) {
            mobileMenuBtn?.classList.remove('active');
            navLinks?.classList.remove('active');
        }
    });

    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = 'var(--shadow-sm)';
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const animateElements = document.querySelectorAll('.animate');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => animateObserver.observe(element));

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'newsletter-message';

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = i18n.getTranslation('footer.newsletter.submitting');

                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailInput.value
                    })
                });

                if (!response.ok) throw new Error('Subscription failed');

                messageDiv.className = 'newsletter-message success';
                messageDiv.textContent = i18n.getTranslation('footer.newsletter.success');
                emailInput.value = '';
            } catch (error) {
                messageDiv.className = 'newsletter-message error';
                messageDiv.textContent = i18n.getTranslation('footer.newsletter.error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = i18n.getTranslation('footer.newsletter.submit');
                newsletterForm.appendChild(messageDiv);
                setTimeout(() => messageDiv.remove(), 5000);
            }
        });
    }

    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');
        const searchResults = document.querySelector('.search-results');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            searchTimeout = setTimeout(async () => {
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await response.json();

                    if (data.results.length === 0) {
                        searchResults.innerHTML = `<p class="no-results">${i18n.getTranslation('blog.noResults')}</p>`;
                    } else {
                        searchResults.innerHTML = data.results
                            .map(result => `
                                <div class="search-result-item">
                                    <h3><a href="${result.url}">${result.title}</a></h3>
                                    <p>${result.excerpt}</p>
                                </div>
                            `)
                            .join('');
                    }
                    searchResults.style.display = 'block';
                } catch (error) {
                    console.error('Search error:', error);
                }
            }, 300);
        });

        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    function updateMetaTags(i18n) {
        const description = i18n.getTranslation('site.description');
        const keywords = i18n.getTranslation('site.keywords');
        
        document.querySelector('meta[name="description"]').content = description;
        document.querySelector('meta[name="keywords"]').content = keywords;
        document.querySelector('meta[property="og:title"]').content = i18n.getTranslation('site.title');
        document.querySelector('meta[property="og:description"]').content = description;
    }

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加滚动类
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // 页面切换效果
    document.querySelectorAll('a').forEach(link => {
        if (link.href && link.href.startsWith(window.location.origin)) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });

    // 页面加载时的淡入效果
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // 语言切换器点击事件
    document.querySelector('.lang-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.querySelector('.language-dropdown');
        dropdown.classList.toggle('show');
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });

    // 语言切换动画
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('active')) return; // 如果点击当前语言则不执行

            // 添加选中动画
            this.classList.add('selecting');
            
            // 获取当前显示的语言文本
            const currentLang = document.querySelector('.current-lang');
            currentLang.classList.add('switching');
            
            // 获取新语言
            const newLang = this.getAttribute('data-lang');
            
            // 移除其他选项的active类
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // 添加新选项的active类
            this.classList.add('active');
            
            // 延迟执行切换，让动画有时间播放
            setTimeout(() => {
                // 实际切换语言
                window.i18nManager.setLanguage(newLang);
                
                // 移除动画类
                this.classList.remove('selecting');
                currentLang.classList.remove('switching');
                
                // 关闭下拉菜单
                document.querySelector('.language-dropdown').classList.remove('show');
            }, 300);
        });
    });
});