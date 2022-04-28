const util = require('util');
const was_sent = require('./check_history.js');
const add_history = require('./add_history.js');
const axios = require('axios');
const { response } = require('express');

module.exports = async (group_id, post_link, action) => {
    try {
        if (!await was_sent(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type)) {
            const options = {
                method: 'POST',
                url: 'https://broadcast.vkforms.ru/api/v2/broadcast?token=' + action.to_token,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    message:
                    {
                        message: action.text,
                        attachment: [post_link],
                        ...(action.keyboard && { keyboard: action.keyboard })
                    },
                    list_ids: [action.to_chat_list],
                    run_now: 1
                })
            }
            axios(options).then((response) => {
                console.log(group_id, 'рассылка отправлена. Статус', response.status, post_link);
            }).catch((error) => {
                console.log(group_id, 'рассылка не отправлена. Статус', error.response.status, post_link);
            })
            await add_history(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type);
        }
    }
    catch (e) {
        console.log(group_id, 'ошибка в send_broadcast.js', e)
    }
};
