const express = require('express');
const bodyParser = require('body-parser');
const {PORT, TEST_FLAG} = require('./config');
const app = express();

const processing = require('./processing');
const get_conf = require('./functions/get_conf.js');
const get_actions = require('./functions/get_actions.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', async (req,res) => {
    try {
        const {body} = req;

        console.log(body);

        switch (body.type) {
            case 'confirmation':
                let conf = await get_conf(body.group_id);
                res.end(conf);
                break;

            case 'wall_post_new':
                let group_id = body.group_id;
                let post_text = body.object.text;
                let post_type_own = body.object.owner_id === body.object.from_id ? "official" : "user";
                let post_link = "wall" + body.object.owner_id + "_" + body.object.id.toString();
                console.log(group_id, 'Получен пост', post_type_own, post_link, post_text);

                let actions = await get_actions(group_id, post_type_own);
                await processing(group_id, post_type_own, post_link, post_text, actions);

                res.end('ok');
                break;

            default:
                res.end('ok');
                break;
        }
    }
    catch (e) {
        console.log('ошибка в app.js')
    }

    });


app.listen(PORT, () => console.log('Hello, word'));