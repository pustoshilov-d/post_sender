const createClient = require('./dbConnection.js');

module.exports = async (group_id,post_link,to_chat_list,to_group, action_type) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM history WHERE post_link='${post_link}' AND to_group=${to_group} AND to_chat_list=${to_chat_list} AND action_type ='${action_type}'`;
        let res = await client.query(sql);
        client.end();
        console.log(group_id,'проверена история', res.rowCount === 0, post_link,to_chat_list,to_group, action_type);

        return res.rowCount === 0;
    }
    catch (e) {
        console.log(group_id, 'ошибка в check_history.js', e)
    }
};
