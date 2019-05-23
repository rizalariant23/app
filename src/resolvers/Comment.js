function user(parent, args, context) {
    return context.prisma.comment({ id: parent.id }).user()
}

function auction(parent, args, context) {
    return context.prisma.comment({ id: parent.id }).auction()
}
  
module.exports = {
    user,
    auction,
}