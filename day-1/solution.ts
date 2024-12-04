export function part_1(input: string) {
	const rows = input
		.split("\n")
		.map((row) => row.replace("\r", "").split("   ").map(Number));
	const distances: number[] = [];

	const leftCol = rows.map((row) => row[0]).sort((a, b) => a - b);
	const rightCol = rows.map((row) => row[1]).sort((a, b) => a - b);

	for (let x = 0; x < rows.length; x++) {
		distances.push(Math.abs(leftCol[x] - rightCol[x]));
	}

	return distances.reduce((acc, curr) => acc + curr, 0);
}

export function part_2(input: string) {
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
}
