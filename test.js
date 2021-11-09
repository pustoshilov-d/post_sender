const DATABASE_URL = "postgres://rhwrvpylrywnwg:5843dde7efd98d3047e21ba15a207c8ed9b4defe24469efae3f9ae0e52200a53@ec2-54-246-89-234.eu-west-1.compute.amazonaws.com:5432/d4ao0q508pj19s"
const {Client} = require('pg');

function createClient () {
  try{
    return new Client({
      connectionString: DATABASE_URL,
      ssl: {sslmode: 'require',
        rejectUnauthorized: false
      }
    })
  }
  catch (e) {
    console.log('Ошибка в dbConnection.js', e);
  }
};


async function get_actions (group_id, post_type) {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM actions WHERE disable_flag is NULL AND from_group = ${group_id} AND (post_type = '${post_type}' OR post_type = 'all')`;
        let res = await client.query(sql);
        client.end();
        console.log(group_id,'Получены действия', res.rowCount);

        return res.rows;
    }
    catch (e) {
        console.log(group_id, 'ошибка в get_actions.js', e)
    }
}

async function main () {
    var res = await get_actions(23513715, "user");
    console.log(res)
}

main()
