
module.exports = async (group_id, post_link, action) => {
    try {
        let request = require('request');
        let options = {
            'method': 'POST',
            'url': 'https://broadcast.vkforms.ru/api/v2/broadcast?token='+action.to_token,
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

        request(options, function (error, response) {
            if (error) throw new Error(error);
            // console.log(response.body);
            console.log(group_id, 'рассылка отправлена. Статус', JSON.parse(response.body).response.status, post_link);
        });
    }
    catch (e) {
        console.log(group_id, 'ошибка в send_broadcast.js', e)
    }
};
