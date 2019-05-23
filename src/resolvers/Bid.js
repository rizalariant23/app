function auction(parent, args, context) {
    return context.prisma.bid({ id: parent.id }).auction()
}

function bidder(parent, args, context) {
    return context.prisma.bid({ id: parent.id }).bidder()
}
  
module.exports = {
    auction,
    bidder,
}