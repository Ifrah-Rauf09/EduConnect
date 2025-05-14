import fetch from 'node-fetch';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            try {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard.html';
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Network error - please try again');
            }
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful! Please login.');
                window.location.href = '/login.html';
            } else {
                alert(result.error || 'Registration failed');
            }
        });
    }

    const handleSignup = async (email, password) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Verification email sent! Check your inbox.');
            window.location.href = 'login.html';
        }
    };

    // Now wrap the async call inside a function
    const signupAction = async () => {
        const email = "user@example.com";  // Replace with actual email
        const password = "password123";    // Replace with actual password
        await handleSignup(email, password); 
    };
    
    signupAction();
});
