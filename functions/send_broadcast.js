const util = require('util');
const check_history = require('./check_history.js');
const add_history = require('./add_history.js');
const request = require('request');

module.exports = async (group_id, post_link, action) => {
    try {
        if (await check_history(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type)){

            let options = {
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

            const requestPromise = util.promisify(request);
            let error, response,response2 = await requestPromise(options);

            console.log("1 ПАРАМЕТР ", error);
            console.log('2 ПАРАМЕТР',response);
            console.log('3 ПАРАМЕТР',response2);


            if (!error){
                await add_history(action.from_group,post_link,action.to_chat_list,action.to_group, action.action_type);
                console.log(group_id, 'рассылка отправлена. Статус', JSON.parse(response.body).response.status, post_link);
            }
            else {
                console.log(group_id, 'ошибка при рассылке', error);
            }

        }
        else{
            console.log(action.from_group, 'рассылка поста уже была', post_link, action.to_group, action.to_chat_list);
            }
    }
    catch (e) {
        console.log(group_id, 'ошибка в send_broadcast.js', e)
    }
};
