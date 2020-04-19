const createClient = require('./dbConnection.js');

module.exports = async (group_id,post_link,to_chat_list,to_group, action_type) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `INSERT INTO history (post_link,to_group,to_chat_list, action_type) VALUES ('${post_link}', ${to_group}, ${to_chat_list}, '${action_type}')`;
        await client.query(sql);
        client.end();
        console.log(group_id,'добавлено в историю', post_link,to_chat_list,to_group);
    }
    catch (e) {
        console.log(group_id, 'ошибка в add_history.js', e)
    }
};
