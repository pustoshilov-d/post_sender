const util = require('util');
const check_history = require('./check_history.js');
const add_history = require('./add_history.js');
const axios = require('axios');

module.exports = async (group_id, post_link, action) => {
    try {
        if (await check_history(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type)) {

            let options;
            if (action.keyboard === null) {
                options = {
                    'method': 'POST',
                    'url': 'https://broadcast.vkforms.ru/api/v2/broadcast?token=' + action.to_token,
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "message":
                        {
                            "message": action.text,
                            "attachment": [post_link]
                        },
                        "list_ids": [action.to_chat_list],
                        "run_now": 1
                    })
                };
            }
            else {
                options = {
                    method: 'POST',
                    url: 'https://broadcast.vkforms.ru/api/v2/broadcast?token=' + action.to_token,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        "message":
                        {
                            "message": action.text,
                            "attachment": [post_link],
                            "keyboard": action.keyboard
                        },
                        "list_ids": [action.to_chat_list],
                        "run_now": 1
                    })
                };
            }

            let response = await axios(options);
            console.log('broadcast res', response)

            await add_history(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type);
            console.log(group_id, 'рассылка отправлена. Статус', JSON.parse(response.body).response.status, post_link);

        }
        else {
            console.log(action.from_group, 'рассылка поста уже была', post_link, action.to_group, action.to_chat_list);
        }
    }
    catch (e) {
        console.log(group_id, 'ошибка в send_broadcast.js', e)
    }
};
