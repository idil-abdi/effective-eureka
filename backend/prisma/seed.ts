import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({connectionString})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter})

const main = async () => {
    const userOne = await prisma.user.upsert({
        where: { email: 'john123@test.com'},
        update: {},
        create: {
            username: 'John',
            email: 'john123@test.com',
            password: '123',
            
        }
    });


    const CategoryOne = await prisma.category.create({
        data: {
            name: "work",
            icon: "💼",
            userId: userOne.id
        }
    })

    console.log({ userOne, CategoryOne});
    console.log('Seeding finished successfully.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });