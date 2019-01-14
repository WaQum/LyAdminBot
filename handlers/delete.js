module.exports = async (ctx) => {
  ctx.mixpanel.track('del')
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id)

  if (chatMember.status === 'creator' || chatMember.status === 'administrator') {
    ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
    if (ctx.message.reply_to_message.message_id) ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.reply_to_message.message_id)
  } else {
    ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)
  }
}