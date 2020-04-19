const get_actions = require('./functions/get_actions.js');

async function main() {
    let group_id = 23513715;
        let post_type_own = 'official';
    console.log();

    let actions = await get_actions(group_id, post_type_own);
    console.log(actions)

}

main()

