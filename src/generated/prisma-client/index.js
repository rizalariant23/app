"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Journal",
    embedded: false
  },
  {
    name: "Transaction",
    embedded: false
  },
  {
    name: "Bird",
    embedded: false
  },
  {
    name: "BirdParent",
    embedded: false
  },
  {
    name: "BreedingRecord",
    embedded: false
  },
  {
    name: "BreedingLog",
    embedded: false
  },
  {
    name: "Image",
    embedded: false
  },
  {
    name: "Auction",
    embedded: false
  },
  {
    name: "Bid",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "AuthPayload",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/rizal/komunitas2/komunitas2`
});
exports.prisma = new exports.Prisma();
