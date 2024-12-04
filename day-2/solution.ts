export function part_1(input: string) {
	const rows = input.replaceAll("\r", "").split("\n");
	let failCount = 0;

	for (const report of rows) {
		const levels = report.split(" ").map(Number);
		let direction = null;

		for (let i = 0; i < levels.length; i++) {
			const curr = levels[i];
			const next = levels[i + 1];

			if (!direction) {
				direction = curr < next ? "ASC" : "DESC";
			}

			if (Math.abs(curr - next) < 1 || Math.abs(curr - next) > 3) {
				failCount++;
				break;
			}

			if (direction === "ASC" && curr > next) {
				failCount++;
				break;
			}

			if (direction === "DESC" && curr < next) {
				failCount++;
				break;
			}
		}
	}

	return rows.length - failCount;
}

export function part_2 (input: string)  {
	const rows = input.replaceAll("\r", "").split("\n");
	let safeCount = 0;

	for (const report of rows) {
		const levels = report.split(" ").map(Number);

		for (let i = 0; i < levels.length; i++) {
			const levelsAltered = levels.filter((_, index) => index !== i);

			if (isSafe(levelsAltered)) {
				safeCount++;
				break;
			}
		}
	}

	return safeCount;
};

function isSafe(levels: number[]): boolean {
	let direction = null;

	for (let i = 0; i < levels.length; i++) {
		const curr = levels[i];
		const next = levels[i + 1];

		if (!direction) {
			direction = curr < next ? "ASC" : "DESC";
		}

		if (Math.abs(curr - next) < 1 || Math.abs(curr - next) > 3) {
			return false;
		}

		if (direction === "ASC" && curr > next) {
			return false;
		}

		if (direction === "DESC" && curr < next) {
			return false;
		}
	}

	return true;
}
