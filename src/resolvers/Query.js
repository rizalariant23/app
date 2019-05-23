const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./Utils')

function user(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.user({ id: userId })
}

async function getUserIdQuery(parent, args, context, info) {
    return getUserId(context)
}

function auction(parent, args, context, info) {
    return context.prisma.auction({ id: args.filter })
}

function auctions(parent, args, context, info) {
    return context.prisma.auctions()
}

function birds(parent, args, context, info) {
    return context.prisma.birds()
}

async function auctionFilter(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
        { openPrice_contains: args.filter },
        ],
    } : {}

    const auctions = await context.prisma.auctions({
        where
    })
    return auctions
}

async function birdFilterById(parent, args, context, info) {
    return context.prisma.bird({ id: args.filter })
}

async function birdParentById(parent, args, context, info) {
    return context.prisma.birdParent({ id: args.filter })
}

async function breedingRecordById(parent, args, context, info) {
    return context.prisma.breedingRecord({ id: args.filter })
}
  
module.exports = {
    user,
    getUserIdQuery,
    auction,
    auctions,
    auctionFilter,
    birds,
    birdFilterById,
    birdParentById,
    breedingRecordById,
}
