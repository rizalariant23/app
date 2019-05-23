function image(parent, args, context) {
    return context.prisma.user({ id: parent.id }).image()
}

function auctions(parent, args, context) {
    return context.prisma.user({ id: parent.id }).auctions()
}

function journal(parent, args, context) {
    return context.prisma.user({ id: parent.id }).journal()
}

function bids(parent, args, context) {
    return context.prisma.user({ id: parent.id }).bids()
}

function birdOwned(parent, args, context) {
    return context.prisma.user({ id: parent.id }).birdOwned()
}

function birdParent(parent, args, context) {
    return context.prisma.user({ id: parent.id }).birdParent()
}

function comments(parent, args, context) {
    return context.prisma.user({ id: parent.id }).comments()
}
  
module.exports = {
    image,
    auctions,
    bids,
    journal,
    birdOwned,
    birdParent,
    comments,
}