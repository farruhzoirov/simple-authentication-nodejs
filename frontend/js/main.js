'use strict'

// Variables
const portfolioUserName = document.querySelector('.portfolio-username')
console.dir(portfolioUserName)
const portfolioUserPassword = document.querySelector('.portfolio-password')

const loginForm = document.getElementById('login-form');
const loginNameInput = document.getElementById('login-name');
const loginPasswordInput = document.getElementById('login-password');

const signUpForm = document.getElementById('signup-form');
const signUpNameInput = document.getElementById('signup-name');
const signUpPasswordInput = document.getElementById('signup-password');

const loginWarner = document.getElementById('login-warner')
const signUpWarner = document.getElementById('signup-warner');

const successText = document.querySelector('.success-text');
const signUpWarnerFunc = () => {
    signUpWarner.style.color = 'red'
    signUpWarner.textContent = 'That user already exists!'
}

const successTextHandler = () => {
    successText.style.display = 'none'
}

const clearSignUpWarner = () => {
    signUpWarner.textContent = '';
}

const clearLoginWarner = () => {
    loginWarner.textContent = '';
}
const signUpHandler = (body) => {
    fetch('http://localhost:5000/sign-up', {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(res => {
            if (!res.ok) {
                signUpWarnerFunc();
                throw new Error('User already exists');
            }
            return res.json();
        })
        .then(res => {
            if (res.ok) {
                successText.style.display = 'block'
                successText.textContent = 'You were registered successfully!'
                setTimeout( () => {
                    successText.textContent = ''
                },1000)
                clearSignUpWarner()
            }


        })
        .catch(error => {
            console.error('Error during signup:', error.message);
        });
}

try {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const body = {
            name: loginNameInput.value,
            password: loginPasswordInput.value
        }

        fetch('http://localhost:5000/login', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.isCorrectName === false && res.isCorrectPassword) {
                    loginWarner.style.color = 'red';
                    loginWarner.textContent = 'Username is incorrect';
                    clearSignUpWarner()
                    return;
                }
                if (res.isCorrectName && res.isCorrectPassword === false) {
                    loginWarner.style.color = 'red';
                    loginWarner.textContent = 'Password is incorrect';
                    clearSignUpWarner()
                    return;
                }

                if (res.ok) {
                    successText.style.display = 'block';
                    successText.textContent = 'Logged succesfully!';
                    clearLoginWarner()
                    setTimeout( () => {
                        location.href = '../views/main.html'
                        loginNameInput.value = '';
                        loginPasswordInput.value = '';
                    }, 800)

                    if (location.href === '../views/main.html') {
                        successTextHandler()
                    }

                }
                if (!res.ok) {
                    loginWarner.style.color = 'red';
                    loginWarner.textContent = "You didn't register";
                }
            })
    })
}catch (e) {
    console.log(e)
}

try {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const body = {
            name: signUpNameInput.value,
            password: signUpPasswordInput.value
        }
        signUpHandler(body)
    })

}catch (e) {
    console.log(e)
}


