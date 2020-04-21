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
            "color": "secondary"
        }]
    ]
});

console.log(keyboard);