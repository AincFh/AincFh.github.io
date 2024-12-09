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

    // 筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 加载更多功能
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentItems = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const array = [...document.querySelectorAll('.gallery-item:not(.visible)')];
            
            for (let i = currentItems; i < currentItems + 3; i++) {
                if (array[i]) {
                    array[i].style.display = 'block';
                    setTimeout(() => {
                        array[i].classList.add('visible');
                    }, 100);
                }
            }
            currentItems += 3;
            
            if (currentItems >= array.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // 项目详情模态框
    const modal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    const galleryOverlays = document.querySelectorAll('.gallery-overlay');

    galleryOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-project')) {
                e.preventDefault();
                const projectData = getProjectData(this.parentElement);
                openModal(projectData);
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function getProjectData(item) {
        return {
            title: item.querySelector('h3').textContent,
            description: item.querySelector('p').textContent,
            image: item.querySelector('img').src,
            // 添加其他项目数据
        };
    }

    function openModal(data) {
        if (modal) {
            modal.querySelector('.project-title').textContent = data.title;
            modal.querySelector('.project-description').textContent = data.description;
            modal.querySelector('.main-image').src = data.image;
            modal.classList.add('active');
        }
    }
});

// 页面加载完成后的处理
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 头部内容动画
    setTimeout(() => {
        document.querySelectorAll('.gallery-header-content > *').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 300);
});

function showModal() {
    document.querySelector('.project-modal').classList.add('show');
}

function hideModal() {
    document.querySelector('.project-modal').classList.remove('show');
}