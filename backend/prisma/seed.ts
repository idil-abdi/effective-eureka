import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { Frequency, PrismaClient } from '../src/generated/prisma/client';

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


    const CategoryOne = await prisma.category.upsert({
        where: { name: "work"},
        update: {},
        create: {
            name: "work",
            icon: "💼",
            userId: userOne.id
        }
    });

    // const taskOne = await prisma.task.create({
    //     data: {
    //         name: "Organise files",
    //         description: "organise file into three main categories",
    //         frequency: Frequency.WEEKLY,
    //         dueDay: "MONDAY"     ,
    //         categoryId: CategoryOne.id,
    //     }
    // })

    // const taskTwo = await prisma.task.create({
    //     data: {
    //         name: "Drink Water",
    //         description: "Stay hydrated throughout the day",
    //         frequency: Frequency.DAILY,
    //         dueDay: null,
    //         categoryId: CategoryOne.id,
    //     }
    // })

    const taskId = 5;
    const today = new Date();
    today.setUTCHours(0,0,0,0)
    const taskCompletionLog = await prisma.taskCompletion.upsert({
        where: {
            taskId_date: {
                taskId: taskId,
                date: today,
            }
        },
        update: {
            completed: true,
        },
        create: {
            taskId: taskId,
            date: today,
            completed: true
        }
    })
    // console.log({ userOne, CategoryOne, taskOne, taskTwo, taskCompletionLog});
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