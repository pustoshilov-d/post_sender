const { VK } = require('vk-io');
const check_history = require('./check_history.js');
const add_history = require('./add_history.js');

module.exports = async (post_link, chat_id, action) => {
    try {
        const vk = new VK({
            token: action.to_token,
            apiVersion: "5.131"
        });
        if (await check_history(action.from_group, post_link, chat_id, action.to_group, action.action_type)) {

            var res = await vk.api.messages.send({
                peer_id: chat_id,
                random_id: Math.floor(Math.random() * 999999999),
                message: action.text !== null ? action.text : "",
                group_id: action.to_group,
                attachment: post_link
            });


            console.log(action.from_group, 'результат', post_link, action.to_group, chat_id, res);

            if (res.error === undefined) {
                await add_history(action.from_group, post_link, chat_id, action.to_group, action.action_type);
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
        else {
            console.log(action.from_group, 'пост сюда уже был отправлен', post_link, action.to_group, chat_id);
            return true;
        }
    }

    catch (e) {
        console.log(action.from_group, 'ошибка в send_to_chat.js', e)
    }
};
