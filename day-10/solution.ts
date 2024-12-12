function part_1(input: string) {
	const matrix = input
		.replace("\r", "")
		.split("\n")
		.map((line) => line.split("").map(Number));
	const matrix_col_len = matrix.length;
	const matrix_row_len = matrix[0].length;
	const directions = [
		{ x: 0, y: -1 }, // UP
		{ x: 1, y: 0 }, // RIGHT
		{ x: 0, y: 1 }, // DOWN
		{ x: -1, y: 0 }, // LEFT
	];

	let answer = 0;

	function is_valid(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x < matrix_row_len && y < matrix_col_len;
	}

	function get_peak_count(point: { x: number; y: number }): number {
		const stack = [{ x: point.x, y: point.y }];
		const trail_ends = [];

		while (stack.length > 0) {
			const { x, y } = stack.pop()!;

			if (matrix[y][x] === 9) {
				trail_ends.push([x, y].join());
			}

			for (const { x: dx, y: dy } of directions) {
				if (
					is_valid(x + dx, y + dy) &&
					matrix[y + dy][x + dx] === matrix[y][x] + 1
				) {
					stack.push({ x: x + dx, y: y + dy });
				}
			}
		}

		return new Set(trail_ends).size;
	}

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[0].length; x++) {
			if (matrix[y][x] === 0) {
				answer += get_peak_count({ x, y });
			}
		}
	}

	return answer;
}

function part_2(input: string) {
	const matrix = input
		.replace("\r", "")
		.split("\n")
		.map((line) => line.split("").map(Number));
	const matrix_col_len = matrix.length;
	const matrix_row_len = matrix[0].length;
	const directions = [
		{ x: 0, y: -1 }, // UP
		{ x: 1, y: 0 }, // RIGHT
		{ x: 0, y: 1 }, // DOWN
		{ x: -1, y: 0 }, // LEFT
	];

	let answer = 0;

	function is_valid(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x < matrix_row_len && y < matrix_col_len;
	}

	function get_peak_count(point: { x: number; y: number }): number {
		const stack = [{ x: point.x, y: point.y }];
		const trail_ends = [];

		while (stack.length > 0) {
			const { x, y } = stack.pop()!;

			if (matrix[y][x] === 9) {
				trail_ends.push([x, y].join());
			}

			for (const { x: dx, y: dy } of directions) {
				if (
					is_valid(x + dx, y + dy) &&
					matrix[y + dy][x + dx] === matrix[y][x] + 1
				) {
					stack.push({ x: x + dx, y: y + dy });
				}
			}
		}

		return trail_ends.length
	}

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[0].length; x++) {
			if (matrix[y][x] === 0) {
				answer += get_peak_count({ x, y });
			}
		}
	}

	return answer;
}

export { part_1, part_2 };
