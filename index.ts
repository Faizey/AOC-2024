import fs from "fs/promises";

async function main() {
	const day = process.argv[2];

	if (!day) {
		console.log("Please provide a day");
		return;
	}

	try {
		const solutions = await import(`./${day}/solution.js`);
		const puzzle = await fs.readFile(`./${day}/puzzle.txt`);

		const part_1_timer = process.hrtime();
		const part_1_solution = solutions.part_1(puzzle.toString());
		const part_1_timer_end = process.hrtime(part_1_timer);

		console.log(`Part one: ${part_1_solution} points`);

		if (part_1_timer_end) {
			console.log(
				`Part one took ${part_1_timer_end[0]}s ${
					part_1_timer_end[1] / 1000000
				}ms`
			);
		}

		const part_2_timer = process.hrtime();
		const part_2_solution = solutions.part_2(puzzle.toString());
		const part_2_timer_end = process.hrtime(part_2_timer);

		console.log(`Part two: ${part_2_solution} points`);

		if (part_2_timer_end) {
			console.log(
				`Part two took ${part_2_timer_end[0]}s ${
					part_2_timer_end[1] / 1000000
				}ms`
			);
		}
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND") {
			console.log(`Part 1 not found`);
		} else {
			throw e;
		}
	}
}

main();
