function part_1(input: string) {
	const rows = input.split("\n");
	const matrix: string[][] = [];
	let instructions;
	const directions: { [key: string]: [number, number] } = {
		"^": [0, -1],
		">": [1, 0],
		v: [0, 1],
		"<": [-1, 0],
	};
	let robot: { x: number; y: number } = { x: 0, y: 0 };

	rows.forEach((row) => {
		if (row.includes("#")) {
			matrix.push(row.split(""));
			return;
		}

		if (row) {
			instructions = row;
		}
	});

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[0].length; x++) {
			if (matrix[y][x] === "@") {
				robot = {
					x,
					y,
				};
			}
		}
	}

	for (const row of matrix) {
		console.log(row.join(""));
	}
	console.log(" ");

	function move(x: number, y: number, dir: [number, number]) {
		const [dx, dy] = dir;
		console.log({ robot, dir, dirChar: matrix[y + dy][x + dx] });

		if (matrix[y + dy][x + dx] === "#") {
			console.log("hit wall");
			return;
		}

		if (matrix[y + dy][x + dx] === "O") {
			console.log("hit box");
			return move(x + dx, y + dy, dir);
		}

		matrix[y + dy][x + dx] = "@";
		matrix[y][x] = ".";
		robot.x = x + dx;
		robot.y = y + dy;
	}

	for (const instruction of instructions!) {
		console.log(instruction);
		move(robot.x, robot.y, directions[instruction]);

		for (const row of matrix) {
			console.log(row.join(""));
		}
		console.log(" ");
	}
}

function part_2(input: string) {}

export { part_1, part_2 };
