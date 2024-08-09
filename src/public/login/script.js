import { notify } from '/public/global/global.js';
const url = window.location.origin + '/auth/login';

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;


    const res = await logIn(username, password)

    if (res.notify && res.message) {
        notify(res.message, res.notify);
    }

    console.log(res);
})


async function logIn(username, password) {
    const data = {
        username: username,
        password: password,
    }

    try {
        var response = fetch(url, ({
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data),
        }))

    } catch (err) {
        console.log(err);
    }

    return (await response).json();

}