const api = require('vk-easy');
const check_history = require('./check_history.js');
const add_history = require('./add_history.js');

module.exports = async (post_link,chat_id,action) => {
    try {
        if (await check_history(action.from_group,post_link,chat_id,action.to_group, action.action_type)){

            let res = await api('messages.send', {
                peer_id: chat_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: action.text !== null ? action.text : "",
                group_id: action.to_group,
                attachment: post_link,
                access_token: action.to_token,
            });


            if (res.error === undefined){
                await add_history(action.from_group,post_link,chat_id,action.to_group, action.action_type);
                console.log(action.from_group, 'пост отправлен', post_link, action.to_group, chat_id, res);
                return true;
            }
            else if (res.error.error_code === 945) {
                console.log(action.from_group, 'пост не отправлен. Ошибка 945. Чат закрыт', post_link, action.to_group, chat_id);
                return true;
            }
            else if (res.error.error_code === 7) {
                console.log(action.from_group, 'пост не отправлен. Ошибка 7. Бот исключён', post_link, action.to_group, chat_id);
                return true;
            }
            else if (res.error.error_code === 917) {
                console.log(action.from_group, 'пост не отправлен. Ошибка 917. Нет такого чата', post_link, action.to_group, chat_id);
                return false;
            }
        }
        else{
            console.log(action.from_group, 'пост сюда уже был отправлен', post_link, action.to_group, chat_id);
            return true;
        }
    }

    catch (e) {
        console.log(action.from_group, 'ошибка в send_to_chat.js', e)
    }
};