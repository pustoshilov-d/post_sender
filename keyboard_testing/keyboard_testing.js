const api = require('vk-easy');
async function main() {


    let keyboard = JSON.stringify({
        one_time: false,
        buttons: [
            [{
                action: {
                    type: "open_link",
                    link: "https://vk.com/app5748831_-190214743#2523856799",
                    label: "Отписка от рассылки",
                    payload: {action: "subscribe"}
                },
            }]
        ]
    });

    console.log(keyboard);


    let res = await api('messages.send', {
        peer_id: 2000000001,
        random_id:  Math.floor(Math.random()*999999999),
        message: 'вау!',
        group_id: 188705322,
        keyboard: keyboard,
        access_token: '*****',
    });

    console.log(res);
}

main();