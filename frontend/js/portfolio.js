const portfolioUserName = document.querySelector('.portfolio-username');
const portfolioUserPassword = document.querySelector('.portfolio-password');


fetch('http://localhost:5000/portfolio', {
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST'
})
    .then(res => res.json())
    .then(res => {
        portfolioUserName.textContent = res.body.name;
        portfolioUserPassword.textContent = res.body.password;
    })
    .catch(error => {
        console.error('Error:', error);
    });
