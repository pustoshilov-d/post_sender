import { API } from 'vk-io'
import { check_history as was_sent, add_history } from '../f_db/queries.js'

export const send_to_chat = async (post_link, chat_id, action) => {
  try {
    if (await was_sent(action.from_group, post_link, chat_id, action.to_group, action.action_type)) {
      return false
    }

    try {
      const api = new API({
        token: action.to_token,
      })
      let res = await api.messages.send({
        peer_id: chat_id,
        random_id: Math.floor(Math.random() * 999999999),
        message: action.text !== null ? action.text : '',
        group_id: action.to_group,
        attachment: post_link,
      })
      await add_history(action.from_group, post_link, chat_id, action.to_group, action.action_type)
      console.log(action.from_group, 'пост отправлен', post_link, action.to_group, chat_id, res)
      return true
    } catch (error) {
      if (!error.code) {
        console.log(action.from_group, 'пост не отправлен. Ошибка без кода', error, post_link, action.to_group, chat_id)
        return false
      }
      switch (error.code) {
        case 945:
          console.log(
            action.from_group,
            'пост не отправлен. Ошибка 945. Чат закрыт',
            post_link,
            action.to_group,
            chat_id
          )
        case 7:
          console.log(
            action.from_group,
            'пост не отправлен. Ошибка 7. Бот исключён',
            post_link,
            action.to_group,
            chat_id
          )
        case 917:
          console.log(
            action.from_group,
            'пост не отправлен. Ошибка 917. Нет такого чата',
            post_link,
            action.to_group,
            chat_id
          )
        default:
          console.log(
            action.from_group,
            'пост не отправлен. Иная ошибка:',
            error.code,
            error.name,
            post_link,
            action.to_group,
            chat_id
          )
      }
      return false
    }
  } catch (e) {
    console.log(action.from_group, 'ошибка в send_to_chat.js', e)
    return false
  }
}
