import axios from 'axios'
import { check_history as was_sent, add_history } from '../f_db/queries.js'

export const send_broadcast = async (group_id, post_link, action) => {
  try {
    if (await was_sent(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type)) {
      return false
    }
    const data = JSON.stringify({
      message: {
        message: action.text,
        attachment: [post_link],
        ...(action.keyboard && { keyboard: action.keyboard }),
      },
      list_ids: [action.to_chat_list],
      run_now: 1,
    })

    const options = {
      method: 'POST',
      url: `https://broadcast.vkforms.ru/api/v2/broadcast?token=${action.to_token}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }
    try {
      let res = await axios(options)
      console.log(group_id, 'рассылка отправлена. Статус', res.status, post_link)
      await add_history(action.from_group, post_link, action.to_chat_list, action.to_group, action.action_type)
      return true
    } catch (error) {
      console.log(group_id, 'рассылка не отправлена. Статус', error.response.status, post_link)
      return false
    }
  } catch (e) {
    console.log(group_id, 'ошибка в send_broadcast.js', e)
    return false
  }
}
