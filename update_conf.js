import {update_conf, get_conf} from './f_db/queries.js'
await update_conf(218358722, '4938a4a2')
console.log(await get_conf(218358722))