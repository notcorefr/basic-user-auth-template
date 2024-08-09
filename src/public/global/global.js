function notify(message, type) { //parameter 'type' can only be success=0 || failure=1

    const notificationElem = document.createElement('div')
    notificationElem.classList.add('notification-container');
    if (type == 0) {
        notificationElem.classList.add('notif-success');
    } else if (type == 1) {
        notificationElem.classList.add('notif-failure');
    } else {
        throw new Error(`parameter 'type' can only be success=0 || failure=1`);
    }

    notificationElem.innerHTML = `<b>${message}</b>`;
    document.body.appendChild(notificationElem);

    setTimeout(() => {
        notificationElem.remove();
    }, 10000)
}


const _notify = notify;
export { _notify as notify };