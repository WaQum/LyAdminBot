const got = require('got')
const { userName } = require('../utils')

const extend = got.extend({
  json: true,
  timeout: 1000,
  throwHttpErrors: false
})

module.exports = async (ctx) => {
  if (ctx.group && ctx.group.info.settings.cas === true) {
    const userId = ctx.from.id
    extend.get(`https://api.cas.chat/check?user_id=${userId}`).then(({ body }) => {
      if (body.ok === true) {
        console.log(body)
        ctx.telegram.kickChatMember(ctx.chat.id, userId)
        ctx.replyWithHTML(ctx.i18n.t('cas.banned', {
          name: userName(ctx.from, true),
          link: `https://cas.chat/query?u=${userId}`
        }), {
          reply_to_message_id: ctx.message.message_id
        })
      }
    })
  }
}
