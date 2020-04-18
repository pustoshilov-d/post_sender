const createClient = require('./dbConnection.js');

module.exports = async (group_id, post_type) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM actions WHERE disable <> 'true' AND from_group = ${group_id} AND (post_type = '${post_type}' OR post_type = 'all')`;
        let res = await client.query(sql);
        client.end();
        console.log(group_id,'Получены действия', res.rowCount);

        return res.rows;
    }
    catch (e) {
        console.log(group_id, 'ошибка в get_actions.js', e)
    }
};
