function isValidCoord(matrix: string[], x: number, y: number) {
	return x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length;
}

function findWord(
	matrix: string[],
	word: string | null,
	x: number,
	y: number,
	dx: number,
	dy: number
) {
	if (!word) {
		return true;
	}

	if (!isValidCoord(matrix, x, y)) {
		return false;
	}

	if (word[0] !== matrix[y][x]) {
		return false;
	}

	return findWord(
		matrix,
		word.substring(1, word.length),
		x + dx,
		y + dy,
		dx,
		dy
	);
}

export function part_1(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	console.log(matrix.length);
	const word = "XMAS";
	let answer = 0;

	const dx = [-1, 0, 1, 1, 1, 0, -1, -1];
	const dy = [-1, -1, -1, 0, 1, 1, 1, 0];

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			for (let dir = 0; dir < dx.length; dir++) {
				if (findWord(matrix, word, x, y, dx[dir], dy[dir])) {
					answer += 1;
				}
			}
		}
	}

	return answer;
}

export function part_2(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	let answer = 0;

	// Start on second row and finish on second to last row
	for (let y = 1; y < matrix.length - 1; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			let count = 0;
			const l = matrix[y][x];

			if (l === "A") {
				const topLeftLetter = matrix[y - 1][x - 1];
				const topRightLetter = matrix[y - 1][x + 1];
				const bottomLeftLetter = matrix[y + 1][x - 1];
				const bottomRightLetter = matrix[y + 1][x + 1];

				if (topLeftLetter === "M" && bottomRightLetter === "S") {
					count += 1;
				}

				if (topRightLetter === "M" && bottomLeftLetter === "S") {
					count += 1;
				}

				if (bottomRightLetter === "M" && topLeftLetter === "S") {
					count += 1;
				}

				if (bottomLeftLetter === "M" && topRightLetter === "S") {
					count += 1;
				}
			}

			if (count === 2) {
				answer += 1;
			}
		}
	}

	return answer;
}
