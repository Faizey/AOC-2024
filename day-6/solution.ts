type GuardDirections = "^" | ">" | "v" | "<";
type CardinalDirection = "N" | "E" | "S" | "W";

const directions = {
	N: [0, -1],
	E: [1, 0],
	S: [0, 1],
	W: [-1, 0],
};

let guard_count = 0;
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

class Guard_2 {
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
		dir?: CardinalDirection
	) {
		guard_count++;
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

		this.updateMatrix(this.x, this.y, this.x + dirX, this.y + dirY, "X");

		this.x = this.x + dirX;
		this.y = this.y + dirY;
	}

	updateMatrix(x, y, nextX, nextY, char) {
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
	const guard = new Guard_2(matrix);
	const answer: string[] = [];

	let outOfBounds = false;
	while (!outOfBounds) {
		if (!guard.is_next_position_valid()) {
			outOfBounds = true;
			break;
		}

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
	const guard = new Guard_2(matrix);
	const correct_positions: string[] = [];
	let answer = 0;

	let outOfBounds = false;
	while (!outOfBounds) {
		if (!guard.is_next_position_valid()) {
			outOfBounds = true;
			break;
		}

		guard.move();
	}

	let currentPos = 0;
	guard.positions.forEach((value, key) => {
		currentPos++;
		// console.log(`TRYING: ${currentPos}`);
		const [_x, _y, dir] = key.split(",") as [
			string,
			string,
			CardinalDirection
		];
		const objectX = parseInt(_x);
		const objectY = parseInt(_y);

		if (objectX === guard.startX && objectY === guard.startY) {
			return;
		}

		const tmp_matrix = [...matrix];
		const row = tmp_matrix[objectY].split("");
		row[objectX] = "O";
		tmp_matrix[objectY] = row.join("");

		const temp_guard = new Guard_2(
			tmp_matrix,
			guard.startX,
			guard.startY,
			guard.startDir
		);

		let stop = false;
		let loop_count = 0;
		let last_loop_count = 0;

		while (!stop) {
			if (last_loop_count !== loop_count && loop_count % 100 === 0) {
				last_loop_count = loop_count;
			}
			if (!temp_guard.is_next_position_valid()) {
				stop = true;
				break;
			}

			if (
				Array.from(temp_guard.positions.values()).some(
					(value) => value >= 2
				)
			) {
				stop = true;
				if (
					correct_positions.findIndex(
						(pos) => pos === `${objectX},${objectY}`
					) === -1
				) {
					correct_positions.push(`${objectX},${objectY}`);
					return;
				}
				answer++;
				break;
			}

			temp_guard.move();
			loop_count++;
		}
	});

	return correct_positions.length;
}

export { part_1, part_2 };
