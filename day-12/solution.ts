const CORNERS = {
	top_left: { x: -0.5, y: -0.5 },
	top_right: { x: 0.5, y: -0.5 },
	bottom_right: { x: 0.5, y: 0.5 },
	bottom_left: { x: -0.5, y: 0.5 },
};
const DIRECTIONS = [
	{ x: 0, y: -1, corners: [CORNERS.top_left, CORNERS.top_right] }, // UP
	{ x: 1, y: 0, corners: [CORNERS.top_right, CORNERS.bottom_right] }, // RIGHT
	{ x: 0, y: 1, corners: [CORNERS.bottom_right, CORNERS.bottom_left] }, // DOWN
	{ x: -1, y: 0, corners: [CORNERS.bottom_left, CORNERS.top_left] }, // LEFT
];

function is_out_of_bounds(matrix: string[], x: number, y: number) {
	return x < 0 || y < 0 || y >= matrix.length || x >= matrix[0].length;
}

function parse(input: string): {
	matrix: string[];
	id_map: Map<string, string>;
	areas: Map<string, number>;
} {
	const matrix = input.replace("\r", "").split("\n");
	const id_map = new Map();
	const areas = new Map();

	for (let startY = 0; startY < matrix.length; startY++) {
		for (let startX = 0; startX < matrix[0].length; startX++) {
			const stack = [{ x: startX, y: startY }];

			while (stack.length > 0) {
				const { x: currentX, y: currentY } = stack.pop()!;
				const currentValue = matrix[currentY][currentX];

				if (id_map.has(`${currentX},${currentY}`)) {
					continue;
				}

				id_map.set(
					`${currentX},${currentY}`,
					`${startX},${startY},${currentValue}`,
				);
				areas.set(`${startX},${startY},${currentValue}`, (areas.get(`${startX},${startY},${currentValue}`) ?? 0) + 1);

				for (const { x: deltaX, y: deltaY } of DIRECTIONS) {
					if (
						!is_out_of_bounds(matrix, currentX + deltaX, currentY + deltaY) &&
						matrix[currentY + deltaY][currentX + deltaX] === currentValue
					) {
						stack.push({ x: currentX + deltaX, y: currentY + deltaY });
					}
				}
			}
		}
	}

	return {
		matrix,
		id_map,
		areas,
	};
}

function part_1(input: string) {
	const { matrix, id_map, areas } = parse(input);
	const fences: { [key: string]: Set<string> } = {};
	let answer = 0;

	function is_out_of_bounds(x: number, y: number) {
		return x < 0 || y < 0 || y >= matrix.length || x >= matrix[0].length;
	}

	function add_corners(
		id: string,
		currentX: number,
		currentY: number,
		corners: { x: number; y: number }[],
	) {
		for (const corner of corners) {
			fences[id].add(`${currentX + corner.x},${currentY + corner.y}`);
		}
	}

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[0].length; x++) {
			const current = matrix[y][x];
			const id = id_map.get(`${x},${y}`) ?? "unknown";

			if (typeof fences[id] === "undefined") {
				fences[id] = new Set();
			}

			for (const { x: dirX, y: dirY, corners } of DIRECTIONS) {
				if (is_out_of_bounds(x + dirX, y + dirY)) {
					// console.log("Is out of bounds", { x: x + dirX, y: y + dirY });
					add_corners(id, x, y, corners);
					continue;
				}

				if (current !== matrix[y + dirY][x + dirX]) {
					// console.log("Does not match", {
					// 	x: x + dirX,
					// 	y: y + dirY,
					// 	current,
					// 	next: matrix[y + dirY][x + dirX],
					// });
					add_corners(id, x, y, corners);
				}
			}
		}
	}


	for (const [id, area] of [...areas]) {
		console.log({
			id,
			area,
			size: fences[id].size
		})
		answer += fences[id].size * area;
	}


	return answer;
}

function part_2(input: string) {}

export { part_1, part_2 };
