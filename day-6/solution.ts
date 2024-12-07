type GuardDirections = "^" | ">" | "v" | "<";
type CardinalDirection = "N" | "E" | "S" | "W";

const directions = {
	N: [0, -1],
	E: [1, 0],
	S: [0, 1],
	W: [-1, 0],
};

function find_guard(matrix: string[]) {
	const directions: { [key in GuardDirections]: string } = {
		"^": "N",
		">": "E",
		v: "S",
		"<": "W",
	};

	for (let y = 0; y < matrix[0].length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const char = matrix[y][x];

			if (char === "^" || char === ">" || char === "v" || char === "<") {
				const dir = directions[char] as CardinalDirection;
				return {
					dir,
					x,
					y,
				};
			}
		}
	}
}

class Guard {
	startX: number;
	startY: number;
	startDir: CardinalDirection;
	x: number;
	y: number;
	dir: CardinalDirection;
	matrix: string[];
	positions: Map<string, number>;

	constructor(
		matrix: string[],
		x?: number,
		y?: number,
		dir?: CardinalDirection,
	) {
		const guardPosition = find_guard(matrix);

		if (!guardPosition) {
			throw new Error("Guard not found in the matrix");
		}

		this.startX = guardPosition.x;
		this.startY = guardPosition.y;
		this.startDir = guardPosition.dir;
		this.x = x || guardPosition.x;
		this.y = y || guardPosition.y;
		this.dir = dir || guardPosition.dir;
		this.matrix = matrix;
		this.positions = new Map();
	}

	position_key() {
		return `${this.x},${this.y},${this.dir}`;
	}

	is_next_position_valid() {
		const [dirX, dirY] = directions[this.dir];

		const is_valid =
			this.x + dirX >= 0 &&
			this.y + dirY >= 0 &&
			this.x + dirX < this.matrix[0].length &&
			this.y + dirY < this.matrix.length;

		if (!is_valid) {
			this.store_position();
		}

		return is_valid;
	}

	move() {
		this.store_position();

		const [dirX, dirY] = directions[this.dir];

		const nextPosChar = this.matrix[this.y + dirY][this.x + dirX];

		if (nextPosChar === "#" || nextPosChar === "O") {
			this.rotate();
			return;
		}

		this.updateMatrix(
			this.x,
			this.y,
			this.x + dirX,
			this.y + dirY,
			"X" as CardinalDirection,
		);

		this.x = this.x + dirX;
		this.y = this.y + dirY;
	}

	updateMatrix(
		x: number,
		y: number,
		nextX: number,
		nextY: number,
		char: CardinalDirection,
	) {
		let tmp_matrix = [...this.matrix];

		const row = tmp_matrix[y].split("");
		row[x] = char;
		tmp_matrix[y] = row.join("");

		const rowNext = tmp_matrix[nextY].split("");
		rowNext[nextX] = ".";
		tmp_matrix[nextY] = rowNext.join("");

		this.matrix = tmp_matrix;
	}

	rotate() {
		const dir_keys = Object.keys(directions);
		const dir_index = dir_keys.indexOf(this.dir);

		if (dir_index + 1 >= dir_keys.length) {
			const next_dir_key = dir_keys[0];
			this.dir = next_dir_key as CardinalDirection;
		} else {
			const next_dir_key = dir_keys[dir_index + 1];
			this.dir = next_dir_key as CardinalDirection;
		}
	}

	store_position() {
		const prevCount = this.positions.get(this.position_key()) ?? 0;
		this.positions.set(this.position_key(), prevCount + 1);
	}
}

function part_1(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	const guard = new Guard(matrix);
	const answer: string[] = [];

	while (guard.is_next_position_valid()) {
		guard.move();
	}

	guard.positions.forEach((value, key) => {
		const [x, y, _] = key.split(",");
		const xy = `${x},${y}`;
		if (!answer.includes(xy)) {
			answer.push(xy);
		}
	});

	return answer.length;
}

function part_2(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	const guard = new Guard(matrix);
	const correct_positions: Set<string> = new Set();
	let answer = 0;

	while (guard.is_next_position_valid()) {
		guard.move();
	}

	let guard_count = 1;
	guard.positions.forEach((value, key) => {
		guard_count++;
		if (guard_count % 100 === 0) {
			console.log("Positions remaining: ", guard.positions.size - guard_count);
		}
		const [objectX, objectY, dir] = key.split(",").map(Number);
		if (objectX === guard.startX && objectY === guard.startY) {
			return;
		}

		const tmp_matrix = matrix.map((row, index) =>
			index === objectY
				? row.slice(0, objectX) + "O" + row.slice(objectX + 1)
				: row,
		);

		const temp_guard = new Guard(
			tmp_matrix,
			guard.startX,
			guard.startY,
			guard.startDir,
		);

		let loop_count = 0;
		while (temp_guard.is_next_position_valid()) {
			temp_guard.move();
			loop_count++;

			if (
				Array.from(temp_guard.positions.values()).some((value) => value >= 2)
			) {
				const pos = `${objectX},${objectY}`;
				if (!correct_positions.has(pos)) {
					correct_positions.add(pos);
					answer++;
				}
				break;
			}
		}
	});

	return correct_positions.size;
}

export { part_1, part_2 };
