document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const sendCodeButton = document.querySelector('.send-code');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    // 密码显示/隐藏切换
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // 切换眼睛图标
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // 发送验证码倒计时
    let countdown = 60;
    let timer = null;

    function startCountdown() {
        sendCodeButton.disabled = true;
        sendCodeButton.textContent = `${countdown}秒后重新发送`;
        
        timer = setInterval(() => {
            countdown--;
            sendCodeButton.textContent = `${countdown}秒后重新发送`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                sendCodeButton.disabled = false;
                sendCodeButton.textContent = '发送验证码';
                countdown = 60;
            }
        }, 1000);
    }

    // 发送验证码
    sendCodeButton.addEventListener('click', function() {
        // 清除之前的错误提示
        clearErrors();
        
        // 验证邮箱格式
        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            showError(emailInput, '请输入有效的邮箱地址');
            return;
        }
        
        // TODO: 发送验证码的API调用
        // 这里添加发送验证码的逻辑
        // fetch('/api/send-code', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: emailInput.value
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         startCountdown();
        //     }
        // });

        // 临时直接启动倒计时
        startCountdown();
    });

    // 表单验证
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 重置所有错误提示
        clearErrors();
        
        let isValid = true;

        // 验证用户名
        if (!usernameInput.value.match(/^[a-zA-Z0-9_]{4,20}$/)) {
            showError(usernameInput, '用户名必须是4-20个字符，只能包含字母、数字和下划线');
            isValid = false;
        }

        // 验证邮箱
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证密码强度
        if (!isValidPassword(passwordInput.value)) {
            showError(passwordInput, '密码必须至少包含8个字符，包括大小写字母、数字和特殊符号');
            isValid = false;
        }

        // 验证确认密码
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, '两次输入的密码不一致');
            isValid = false;
        }

        // 验证验证码
        const verificationInput = document.getElementById('verification');
        if (!verificationInput.value) {
            showError(verificationInput, '请输入验证码');
            isValid = false;
        }

        // 验证用户协议
        const agreementCheckbox = document.querySelector('input[name="agreement"]');
        if (!agreementCheckbox.checked) {
            const agreementError = document.createElement('div');
            agreementError.className = 'error-message';
            agreementError.textContent = '请阅读并同意用户协议';
            agreementCheckbox.closest('.form-agreement').appendChild(agreementError);
            isValid = false;
        }

        if (isValid) {
            // TODO: 提交表单的API调用
            console.log('表单验证通过，准备提交...');
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         username: usernameInput.value,
            //         email: emailInput.value,
            //         password: passwordInput.value,
            //         verificationCode: verificationInput.value
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         window.location.href = '/login.html';
            //     }
            // });
        }
    });

    // 辅助函数
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        // 先清除已存在的错误消息
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        formGroup.appendChild(error);
        formGroup.classList.add('error');
    }

    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        const errorGroups = form.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
    }

    // 实时密码强度检查
    passwordInput.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        updatePasswordStrengthIndicator(strength);
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[@$!%*?&]/)) strength++;
        return strength;
    }

    function updatePasswordStrengthIndicator(strength) {
        const strengthText = ['很弱', '弱', '中等', '强', '很强'];
        const strengthClass = ['very-weak', 'weak', 'medium', 'strong', 'very-strong'];
        
        // 如果还没有强度指示器，就创建一个
        let indicator = passwordInput.parentElement.querySelector('.password-strength');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength';
            passwordInput.parentElement.appendChild(indicator);
        }
        
        if (strength > 0) {
            indicator.textContent = `密码强度: ${strengthText[strength-1]}`;
            indicator.className = `password-strength ${strengthClass[strength-1]}`;
        } else {
            indicator.textContent = '';
            indicator.className = 'password-strength';
        }
    }
});