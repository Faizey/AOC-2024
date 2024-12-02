module.exports = (input: string): number => {
	const rows = input
		.split("\n")
		.map((row) => row.replace("\r", "").split("   ").map(Number));
	const similarityScores: number[] = [];

	const leftCol = rows.map((row) => row[0]).sort((a, b) => a - b);
	const rightCol = rows.map((row) => row[1]).sort((a, b) => a - b);

	leftCol.forEach((l) => {
		let count = 0;

		rightCol.forEach((r) => {
			if (l === r) {
				count++;
			}
		});

		similarityScores.push(l * count);
	});

	return similarityScores.reduce((acc, curr) => acc + curr, 0);
};
