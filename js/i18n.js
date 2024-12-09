class I18nManager {
    constructor() {
        // 获取浏览器语言
        const browserLang = this.getBrowserLanguage();
        // 从本地存储或浏览器语言中获取首选语言
        this.currentLanguage = localStorage.getItem('preferred-language') || browserLang || 'zh-CN';
        
        this.translations = {
            'zh-CN': {
                'site.title': '个人博客',
                'nav.home': '首页',
                'nav.blog': '博客',
                'nav.gallery': '图库',
                'nav.about': '关于',
                'nav.contact': '联系',
                'hero.title': '欢迎来到我的博客',
                'hero.subtitle': '分享设计与技术的故事',
                'blog.title': '最新博客',
                'blog.subtitle': '分享我的最新想法和经验',
                'gallery.title': '作品展示',
                'gallery.subtitle': '精选项目案例',
                'footer.about.title': '关于我们',
                'footer.about.desc': '我们是一个充满激情的创意团队，致力于为客户提供最优质的设计和技术解决方案。',
                'footer.quickLinks.title': '快速链接',
                'footer.contact.title': '联系方式',
                'footer.contact.email': 'contact@example.com',
                'footer.contact.phone': '(123) 456-7890',
                'footer.contact.address': '北京市朝阳区xxx街xxx号',
                'footer.followUs.title': '关注我们',
                'footer.copyright': '© 2024 个人博客. 保留所有权利.',
                'blog.readMore': '阅读更多',
                'project.viewDetails': '查看详情',
                'tech.trends.title': '2024技术趋势展望',
                'tech.trends.desc': '探讨AI、Web3.0、量子计算等前沿技术发展方向...',
                'ai.innovation.title': '人工智能的突破与创新',
                'ai.innovation.desc': '深入解析最新AI技术突破与应用场景...',
                'web3.future.title': 'Web3.0与未来互联网',
                'web3.future.desc': '探索去中心化网络与元宇宙的发展前景...',
                'project.ai.platform.title': 'AI算法可视化平台',
                'project.ai.platform.desc': '深度学习算法的可视化展示系统',
                'project.smart.city.title': '智慧城市解决方案',
                'project.smart.city.desc': '城市数据分析��可视化系统',
                'project.blockchain.title': '区块链应用平台',
                'project.blockchain.desc': '去中心化金融系统界面设计',
                'project.metaverse.title': '元宇宙交互空间',
                'project.metaverse.desc': '3D虚拟社交平台设计',
                'login.title': '登录 - 个人博客',
                'login.welcome': '欢迎回来',
                'login.subtitle': '请登录您的账号',
                'login.email.placeholder': '电子邮箱',
                'login.password.placeholder': '密码',
                'login.rememberMe': '记住我',
                'login.forgotPassword': '忘记密码？',
                'login.button': '登录',
                'login.socialLogin': '使用其他方式登录',
                'login.noAccount': '还没有账号？',
                'login.register': '立即注册',
                'register.title': '注册 - 个人博客',
                'register.header': '创建账号',
                'register.subtitle': '加入我们的社区',
                'register.username.placeholder': '用户名',
                'register.username.tip': '4-20个字符，可包含字母、数字和下划线',
                'register.email.placeholder': '电子邮箱',
                'register.password.placeholder': '密码',
                'register.password.tip': '至少8个字符，包含大小写字母、数字和特殊符号',
                'register.confirmPassword.placeholder': '确认密码',
                'register.verification.placeholder': '验证码',
                'register.sendCode': '发送验证码',
                'register.agreement': '我已阅读并同意',
                'register.terms': '《用户服务协议》',
                'register.privacy': '《隐私政策》',
                'register.button': '注册',
                'register.socialRegister': '使用其他方式注册',
                'register.hasAccount': '已有账号？',
                'register.login': '立即登录',
                'contact.title': '联系我们 - 个人博客',
                'contact.header': '联系我们',
                'contact.subtitle': '有任何问题或建议？请随时与我们联系',
                'contact.info.title': '联系方式',
                'contact.info.desc': '欢迎通过以下方式与我们取得联系，我们将尽快回复您的咨询。',
                'contact.form.title': '发送消息',
                'contact.form.name': '姓名',
                'contact.form.email': '电子邮箱',
                'contact.form.subject': '主题',
                'contact.form.message': '消息',
                'contact.form.submit': '发送消息',
                'user.welcome.title': '探索更多功能',
                'user.welcome.subtitle': '登录后即可体验完整功能',
                'user.feature.bookmark': '收藏文章',
                'user.feature.comment': '参与讨论',
                'user.feature.notification': '消息通知',
                'user.login.button': '立即登录',
                'about.header.title': '关于我们',
                'about.header.subtitle': '专注于网站开发、移动应用和数字化解决方案',
                'about.slogan': '让技术创新成为企业发展的核心驱动力',
                'about.story.title': '我们的故事',
                'about.story.content1': '我们的团队由经验丰富的设计师、开发者和产品经理组成，每个人都在各自的领域有着深厚的积累。',
                'about.story.content2': '我们善于倾听、勇于创新、精于执行，致力于为每一个项目注入独特的创意和专业的技术支持。',
                'about.values.title': '我们的价值观',
                'about.values.passion.title': '热情',
                'about.values.passion.description': '对技术的热爱驱动我们不断前进',
                'about.values.innovation.title': '��新',
                'about.values.innovation.description': '持续探索新技术和解决方案',
                'about.values.teamwork.title': '团队协作',
                'about.values.teamwork.description': '共同成长，共创价值',
                'about.team.title': '核心团队',
                'about.team.founder': '创始人 / 技术总监',
                'about.team.founder.desc': '25年互联网技术从业经验\n全栈开发专家，技术创新引领者',
                'about.team.designer': '产品设计师',
                'about.team.ux': 'UI/UX设计师',
                'about.team.backend': '后端开发工程师',
                'about.team.frontend': '前端开发工程师',
                'about.timeline.title': '发展历程',
                'about.timeline.1999.title': '创业起航',
                'about.timeline.1999.desc': '创立公司，专注企业网站建设和域名服务，成为最早一批互联网技术服务提供商。',
                'about.timeline.2001.title': '技术突破',
                'about.timeline.2001.desc': '成功开发动态网站管理系统，获得首批技术专利，服务客户突破100家。',
                'about.timeline.2024.title': '未来展望',
                'about.timeline.2024.desc': '深耕AI应用，推出新一��智能化解决方案，引领技术创新。',
                'about.timeline.2025.title': 'Web3生态',
                'about.timeline.2025.desc': '布局区块链技术，发布去中心化应用平台，构建Web3生态系统。',
                'about.timeline.2026.title': '智能生态',
                'about.timeline.2026.desc': '整合AI、IoT和区块链技术，打造全方位智能化生态系统。',
                'about.timeline.2027.title': '未来生态',
                'about.timeline.2027.desc': '构建数字孪生平台，实现虚实结合的全新数字生态体系。'
            },
            'en': {
                'site.title': 'Personal Blog',
                'nav.home': 'Home',
                'nav.blog': 'Blog',
                'nav.gallery': 'Gallery',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                'hero.title': 'Welcome to My Blog',
                'hero.subtitle': 'Sharing Stories of Design and Technology',
                'blog.title': 'Latest Posts',
                'blog.subtitle': 'Sharing My Latest Thoughts and Experiences',
                'gallery.title': 'Portfolio',
                'gallery.subtitle': 'Selected Project Cases',
                'footer.about.title': 'About Us',
                'footer.about.desc': 'We are a passionate creative team dedicated to providing the best design and technical solutions for our clients.',
                'footer.quickLinks.title': 'Quick Links',
                'footer.contact.title': 'Contact',
                'footer.contact.email': 'contact@example.com',
                'footer.contact.phone': '(123) 456-7890',
                'footer.contact.address': 'XXX Street, Chaoyang District, Beijing',
                'footer.followUs.title': 'Follow Us',
                'footer.copyright': '© 2024 Personal Blog. All rights reserved.',
                'blog.readMore': 'Read More',
                'project.viewDetails': 'View Details',
                'tech.trends.title': '2024 Technology Trends',
                'tech.trends.desc': 'Exploring AI, Web3.0, Quantum Computing and more...',
                'ai.innovation.title': 'AI Innovation Breakthroughs',
                'ai.innovation.desc': 'Deep analysis of latest AI technology breakthroughs...',
                'web3.future.title': 'Web3.0 and Future Internet',
                'web3.future.desc': 'Exploring decentralized networks and metaverse...',
                'project.ai.platform.title': 'AI Algorithm Visualization',
                'project.ai.platform.desc': 'Visual system for deep learning algorithms',
                'project.smart.city.title': 'Smart City Solutions',
                'project.smart.city.desc': 'Urban data analysis and visualization',
                'project.blockchain.title': 'Blockchain Platform',
                'project.blockchain.desc': 'DeFi system interface design',
                'project.metaverse.title': 'Metaverse Space',
                'project.metaverse.desc': '3D virtual social platform',
                'login.title': 'Login - Personal Blog',
                'login.welcome': 'Welcome Back',
                'login.subtitle': 'Please login to your account',
                'login.email.placeholder': 'Email',
                'login.password.placeholder': 'Password',
                'login.rememberMe': 'Remember me',
                'login.forgotPassword': 'Forgot Password?',
                'login.button': 'Login',
                'login.socialLogin': 'Or login with',
                'login.noAccount': "Don't have an account?",
                'login.register': 'Register Now',
                'register.title': 'Register - Personal Blog',
                'register.header': 'Create Account',
                'register.subtitle': 'Join our community',
                'register.username.placeholder': 'Username',
                'register.username.tip': '4-20 characters, can contain letters, numbers and underscores',
                'register.email.placeholder': 'Email',
                'register.password.placeholder': 'Password',
                'register.password.tip': 'At least 8 characters, including uppercase/lowercase letters, numbers and symbols',
                'register.confirmPassword.placeholder': 'Confirm Password',
                'register.verification.placeholder': 'Verification Code',
                'register.sendCode': 'Send Code',
                'register.agreement': 'I have read and agree to the',
                'register.terms': 'Terms of Service',
                'register.privacy': 'Privacy Policy',
                'register.button': 'Register',
                'register.socialRegister': 'Or register with',
                'register.hasAccount': 'Already have an account?',
                'register.login': 'Login Now',
                'contact.title': 'Contact Us - Personal Blog',
                'contact.header': 'Contact Us',
                'contact.subtitle': 'Have any questions or suggestions? Feel free to contact us',
                'contact.info.title': 'Contact Information',
                'contact.info.desc': 'Welcome to contact us through the following ways, we will reply to your inquiry as soon as possible.',
                'contact.form.title': 'Send Message',
                'contact.form.name': 'Name',
                'contact.form.email': 'Email',
                'contact.form.subject': 'Subject',
                'contact.form.message': 'Message',
                'contact.form.submit': 'Send Message',
                'user.welcome.title': 'Explore More Features',
                'user.welcome.subtitle': 'Login to experience full functionality',
                'user.feature.bookmark': 'Bookmark Articles',
                'user.feature.comment': 'Join Discussions',
                'user.feature.notification': 'Notifications',
                'user.login.button': 'Login Now',
                'about.header.title': 'About Us',
                'about.header.subtitle': 'Focused on Website Development, Mobile Applications and Digital Solutions',
                'about.slogan': 'Making technological innovation the core driver of enterprise development',
                'about.story.title': 'Our Story',
                'about.story.content1': 'Our team consists of experienced designers, developers, and product managers, each with deep expertise in their respective fields.',
                'about.story.content2': 'We excel at listening, innovating, and executing, dedicated to infusing each project with unique creativity and professional technical support.',
                'about.values.title': 'Our Values',
                'about.values.passion.title': 'Passion',
                'about.values.passion.description': 'The love of technology drives us forward',
                'about.values.innovation.title': 'Innovation',
                'about.values.innovation.description': 'Continuously exploring new technologies and solutions',
                'about.values.teamwork.title': 'Teamwork',
                'about.values.teamwork.description': 'Grow together, create value',
                'about.team.title': 'Core Team',
                'about.team.founder': 'Founder / Technical Director',
                'about.team.founder.desc': '25 years of experience in the Internet technology industry\nFull-stack development expert, technology innovation leader',
                'about.team.designer': 'Product Designer',
                'about.team.ux': 'UI/UX Designer',
                'about.team.backend': 'Backend Development Engineer',
                'about.team.frontend': 'Frontend Development Engineer',
                'about.timeline.title': 'Development History',
                'about.timeline.1999.title': 'Startup',
                'about.timeline.1999.desc': 'Founded the company, focusing on enterprise website construction and domain name services, becoming one of the earliest Internet technology service providers.',
                'about.timeline.2001.title': 'Technology Breakthrough',
                'about.timeline.2001.desc': 'Successfully developed the dynamic website management system, obtained the first batch of technology patents, and served more than 100 clients.',
                'about.timeline.2024.title': 'Future Outlook',
                'about.timeline.2024.desc': 'Deepening AI application, launching a new generation of intelligent solutions, leading technological innovation.',
                'about.timeline.2025.title': 'Web3 Ecosystem',
                'about.timeline.2025.desc': 'Deploying blockchain technology, releasing a decentralized application platform, building the Web3 ecosystem.',
                'about.timeline.2026.title': 'Intelligent Ecosystem',
                'about.timeline.2026.desc': 'Integrating AI, IoT, and blockchain technology, creating a full-dimensional intelligent ecosystem.',
                'about.timeline.2027.title': 'Future Ecosystem',
                'about.timeline.2027.desc': 'Building a digital twin platform, achieving a new digital ecosystem that combines reality and virtuality.'
            },
            'ja': {
                'site.title': '個人ブログ',
                'nav.home': 'ホーム',
                'nav.blog': 'ブログ',
                'nav.gallery': 'ギャラリー',
                'nav.about': '概要',
                'nav.contact': '連絡先',
                'hero.title': 'ブログへようこそ',
                'hero.subtitle': 'デザインとテクノロジーの物語を共有',
                'blog.title': '最新の投稿',
                'blog.subtitle': '最新の考えと経験を共有',
                'gallery.title': 'ポートフォリオ',
                'gallery.subtitle': '選択されたプロジェクト事例',
                'footer.about.title': '私たちについて',
                'footer.about.desc': '私たちは、クライアントに最高のデザインと技術ソリューションを提供することに情熱を注ぐクリエイティブチームです。',
                'footer.quickLinks.title': 'クイックリンク',
                'footer.contact.title': '連絡先',
                'footer.contact.email': 'contact@example.com',
                'footer.contact.phone': '(123) 456-7890',
                'footer.contact.address': '北京市朝陽区XXX通り',
                'footer.followUs.title': 'フォローする',
                'footer.copyright': '© 2024 個人ブログ. 全著作権所有.'
            },
            'ko': {
                'site.title': '개인 블로그',
                'nav.home': '홈',
                'nav.blog': '블로그',
                'nav.gallery': '갤러리',
                'nav.about': '소개',
                'nav.contact': '연락처',
                'hero.title': '블로그에 오신 것을 환영합니다',
                'hero.subtitle': '디자인과 기술의 이야기 공유',
                'blog.title': '최신 게시물',
                'blog.subtitle': '최신 생각과 경험 공유',
                'gallery.title': '포트폴리오',
                'gallery.subtitle': '선별된 프로젝트 사례',
                'footer.about.title': '회사 소개',
                'footer.about.desc': '우리는 고객에게 최고의 디자인과 기술 솔루션을 제공하는 데 열정을 가진 창의적인 팀입니다.',
                'footer.quickLinks.title': '빠른 링크',
                'footer.contact.title': '연락처',
                'footer.contact.email': 'contact@example.com',
                'footer.contact.phone': '(123) 456-7890',
                'footer.contact.address': '베이징시 차오양구 XXX거리',
                'footer.followUs.title': '팔로우하기',
                'footer.copyright': '© 2024 개인 블로그. 모든 권리 보유.'
            },
            'zh-TW': {
                'site.title': '個人部落格',
                'nav.home': '首頁',
                'nav.blog': '部落格',
                'nav.gallery': '圖庫',
                'nav.about': '關於',
                'nav.contact': '聯絡',
                'hero.title': '迎來到我的部落格',
                'hero.subtitle': '分享設計與技術的故事',
                'blog.title': '最新文章',
                'blog.subtitle': '分享我的最新想法和經驗',
                'gallery.title': '作品展示',
                'gallery.subtitle': '精選專案案例',
                'footer.about.title': '關於我們',
                'footer.about.desc': '我們是一個充滿熱情的創意團隊，致力於為客戶提供最優質的設計和技術解決方案。',
                'footer.quickLinks.title': '快速連結',
                'footer.contact.title': '聯絡方式',
                'footer.contact.email': 'contact@example.com',
                'footer.contact.phone': '(123) 456-7890',
                'footer.contact.address': '北京市朝陽區xxx街xxx號',
                'footer.followUs.title': '關注我們',
                'footer.copyright': '© 2024 個人部落格. 保留所有權利.'
            }
        };
        
        // 初始化时立即更新页面翻译
        this.updatePageTranslations();
        this.updateLanguageUI();
    }

    // 获取浏览器语言的方法
    getBrowserLanguage() {
        // 获取浏览器语言
        const browserLang = navigator.language || navigator.userLanguage;
        
        // 支持的语言列表
        const supportedLanguages = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'];
        
        // 处理类似 'zh-CN', 'zh', 'en-US' 等格式
        const primaryLang = browserLang.split('-')[0];
        const fullLang = browserLang.replace('_', '-'); // 处理可能的 zh_CN 格式
        
        // 优先匹配完整的语言代码
        if (supportedLanguages.includes(fullLang)) {
            return fullLang;
        }
        
        // 然后匹配主要语言代码
        switch (primaryLang) {
            case 'zh':
                // 对于中文，默认使用简体中文
                return 'zh-CN';
            case 'en':
                return 'en';
            case 'ja':
                return 'ja';
            case 'ko':
                return 'ko';
            default:
                return 'zh-CN'; // 默认使用简体中文
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('preferred-language', lang);
        this.updatePageTranslations();
        this.updateLanguageUI();
    }

    updatePageTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    updateLanguageUI() {
        // 修改导航栏显示的语言文本
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            // 只显示语言名称，不显示地区
            switch(this.currentLanguage) {
                case 'zh-CN':
                    currentLangElement.textContent = '简体中文';
                    break;
                case 'zh-TW':
                    currentLangElement.textContent = '繁體中文';
                    break;
                case 'en':
                    currentLangElement.textContent = 'English';
                    break;
                case 'ja':
                    currentLangElement.textContent = '日本語';
                    break;
                case 'ko':
                    currentLangElement.textContent = '한국어';
                    break;
                default:
                    currentLangElement.textContent = '简体中文';
            }
        }

        // 更新选中状态
        document.querySelectorAll('.lang-option').forEach(option => {
            const check = option.querySelector('.lang-check');
            if (check) {
                check.style.opacity = option.getAttribute('data-lang') === this.currentLanguage ? '1' : '0';
            }
        });

        // 更新 HTML 标签的 lang 属性
        document.documentElement.lang = this.currentLanguage;
    }
}

// 创建全局实例并立即初始化
window.i18nManager = new I18nManager();