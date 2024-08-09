
const url = 'https://j6m04g6x-4000.inc1.devtunnels.ms';
const submitBtn = document.getElementById('submit');

let usernameElem = document.getElementById('username');
let passwordElem = document.getElementById('password');
console.log(usernameElem)

submitBtn.addEventListener('click', async (e) =>{
    e.preventDefault();


    let username = usernameElem.value;
    let password = passwordElem.value;

    

    let a = await register(username, password);
    console.log(a);


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
