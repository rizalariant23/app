const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./Utils')

async function signup(parent, args, context, info) {

    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.createUser({ ...args, password })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function updateUser(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.updateUser({
        data: {
            address: args.address,
            city: args.city,
            location: args.location,
            birthday: args.birthday,
            ktp: args.ktp,
            gender: args.gender,
            phone: args.phone,
        },
        where: {
            id: userId
        }
    })
}

async function updateUserImage(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.updateUser({
        data: {
            image: { connect: { id: args.image } },
        },
        where: {
            id: userId
        }
    })
}

async function updateUserImageKtp(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.updateUser({
        data: {
            ktpImage: { connect: { id: args.image } },
        },
        where: {
            id: userId
        }
    })
}

async function login(parent, args, context, info) {

    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function createAuction(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.createAuction({
        bird: { connect: { id: args.birdId } },
        seller: { connect: { id: userId } },
        openPrice: args.openPrice,
        closePrice: args.closePrice,
        incrementAmount: args.incrementAmount,
        startTime: args.startTime,
        closeTime: args.closeTime,
    })
}

async function updateAuctionCloseStatus(parent, args, context, info) {

    return auction = await context.prisma.updateAuction({
        data: {
            isClosed: args.status
        },
        where: {
            id: args.auctionId
        }
    })
}

async function createBird(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.createBird({
        ring: args.ring,
        name: args.name,
        type: args.type,
        owner: { connect: { id: userId } },
        breeder: args.breeder,
        species: args.species,
        gender: args.gender,
        age: args.age,
    })
}

async function createBirdWithParent(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.createBird({
        ring: args.ring,
        name: args.name,
        type: args.type,
        owner: { connect: { id: userId } },
        breeder: args.breeder,
        species: args.species,
        gender: args.gender,
        age: args.age,
        parent: { connect: { id: args.parentId } },
    })
}

async function updateBirdRelation(parent, args, context, info) {
    const userId = getUserId(context)

    return user = await context.prisma.updateUser({
        data: {
            birdOwned: { connect: { id: args.birdId } }
        },
        where: {
            id: userId
        }
    })
}

async function updateBirdInformation(parent, args, context, info) {
    return context.prisma.updateBird({
        data: {
            species: args.species,
            parent: { connect: { id: args.parentId } },
            age: args.age,
            breeder: args.breeder,
            type: args.type,
            name: args.name,
        }, 
        where: {
            id: args.birdId
        }        
    })
}

async function updateBirdImage(parent, args, context, info) {

    return bird = await context.prisma.updateBird({
        data: {
            image: {
                connect: {
                    id: args.image
                }
            }
        },
        where: {
            id: args.birdId
        }
    })
}

async function updateBirdDna(parent, args, context, info) {

    return bird = await context.prisma.updateBird({
        data: {
            dna: {
                connect: {
                    id: args.image
                }
            }
        },
        where: {
            id: args.birdId
        }
    })
}

async function createBid(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.createBid({
        auction: { connect: { id: args.auctionId } },
        bidder: { connect: { id: userId } },
        amountBid: args.amountBid,
        timeStamp: args.timeStamp,
    })
}

async function updateBidRelation(parent, args, context, info) {
    const userId = getUserId(context)

    const user = await context.prisma.updateUser({
        data: {
            bids: { connect: { id: args.bidId } }
        },
        where: {
            id: userId
        }
    })

    const auction = await context.prisma.updateAuction({
        data: {
            bids: { connect: { id: args.bidId } },
            lastBid: { connect: { id: args.bidId } }
        },
        where: {
            id: args.auctionId
        }
    })

    return "updated"
}

async function updateUserAuction(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.updateUser({
        data: {
            auctions: { connect: { id: args.auctionId } }
        },
        where: {
            id: userId
        }
    })
}

async function createComment(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.createComment({
        user: { connect: { id: userId } },
        auction: { connect: { id: args.auctionId } },
        message: args.message,
        timeStamp: args.timeStamp,
    })
}

async function updateCommentRelation(parent, args, context, info) {
    const userId = getUserId(context)

    const user = await context.prisma.updateUser({
        data: {
            comments: { connect: { id: args.commentId } },
        },
        where: {
            id: userId
        }
    })

    const auction = await context.prisma.updateAuction({
        data: {
            comments: { connect: { id: args.commentId } },
        },
        where: {
            id: args.auctionId
        }
    })

    return "updated"
}

async function createImage(parent, args, context, info) {

    return context.prisma.createImage({
        src: args.src,
        description: args.description,
    })
}

async function createBirdParent(parent, args, context, info) {

    return context.prisma.createBirdParent({
        noParent: args.noParent,
        male: { connect: { id: args.birdMaleId } },
        female: { connect: { id: args.birdFemaleId } },
    })
}

async function updateBirdParentRelation(parent, args, context, info) {
    const userId = getUserId(context)

    return user = await context.prisma.updateUser({
        data: {
            birdParent: { connect: { id: args.birdParentId } },
        },
        where: {
            id: userId
        }
    })
}

async function createBreedingRecord(parent, args, context, info) {

    return context.prisma.createBreedingRecord({
        name: args.name,
        status: args.status,
    })
}

async function updateBreedingRecordStatus(parent, args, context, info) {

    return context.prisma.updateBreedingRecord({
        data: {
            status: args.status
        },
        where: {
            id: args.breedingRecordId
        }
    })
}

async function updateBirdParentBreedingRecordRelation(parent, args, context, info) {

    return user = await context.prisma.updateBirdParent({
        data: {
            breedingRecord: { connect: { id: args.breedingRecord } }
        },
        where: {
            id: args.birdParent
        }
    })
}

async function createBreedingLog(parent, args, context, info) {

    return context.prisma.createBreedingLog({
        type: args.type,
        timeStamp: args.timeStamp,
        description: args.description,
    })
}

async function createBreedingLogHatch(parent, args, context, info) {

    return context.prisma.createBreedingLog({
        type: args.type,
        born: args.born,
        dead: args.dead,
        timeStamp: args.timeStamp,
        description: args.description,
    })
}

async function updateBreedingRecordLogRelation(parent, args, context, info) {

    return user = await context.prisma.updateBreedingRecord({
        data: {
            log: { connect: { id: args.log } },
        },
        where: {
            id: args.breedingRecord
        }
    })
}

module.exports = {
    signup,
    updateUser,
    updateUserImage,
    updateUserImageKtp,
    login,
    createAuction,
    updateAuctionCloseStatus,
    createBird,
    createBirdWithParent,
    updateBirdRelation,
    updateBirdImage,
    createBid,
    updateBidRelation,
    updateUserAuction,
    createComment,
    updateCommentRelation,
    createImage,
    updateBirdDna,
    updateBirdInformation,
    createBirdParent,
    updateBirdParentRelation,
    createBreedingRecord,
    updateBreedingRecordStatus,
    updateBirdParentBreedingRecordRelation,
    createBreedingLog,
    createBreedingLogHatch,
    updateBreedingRecordLogRelation,
}