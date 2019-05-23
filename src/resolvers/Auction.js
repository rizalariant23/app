function bird(parent, args, context) {
    return context.prisma.auction({ id: parent.id }).bird()
}

function seller(parent, args, context) {
    return context.prisma.auction({ id: parent.id }).seller()
}

function bids(parent, args, context) {
    return context.prisma.auction({ id: parent.id }).bids()
}

function lastBid(parent, args, context) {
    return context.prisma.auction({ id: parent.id }).lastBid()
}

function comments(parent, args, context) {
    return context.prisma.auction({ id: parent.id }).comments()
}
  
module.exports = {
    bird,
    seller,
    bids,
    lastBid,
    comments,
}