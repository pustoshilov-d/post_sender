import { makeDBRequest } from './dbConnection.js'

export const add_history = async (group_id, post_link, to_chat_list, to_group, action_type) => {
  try {
    const sql_string = `INSERT INTO history (post_link,to_group,to_chat_list, action_type) VALUES ('${post_link}', ${to_group}, ${to_chat_list}, '${action_type}')`
    await makeDBRequest(sql_string)
    console.log(group_id, 'добавлено в историю', post_link, to_chat_list, to_group, action_type)
  } catch (e) {
    console.log(group_id, 'ошибка в add_history.js', e)
  }
}

export const check_history = async (group_id, post_link, to_chat_list, to_group, action_type) => {
  try {
    const sql_string = `SELECT * FROM history WHERE post_link='${post_link}' AND to_group=${to_group} AND to_chat_list=${to_chat_list} AND action_type ='${action_type}'`
    let res = await makeDBRequest(sql_string)
    console.log(
      group_id,
      'проверена история. Уже была:',
      res.rowCount !== 0,
      post_link,
      to_chat_list,
      to_group,
      action_type
    )
    return res.rowCount !== 0
  } catch (e) {
    console.log(group_id, 'ошибка в check_history.js', e)
  }
}

export const get_actions = async (group_id, post_type) => {
  try {
    const sql_string = `SELECT * FROM actions WHERE disable_flag is NULL AND from_group = ${group_id} AND (post_type = '${post_type}' OR post_type = 'all')`
    let res = await makeDBRequest(sql_string)
    console.log(group_id, 'Получены действия', res.rowCount)
    return res.rows
  } catch (e) {
    console.log(group_id, 'ошибка в get_actions.js', e)
  }
}

export const get_conf = async (group_id) => {
  try {
    const sql_string = `SELECT * FROM conformation WHERE group_id = ${group_id}`
    let res = await makeDBRequest(sql_string)
    console.log(group_id, 'Получен conformation', res.rows[0].message)

    return res.rows[0].message
  } catch (e) {
    console.log(group_id, 'ошибка в get_conf.js', e)
  }
}

export const update_conf = async (group_id, code) => {
  try {
    const sql_string = `UPDATE conformation SET message='${code}' WHERE group_id=${group_id}`
    await makeDBRequest(sql_string)
    console.log(group_id, 'Обновлён confirmation', code)
  } catch (e) {
    console.log(user_id, 'ошибка в update_conf.js', e)
  }
}
