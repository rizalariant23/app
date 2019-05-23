function male(parent, args, context) {
    return context.prisma.birdParent({ id: parent.id }).male()
}

function female(parent, args, context) {
    return context.prisma.birdParent({ id: parent.id }).female()
}

function breedingRecord(parent, args, context) {
    return context.prisma.birdParent({ id: parent.id }).breedingRecord()
}

module.exports = {
    male,
    female,
    breedingRecord,
}