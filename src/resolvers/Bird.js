function image(parent, args, context) {
    return context.prisma.bird({ id: parent.id }).image()
}

function owner(parent, args, context) {
    return context.prisma.bird({ id: parent.id }).owner()
}

function dna(parent, args, context) {
    return context.prisma.bird({ id: parent.id }).dna()
}

function parent(parent, args, context) {
    return context.prisma.bird({ id: parent.id }).parent()
}

module.exports = {
    image,
    owner,
    dna,
    parent,
}