document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    const blogPosts = document.querySelectorAll('.blog-post');
    const categoriesList = document.querySelector('.categories-list');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const subscribeForm = document.querySelector('.subscribe-form');
    let currentPage = 1;
    const postsPerPage = 6; // 每页显示6篇文章

    // 图片懒加载系统
    class ImageLazyLoader {
        constructor() {
            this.images = document.querySelectorAll('.post-image img');
            this.initializeLazyLoading();
        }

        initializeLazyLoading() {
            const options = {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, options);

            this.images.forEach(img => {
                img.dataset.src = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                observer.observe(img);
            });
        }
    }

    // 阅读进度追踪器
    class ReadingProgressTracker {
        constructor() {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'reading-progress';
            document.body.appendChild(this.progressBar);
            this.initializeProgressBar();
        }

        initializeProgressBar() {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.clientHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrolled = window.scrollY;
                const progress = (scrolled / documentHeight) * 100;
                this.progressBar.style.width = `${progress}%`;
            });
        }
    }

    // 动画管理器
    class AnimationManager {
        constructor() {
            this.animatedElements = document.querySelectorAll('.animate-on-scroll');
            this.initializeAnimations();
        }

        initializeAnimations() {
            const options = {
                threshold: 0.2
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, options);

            this.animatedElements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // 文章管理系统
    class PostManager {
        constructor() {
            this.posts = Array.from(blogPosts);
            this.filteredPosts = this.posts;
            this.currentFilters = {
                category: 'all',
                search: '',
                tag: ''
            };
            this.initializePostCounts();
            this.initializePostAnalytics();
        }

        initializePostCounts() {
            const categories = {};
            this.posts.forEach(post => {
                const category = post.querySelector('.post-category').textContent.toLowerCase();
                categories[category] = (categories[category] || 0) + 1;
            });

            document.querySelectorAll('.categories-list li').forEach(item => {
                const category = item.dataset.category;
                const countSpan = item.querySelector('.post-count');
                if (countSpan && categories[category]) {
                    countSpan.textContent = categories[category];
                }
            });
        }

        initializePostAnalytics() {
            this.posts.forEach(post => {
                post.addEventListener('click', () => {
                    this.trackPostEngagement(post);
                });
            });
        }

        trackPostEngagement(post) {
            const postId = post.dataset.id;
            const analytics = {
                postId,
                timestamp: new Date().toISOString(),
                action: 'click'
            };
            console.log('Post engagement:', analytics);
            // 这里可以添加实际的分析数据发送逻辑
        }

        filterPosts() {
            this.filteredPosts = this.posts.filter(post => {
                const category = post.querySelector('.post-category').textContent.toLowerCase();
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const searchTerm = this.currentFilters.search.toLowerCase();
                const tags = post.dataset.tags ? post.dataset.tags.toLowerCase().split(',') : [];
                
                const matchesCategory = this.currentFilters.category === 'all' || 
                                      category === this.currentFilters.category;
                const matchesSearch = searchTerm === '' || 
                                    title.includes(searchTerm) || 
                                    excerpt.includes(searchTerm);
                const matchesTag = this.currentFilters.tag === '' || 
                                 tags.includes(this.currentFilters.tag);

                return matchesCategory && matchesSearch && matchesTag;
            });

            this.updateUI();
        }

        updateUI() {
            this.posts.forEach(post => {
                post.style.display = 'none';
                post.classList.remove('fade-up');
            });

            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            
            this.filteredPosts.slice(startIndex, endIndex).forEach((post, index) => {
                post.style.display = 'block';
                setTimeout(() => {
                    post.classList.add('fade-up');
                }, index * 100);
            });

            this.updatePagination();
            this.updateResultsCount();
            this.showNoResultsMessage();
        }

        updatePagination() {
            const totalPages = Math.ceil(this.filteredPosts.length / postsPerPage);
            const paginationContainer = document.querySelector('.pagination');
            
            if (!paginationContainer) return;

            let paginationHTML = `
                <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;

            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }

            if (startPage > 1) {
                paginationHTML += `
                    <button class="page-btn" data-page="1">1</button>
                    ${startPage > 2 ? '<span class="page-dots">...</span>' : ''}
                `;
            }

            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += `
                    <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                            data-page="${i}">${i}</button>
                `;
            }

            if (endPage < totalPages) {
                paginationHTML += `
                    ${endPage < totalPages - 1 ? '<span class="page-dots">...</span>' : ''}
                    <button class="page-btn" data-page="${totalPages}">${totalPages}</button>
                `;
            }

            paginationHTML += `
                <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;

            paginationContainer.innerHTML = paginationHTML;
            this.addPaginationEvents();
        }

        addPaginationEvents() {
            const pagination = document.querySelector('.pagination');
            if (!pagination) return;

            pagination.addEventListener('click', (e) => {
                const target = e.target.closest('.page-btn');
                if (!target) return;

                if (target.classList.contains('prev-btn')) {
                    this.goToPage(currentPage - 1);
                } else if (target.classList.contains('next-btn')) {
                    this.goToPage(currentPage + 1);
                } else {
                    const page = parseInt(target.dataset.page);
                    this.goToPage(page);
                }
            });
        }

        goToPage(page) {
            const totalPages = Math.ceil(this.filteredPosts.length / postsPerPage);
            if (page < 1 || page > totalPages || page === currentPage) return;
            
            currentPage = page;
            this.updateUI();
            
            window.scrollTo({
                top: document.querySelector('.blog-grid').offsetTop - 100,
                behavior: 'smooth'
            });
        }

        updateResultsCount() {
            const resultsCount = document.querySelector('.results-count');
            if (resultsCount) {
                resultsCount.textContent = `显示 ${this.filteredPosts.length} 篇文章`;
            }
        }

        showNoResultsMessage() {
            const noResults = document.querySelector('.no-results');
            if (this.filteredPosts.length === 0) {
                if (!noResults) {
                    const message = document.createElement('div');
                    message.className = 'no-results';
                    message.textContent = '没有找到匹配的文章';
                    document.querySelector('.blog-grid').appendChild(message);
                }
            } else if (noResults) {
                noResults.remove();
            }
        }

        setFilter(type, value) {
            this.currentFilters[type] = value;
            currentPage = 1;
            this.filterPosts();
        }
    }

    // 搜索处理器
    class SearchHandler {
        constructor(input, button) {
            this.input = input;
            this.button = button;
            this.timeout = null;
            this.initializeEventListeners();
        }

        initializeEventListeners() {
            if (this.input && this.button) {
                this.button.addEventListener('click', () => this.performSearch());
                this.input.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') {
                        this.performSearch();
                    } else {
                        this.handleSearchDebounce();
                    }
                });
            }
        }

        handleSearchDebounce() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.performSearch();
            }, 500);
        }

        performSearch() {
            const searchTerm = this.input.value.trim();
            postManager.setFilter('search', searchTerm);
        }
    }

    // 分享系统
    class ShareSystem {
        constructor() {
            this.initializeShareButtons();
        }

        initializeShareButtons() {
            document.querySelectorAll('.share-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleShare(button);
                });
            });
        }

        handleShare(button) {
            const post = button.closest('.blog-post');
            const title = post.querySelector('.post-title').textContent;
            const url = window.location.href;
            const description = post.querySelector('.post-excerpt').textContent;

            const shareData = {
                title: title,
                text: description,
                url: url
            };

            if (navigator.share) {
                navigator.share(shareData).catch(console.error);
            } else {
                this.showShareDialog(shareData);
            }
        }

        showShareDialog(shareData) {
            const dialog = document.createElement('div');
            dialog.className = 'share-dialog';
            dialog.innerHTML = `
                <div class="share-dialog-content">
                    <h3>分享到</h3>
                    <div class="share-options">
                        <button class="share-option" data-platform="weixin">
                            <i class="fab fa-weixin"></i> 微信
                        </button>
                        <button class="share-option" data-platform="weibo">
                            <i class="fab fa-weibo"></i> 微博
                        </button>
                        <button class="share-option" data-platform="qzone">
                            <i class="fab fa-qq"></i> QQ空间
                        </button>
                    </div>
                    <button class="close-dialog">关闭</button>
                </div>
            `;

            document.body.appendChild(dialog);

            dialog.querySelector('.close-dialog').addEventListener('click', () => {
                dialog.remove();
            });

            dialog.querySelectorAll('.share-option').forEach(option => {
                option.addEventListener('click', () => {
                    const platform = option.dataset.platform;
                    this.shareToSocialMedia(platform, shareData);
                    dialog.remove();
                });
            });
        }

        shareToSocialMedia(platform, data) {
            const urls = {
                weixin: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.url)}`,
                weibo: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}`,
                qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}&summary=${encodeURIComponent(data.text)}`
            };

            if (platform === 'weixin') {
                this.showWeixinQR(urls[platform]);
            } else {
                window.open(urls[platform], '_blank');
            }
        }

        showWeixinQR(qrUrl) {
            const qrDialog = document.createElement('div');
            qrDialog.className = 'weixin-qr-dialog';
            qrDialog.innerHTML = `
                <div class="qr-dialog-content">
                    <h3>微信扫码分享</h3>
                    <img src="${qrUrl}" alt="微信分享二维码">
                    <button class="close-dialog">关闭</button>
                </div>
            `;

            document.body.appendChild(qrDialog);

            qrDialog.querySelector('.close-dialog').addEventListener('click', () => {
                qrDialog.remove();
            });
        }
    }

    // 评论系统
    class CommentSystem {
        constructor() {
            this.comments = new Map();
            this.initializeComments();
        }

        initializeComments() {
            document.querySelectorAll('.blog-post').forEach(post => {
                const postId = post.dataset.id;
                this.loadComments(postId);
                this.addCommentForm(post);
            });
        }

        loadComments(postId) {
            // 模拟从服务器加载评论
            const mockComments = [
                { id: 1, text: '很好的文章！', author: '读者A', date: '2024-03-20' },
                { id: 2, text: '学习了，感谢分享', author: '读者B', date: '2024-03-21' }
            ];

            this.comments.set(postId, mockComments);
            this.renderComments(postId);
        }

        addCommentForm(post) {
            const commentSection = document.createElement('div');
            commentSection.className = 'comment-section';
            commentSection.innerHTML = `
                <h3>评论</h3>
                <form class="comment-form">
                    <input type="text" placeholder="您的昵称" required>
                    <textarea placeholder="写下您的评论..." required></textarea>
                    <button type="submit">发表评论</button>
                </form>
                <div class="comments-list"></div>
            `;

            post.appendChild(commentSection);

            commentSection.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewComment(post.dataset.id, e.target);
            });
        }

        handleNewComment(postId, form) {
            const author = form.querySelector('input').value;
            const text = form.querySelector('textarea').value;
            const date = new Date().toISOString().split('T')[0];

            const newComment = {
                id: Date.now(),
                text,
                author,
                date
            };

            const postComments = this.comments.get(postId) || [];
            postComments.push(newComment);
            this.comments.set(postId, postComments);

            this.renderComments(postId);
            form.reset();
        }

        renderComments(postId) {
            const post = document.querySelector(`[data-id="${postId}"]`);
            const commentsList = post.querySelector('.comments-list');
            const comments = this.comments.get(postId) || [];

            commentsList.innerHTML = comments.map(comment => `
                <div class="comment">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            `).join('');
        }
    }

    // 订阅系统
    class SubscriptionSystem {
        constructor(form) {
            this.form = form;
            this.subscribers = new Set();
            this.initializeEventListeners();
        }

        initializeEventListeners() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        }

        async handleSubmit(e) {
            e.preventDefault();
            const emailInput = this.form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!this.validateEmail(email)) {
                this.showMessage('请输入有效的邮箱地址', 'error');
                return;
            }

            if (this.subscribers.has(email)) {
                this.showMessage('该邮箱已经订阅', 'warning');
                return;
            }

            try {
                await this.subscribeEmail(email);
                this.subscribers.add(email);
                this.showMessage('订阅成功！感谢您的关注', 'success');
                emailInput.value = '';
            } catch (error) {
                this.showMessage('订阅失败，请稍后重试', 'error');
            }
        }

        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        async subscribeEmail(email) {
            // 模拟API调用
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
        }

        showMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.className = `subscription-message ${type}`;
            messageElement.textContent = message;
            
            this.form.appendChild(messageElement);
            setTimeout(() => messageElement.remove(), 3000);
        }
    }

    // 主题管理器
    class ThemeManager {
        constructor() {
            this.theme = localStorage.getItem('theme') || 'light';
            this.initializeTheme();
            this.initializeThemeToggle();
        }

        initializeTheme() {
            document.body.setAttribute('data-theme', this.theme);
            this.updateThemeColors();
        }

        initializeThemeToggle() {
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
            this.updateThemeColors();
        }

        updateThemeColors() {
            const colors = this.theme === 'light' ? {
                background: '#ffffff',
                text: '#333333',
                primary: '#007bff'
            } : {
                background: '#1a1a1a',
                text: '#ffffff',
                primary: '#3399ff'
            };

            document.documentElement.style.setProperty('--background-color', colors.background);
            document.documentElement.style.setProperty('--text-color', colors.text);
            document.documentElement.style.setProperty('--primary-color', colors.primary);
        }
    }

    // 初始化所有系统
    const postManager = new PostManager();
    new SearchHandler(searchInput, searchButton);
    new ShareSystem();
    new CommentSystem();
    new SubscriptionSystem(subscribeForm);
    new ThemeManager();
    new ImageLazyLoader();
    new ReadingProgressTracker();
    new AnimationManager();

    // 分类过滤器事件监听
    if (categoriesList) {
        categoriesList.addEventListener('click', function(e) {
            const categoryItem = e.target.closest('li');
            if (!categoryItem) return;

            document.querySelectorAll('.categories-list li').forEach(item => {
                item.classList.remove('active');
            });
            categoryItem.classList.add('active');

            postManager.setFilter('category', categoryItem.dataset.category);
        });
    }

    // 标签点击事件
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            postManager.setFilter('tag', this.textContent.trim());
        });
    });
});