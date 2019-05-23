function newAuctionSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.auction({ mutation_in: ['CREATED'] }).node()
}

function onAuctionUpdateSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.auction({ mutation_in: ['UPDATED'] }).node()
}

function newBidSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.bid({ mutation_in: ['CREATED'] }).node()
}

const newAuction = {
    subscribe: newAuctionSubscribe,
    resolve: payload => {
        return payload
    },
}

const newBid = {
    subscribe: newBidSubscribe,
    resolve: payload => {
        return payload
    },
}

const onAuctionUpdate = {
    subscribe: onAuctionUpdateSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newAuction,
    newBid,
    onAuctionUpdate,
}