

const api = require('vk-easy');
const max = 2454;  //C F G
TOKEN = "6cf827ea97f9a582b88aeecff5d739d4c0c587374866e38aeb1db78b54754e3d4a0759b4d08c49ba9a27c";
GROUP = '';


async function send(user_id, text){
    let res = await api('messages.send', {
        peer_id: user_id,
        random_id:  Math.floor(Math.random()*999999999),
        message: text,
        group_id: GROUP,
        dont_parse_links: 1,
        access_token: TOKEN,
        v: 5.103
    });

    console.log(user_id,res.error === undefined, res);

    return res.error === undefined;
}




 function main() {



     for (let i=1; i<10; i++) {

         setTimeout( function timer(){
             console.log("hello world", i);
         }, i*3000 );

         setTimeout( function timer(){
             console.log("hello world", i*2);
         }, i*3000 );
     }


}

var excel = new ActiveXObject ( "Excel.Application" ); excel.visible = true;


// main();


// function first(){
// // Симулируем задержку кода
//     setTimeout( function(){
//         console.log(1);
//     }, 20000 );
// }
// function second(){
//     console.log(2);
// }
// first();
// second();