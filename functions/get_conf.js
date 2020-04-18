const createClient = require('./dbConnection.js');

module.exports = async (group_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM conformation WHERE group_id = ${group_id}`;
        let res = await client.query(sql);
        client.end();

        console.log(group_id,'Получен conformation', res.rows[0].message);

        return res.rows[0].message;
    }
    catch (e) {
        console.log(user_id, 'ошибка в get_conf.js', e)
    }
};
