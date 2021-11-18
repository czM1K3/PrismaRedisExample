const { PrismaClient } = require('@prisma/client')
const { createPrismaRedisCache } = require("prisma-redis");
const Redis = require("ioredis");

const main = async () => {
	const prisma = new PrismaClient();
	const redis = new Redis();
	prisma.$use(createPrismaRedisCache(["User"], 60*60, redis));
	const users = await prisma.user.findMany();
	console.log(users);
	redis.disconnect();
}
main();
