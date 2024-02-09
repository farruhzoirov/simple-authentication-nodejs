'use strict'

// Variables
const loginForm = document.getElementById('login-form');
const loginNameInput = document.getElementById('login-name');
const loginPasswordInput = document.getElementById('login-password');

const signUpForm = document.getElementById('signup-form');
const signUpNameInput = document.getElementById('signup-name');
const signUpPasswordInput = document.getElementById('signup-password');

const loginWarner = document.getElementById('login-warner')
const signUpWarner = document.getElementById('signup-warner');
const signUpHandler = (body) => {
  fetch('http://localhost:5000/sign-up', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
      .then(res => res.json())
      .then(res => {
        if (!res.ok) {
          signUpWarner.style.color = 'red'
          signUpWarner.textContent = 'That user already exists enter Login tab'
          return;
        }
        if (res.ok) {
          alert('You were registered successfully!')
        }
      })
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = {
    name:loginNameInput.value,
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
        if(!res.ok) {
          loginWarner.style.color = 'red';
          loginWarner.textContent = 'Username or password is incorrect';
          return;
        }
        if (res.ok) {
          location.href = '../views/main.html'
        }
      })
})

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = {
    name: signUpNameInput.value,
    password: signUpPasswordInput.value
  }
  signUpHandler(body)
})


