// 性能优化控制器
class PerformanceController {
    constructor() {
        this.init();
    }

    init() {
        this.initImageOptimization();
        this.initResourceHints();
        this.initPerformanceMetrics();
    }

    // 初始化图片优化
    initImageOptimization() {
        // 使用 Intersection Observer 实现图片懒加载
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        // 观察所有带有 data-src 属性的图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 加载图片
    loadImage(img) {
        // 创建新图片对象预加载
        const tempImage = new Image();
        tempImage.onload = () => {
            img.src = tempImage.src;
            img.classList.add('loaded');
        };
        tempImage.src = img.dataset.src;
    }

    // 初始化资源预加载提示
    initResourceHints() {
        // 预连接常用域名
        const domains = [
            'https://cdnjs.cloudflare.com',
            'https://fonts.googleapis.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    // 初始化性能指标监控
    initPerformanceMetrics() {
        // 监听性能指标
        if ('PerformanceObserver' in window) {
            // FCP (First Contentful Paint)
            const fcpObserver = new PerformanceObserver(list => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FCP:', entry.startTime);
                    this.reportMetric('FCP', entry.startTime);
                });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });

            // LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver(list => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('LCP:', entry.startTime);
                    this.reportMetric('LCP', entry.startTime);
                });
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // CLS (Cumulative Layout Shift)
            const clsObserver = new PerformanceObserver(list => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('CLS:', entry.value);
                    this.reportMetric('CLS', entry.value);
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    // 报告性能指标
    reportMetric(name, value) {
        // 这里可以实现实际的性能指标上报逻辑
        // 例如发送到分析服务器
        if (window.analytics) {
            window.analytics.trackPerformance({
                metric: name,
                value: value,
                timestamp: Date.now()
            });
        }
    }

    // 优化资源加载
    optimizeResourceLoading() {
        // 延迟加载非关键资源
        window.addEventListener('load', () => {
            this.loadDeferredStyles();
            this.loadDeferredScripts();
        });
    }

    // 加载延迟样式
    loadDeferredStyles() {
        const deferredStyles = document.querySelectorAll('link[rel="preload"][as="style"]');
        deferredStyles.forEach(link => {
            link.rel = 'stylesheet';
        });
    }

    // 加载延迟脚本
    loadDeferredScripts() {
        const deferredScripts = document.querySelectorAll('script[data-defer]');
        deferredScripts.forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                if (attr.name !== 'data-defer') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

// 创建性能优化控制器实例
const performanceController = new PerformanceController();

// 导出性能优化控制器
export default performanceController;