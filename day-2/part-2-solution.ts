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

module.exports = (input: string) => {
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
