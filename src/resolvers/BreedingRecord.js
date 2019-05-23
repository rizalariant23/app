function parent(parent, args, context) {
    return context.prisma.breedingRecord({ id: parent.id }).parent()
}

function log(parent, args, context) {
    return context.prisma.breedingRecord({ id: parent.id }).log()
}

module.exports = {
    parent,
    log,
}