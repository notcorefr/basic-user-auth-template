import {notify} from '/public/global/global.js';

const url = window.location.origin;
const submitBtn = document.getElementById('submit');

let usernameElem = document.getElementById('username');
let passwordElem = document.getElementById('password');

submitBtn.addEventListener('click', async (e) =>{
    e.preventDefault();


    let username = usernameElem.value;
    let password = passwordElem.value;

    

    let res = await register(username, password);
    
    notify(res.message, res.notify);

    if(res.notify == 0){
        setTimeout(()=>{
            window.location.reload();
        }, 2000)
    }


})

async function register(username, password) {
    let data = {username: username, password: password}

    try {
        const response = fetch(`${url + '/auth/register'}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })

        return (await response).json()
    } catch (err) {
        console.log(err);
    }

}
