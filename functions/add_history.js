const createClient = require('./dbConnection.js');

module.exports = async (group_id,post_link,chat_id,to_group) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `INSERT INTO chats_history (post_link,to_group,to_chat_list) VALUES ('${post_link}', ${to_group}, ${chat_id})`;
        let res = await client.query(sql);
        client.end();
        console.log(group_id,'добавлено в историю', post_link,chat_id,to_group);
    }
    catch (e) {
        console.log(group_id, 'ошибка в add_history.js', e)
    }
};
