async function handleForgotPassword(email) {
  try {
    const response = await fetch('http://localhost:5500/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resetForm');
  if (form) {
      form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('email').value;
          await handleForgotPassword(email);
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('resetForm');
  if (form) {
      form.addEventListener('submit', async function(e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          
          try {
              const response = await fetch('http://localhost:5500/forgot-password', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email })
              });

              if (!response.ok) {
                  throw new Error('Server responded with error');
              }

              const result = await response.json();
              console.log(result);
              alert('Reset link sent! Check your email');
          } catch (error) {
              console.error('Error:', error);
              alert('Error sending request. Please try again.');
          }
      });
  }
});

document.getElementById('resetForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Reset link sent! Check your email');
      document.getElementById('success-message').style.display = 'block';
    } else {
      throw new Error(data.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Reset Link';
  }
});