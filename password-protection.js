// Password Protection System for Kelly Calculator
// This script provides client-side password protection for all pages

(function() {
    'use strict';
    
    // Configuration
    const PASSWORD = 'angel'; // Change this to your desired password
    const SESSION_KEY = 'kelly_calc_authenticated';
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Check if user is already authenticated
    function isAuthenticated() {
        const authData = localStorage.getItem(SESSION_KEY);
        if (!authData) return false;
        
        try {
            const parsed = JSON.parse(authData);
            const now = Date.now();
            return parsed.timestamp && (now - parsed.timestamp) < SESSION_DURATION;
        } catch (e) {
            return false;
        }
    }
    
    // Set authentication session
    function setAuthenticated() {
        const authData = {
            timestamp: Date.now(),
            authenticated: true
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(authData));
    }
    
    // Clear authentication
    function clearAuthentication() {
        localStorage.removeItem(SESSION_KEY);
    }
    
    // Create password prompt modal
    function createPasswordModal() {
        const modal = document.createElement('div');
        modal.id = 'password-modal';
        modal.innerHTML = `
            <div class="password-overlay">
                <div class="password-modal">
                    <div class="password-header">
                        <div class="password-logo">🔒</div>
                        <h2>Kelly Position Sizing Calculator</h2>
                        <p>Please enter the password to access this application</p>
                    </div>
                    <div class="password-form">
                        <input type="password" id="password-input" placeholder="Enter password" autocomplete="current-password">
                        <button id="password-submit" type="button">Access Calculator</button>
                        <div id="password-error" class="password-error" style="display: none;">
                            Incorrect password. Please try again.
                        </div>
                    </div>
                    <div class="password-footer">
                        <small>This application is password protected for authorized users only.</small>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .password-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            
            .password-modal {
                background: white;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 400px;
                width: 90%;
                text-align: center;
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .password-header {
                margin-bottom: 30px;
            }
            
            .password-logo {
                font-size: 48px;
                margin-bottom: 16px;
            }
            
            .password-header h2 {
                font-size: 24px;
                font-weight: 600;
                color: #1b1f24;
                margin: 0 0 8px 0;
            }
            
            .password-header p {
                color: #6b7280;
                margin: 0;
                font-size: 14px;
            }
            
            .password-form {
                margin-bottom: 20px;
            }
            
            #password-input {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 16px;
                margin-bottom: 16px;
                transition: border-color 0.2s ease;
                box-sizing: border-box;
            }
            
            #password-input:focus {
                outline: none;
                border-color: #0078d4;
                box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.15);
            }
            
            #password-submit {
                width: 100%;
                padding: 12px 24px;
                background: linear-gradient(135deg, #005a9e 0%, #0078d4 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            #password-submit:hover {
                transform: translateY(-1px);
                box-shadow: 0 8px 20px rgba(0, 90, 158, 0.3);
            }
            
            #password-submit:active {
                transform: translateY(0);
            }
            
            .password-error {
                color: #ef4444;
                font-size: 14px;
                margin-top: 12px;
                padding: 8px;
                background: #fef2f2;
                border-radius: 6px;
                border: 1px solid #fecaca;
            }
            
            .password-footer {
                color: #6b7280;
                font-size: 12px;
            }
            
            @media (max-width: 480px) {
                .password-modal {
                    padding: 24px;
                    margin: 16px;
                }
                
                .password-header h2 {
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        return modal;
    }
    
    // Show password prompt
    function showPasswordPrompt() {
        // Hide the main content
        const mainContent = document.body.children;
        for (let i = 0; i < mainContent.length; i++) {
            if (mainContent[i].id !== 'password-modal') {
                mainContent[i].style.display = 'none';
            }
        }
        
        const modal = createPasswordModal();
        const passwordInput = document.getElementById('password-input');
        const submitButton = document.getElementById('password-submit');
        const errorDiv = document.getElementById('password-error');
        
        // Focus on password input
        setTimeout(() => passwordInput.focus(), 100);
        
        // Handle form submission
        function handleSubmit() {
            const enteredPassword = passwordInput.value.trim();
            
            if (enteredPassword === PASSWORD) {
                setAuthenticated();
                modal.remove();
                // Show main content
                const mainContent = document.body.children;
                for (let i = 0; i < mainContent.length; i++) {
                    mainContent[i].style.display = '';
                }
            } else {
                errorDiv.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
                // Shake animation
                modal.querySelector('.password-modal').style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    modal.querySelector('.password-modal').style.animation = '';
                }, 500);
            }
        }
        
        // Add shake animation
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(shakeStyle);
        
        // Event listeners
        submitButton.addEventListener('click', handleSubmit);
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });
        
        // Clear error on input
        passwordInput.addEventListener('input', function() {
            errorDiv.style.display = 'none';
        });
    }
    
    // Initialize password protection
    function initPasswordProtection() {
        if (!isAuthenticated()) {
            showPasswordPrompt();
        }
    }
    
    // Add logout functionality (optional)
    function addLogoutButton() {
        // Only add if there's a header or navigation area
        const header = document.querySelector('.header, .panel--header, h1');
        if (header) {
            const logoutButton = document.createElement('button');
            logoutButton.textContent = 'Logout';
            logoutButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 8px 16px;
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
                z-index: 1000;
                transition: background-color 0.2s ease;
            `;
            
            logoutButton.addEventListener('click', function() {
                if (confirm('Are you sure you want to logout?')) {
                    clearAuthentication();
                    location.reload();
                }
            });
            
            logoutButton.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#dc2626';
            });
            
            logoutButton.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#ef4444';
            });
            
            document.body.appendChild(logoutButton);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initPasswordProtection();
            addLogoutButton();
        });
    } else {
        initPasswordProtection();
        addLogoutButton();
    }
    
    // Expose functions for manual control (optional)
    window.KellyPasswordProtection = {
        logout: function() {
            clearAuthentication();
            location.reload();
        },
        isAuthenticated: isAuthenticated
    };
    
})();
