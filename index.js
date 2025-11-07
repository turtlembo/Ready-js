const authForm = document.querySelector('#auth-form');
const authFormName = document.querySelector('#auth-form-name');
const authFormSubmit = document.querySelector('#auth-form-submit');

// const randomId = () =>{
//     return Math.floor(Math.random() * (20000 - 1 + 1)) + 1;
// }

authForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (authFormName.value === ''){
        alert('Введи имя!');
    }else{
        localStorage.setItem('logged', JSON.stringify(authFormName.value));
        location.href = "workspace.html"
        authFormName.value = '';
    }
    
})

document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.removeItem('logged');
})