const fs = require("fs");

function main() {
	const day = process.argv[2];

	const partOneStartTimer = process.hrtime();
	let parOneEndTimer;

	if (!day) {
		console.log("Please provide a day");
		return;
	}

	try {
		const partOneSolutionFn = require(`./${day}/part-1-solution`);
		const partOnePuzzle = fs.readFileSync(`./${day}/puzzle.txt`);
		parOneEndTimer = process.hrtime(partOneStartTimer);
		console.log(
			`Part one: ${partOneSolutionFn(partOnePuzzle.toString())} points`
		);
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND") {
			console.log(`Part 1 not found`);
		} else {
			throw e;
		}
	}

	const partTwoStartTimer = process.hrtime();
	let partTwoEndTimer;
	try {
		const partTwoSolutionFn = require(`./${day}/part-2-solution`);
		const puzzle = fs.readFileSync(`./${day}/puzzle.txt`);
		partTwoEndTimer = process.hrtime(partTwoStartTimer);
		console.log(`Part two: ${partTwoSolutionFn(puzzle.toString())} points`);
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND") {
			console.log(`Part 2 not found`);
		} else {
			throw e;
		}
	}

	if (parOneEndTimer) {
		console.log(
			`Part one took ${parOneEndTimer[0]}s ${
				parOneEndTimer[1] / 1000000
			}ms`
		);
	}

	if (partTwoEndTimer) {
		console.log(
			`Part two took ${partTwoEndTimer[0]}s ${
				partTwoEndTimer[1] / 1000000
			}ms`
		);
	}
}

main();