const particlesConfig = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        // ... 其他现有的 particles 配置
    }
};

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', particlesConfig);
}); 