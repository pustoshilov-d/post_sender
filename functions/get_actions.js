const createClient = require('./dbConnection.js');

module.exports = async (group_id, post_type) => {
    try{
        const client = await createClient();
        console.log('res client', client)
        let res_connect = await client.connect();
        console.log('res connect', res_connect)
        const sql = `SELECT * FROM actions WHERE disable_flag is NULL AND from_group = ${group_id} AND (post_type = '${post_type}' OR post_type = 'all')`;
        let res = await client.query(sql);
        console.log(group_id,'Получены действия', res.rowCount);
        client.end();

        return res.rows;
    }
    catch (e) {
        console.log(group_id, 'ошибка в get_actions.js', e)
    }
};
