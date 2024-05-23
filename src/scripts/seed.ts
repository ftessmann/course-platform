const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: 'Computer Science'},
                {name: 'Photografy'},
                {name: 'Engineering'},
                {name: 'Biology'},
                {name: 'Video'},
                {name: 'Music'},
                {name: 'Accounting'},
                {name: 'Fitness'},
                {name: 'Culinary'},
                {name: 'Design'},
            ]
        });

        console.log("Success");

    } catch (error) {
        console.log("Error sending the database category", error);
    } finally {
        await database.$disconnect();
    }
}

main();