type XY = { x: number; y: number };
type Matrix = string[];

function find_antennas(matrix: Matrix) {
	const antennas: {
		[key: string]: XY[];
	} = {};

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] !== ".") {
				antennas[matrix[y][x]] = antennas[matrix[y][x]] ?? [];
				antennas[matrix[y][x]].push({ x, y });
			}
		}
	}

	console.log(antennas);

	return antennas;
}

function is_out_of_bounds(matrix: string[], x: number, y: number) {
	return x < 0 || y < 0 || y >= matrix.length || x >= matrix[0].length;
}

function part_1(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	const antennas = find_antennas(matrix);
	const antinodes: XY[] = [];

	function check(x: number, y: number, xx: number, yy: number) {
		if (x === xx) return false;
		if (y === yy) return false;
		if (is_out_of_bounds(matrix, x, y)) return false;
		if (antinodes.some((a) => a.x === x && a.y === y)) return false;
		return true;
	}

	for (const key of Object.keys(antennas)) {
		for (const a1 of antennas[key]) {
			for (const a2 of antennas[key]) {
				const { x: x1, y: y1 } = a1;
				const { x: x2, y: y2 } = a2;

				if (x1 === x2 && y1 === y2) continue;

				const [dx, dy] = [x2 - x1, y2 - y1];

				let [x, y] = [x1 - dx, y1 - dy];

				if (check(x, y, x2, y2)) {
					antinodes.push({ x, y });
				}

				[x, y] = [x2 - dx, y2 - dy];

				if (check(x, y, x1, y1)) {
					antinodes.push({ x, y });
				}
			}
		}
	}

	return antinodes.length;
}

function part_2(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	const antennas = find_antennas(matrix);
	const antinodes: XY[] = [];

	function check(x: number, y: number, xx: number, yy: number) {
		if (x === xx) return false;
		if (y === yy) return false;
		if (antinodes.some((a) => a.x === x && a.y === y)) return false;
		return true;
	}

	for (const key of Object.keys(antennas)) {
		for (const a1 of antennas[key]) {
			for (const a2 of antennas[key]) {
				const { x: x1, y: y1 } = a1;
				const { x: x2, y: y2 } = a2;

				if (x1 === x2 && y1 === y2) continue;

				const [dx, dy] = [x2 - x1, y2 - y1];

				for (
					let [x, y] = [x1 - dx, y1 - dy];
					!is_out_of_bounds(matrix, x, y);
					x += dx, y += dy
				) {
					if (check(x, y, x2, y2)) antinodes.push({ x, y });
				}

				for (
					let [x, y] = [x2 - dx, y2 - dy];
					!is_out_of_bounds(matrix, x, y);
					x += dx, y += dy
				) {
					if (check(x, y, x1, y1)) antinodes.push({ x, y });
				}
			}
		}
	}

	return antinodes.length;
}

export { part_1, part_2 };
