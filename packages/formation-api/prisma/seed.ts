import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData = [
	{
		username: "Alice",
		email: "alice@gmail.com",
	},
	{
		username: "Nilu",
		email: "nilu@gmail.com",
	},
	{
		username: "Mahmoud",
		email: "mahmoud@gmail.com",
	},
];

async function main() {
	console.log(`Start seeding ...`);
	// Delete all `User` and `Message` records
	await prisma.user.deleteMany({});

	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
