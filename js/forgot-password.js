document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const sendCodeButton = document.querySelector('.send-code');

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
        // fetch('/api/send-reset-code', {
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

    // 表单提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 清除之前的错误提示
        clearErrors();
        
        let isValid = true;

        // 验证邮箱
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证验证码
        const verificationInput = document.getElementById('verification');
        if (!verificationInput.value) {
            showError(verificationInput, '请输入验证码');
            isValid = false;
        }

        if (isValid) {
            // TODO: 提交表单的API调用
            console.log('表单验证通过，准备提交...');
            // fetch('/api/reset-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email: emailInput.value,
            //         verificationCode: verificationInput.value
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         // 跳转到重置密码页面或显示成功消息
            //         window.location.href = '/reset-password.html';
            //     }
            // });
        }
    });

    // 辅助函数
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
});