function parse(input: string) {
	const regex = /p=(-*\d+),(-*\d+)\s+v=(-*\d+),(-*\d+)/;

	return input.split("\n").map((line) => {
		const [match, x, y, vx, vy] = line.match(regex) || [];

		return {
			x: parseInt(x),
			y: parseInt(y),
			vx: parseInt(vx),
			vy: parseInt(vy),
		};
	});
}

function part_1(input: string) {
	const robots = parse(input);
	const height = 103;
	const width = 101;
	const seconds = 100;

	function tick() {
		for (const robot of robots) {
			let vx = robot.vx;
			let vy = robot.vy;

			// X falls below 0
			if (robot.x + vx < 0) {
				vx = robot.x + vx;
				robot.x = width;
			}

			// Y falls below 0
			if (robot.y + vy < 0) {
				vy = robot.y + vy;
				robot.y = height;
			}

			// X exceeds width
			if (robot.x + vx >= width) {
				vx = vx - (width - robot.x);
				robot.x = 0;
			}

			// Y exceeds height
			if (robot.y + vy >= height) {
				vy = vy - (height - robot.y);
				robot.y = 0;
			}

			robot.x += vx;
			robot.y += vy;
		}
	}

	for (let i = 0; i < seconds; i++) {
		tick();
	}

	const quadrants = [
		// Top left
		{
			startX: 0,
			startY: 0,
			endX: Math.floor(width / 2) - 1,
			endY: Math.floor(height / 2) - 1,
		},

		// Top right
		{
			startX: Math.floor(width / 2) + 1,
			startY: 0,
			endX: width - 1,
			endY: Math.floor(height / 2) - 1,
		},

		// Bottom left
		{
			startX: 0,
			startY: Math.floor(height / 2) + 1,
			endX: Math.floor(width / 2) - 1,
			endY: height - 1,
		},

		// Bottom right
		{
			startX: Math.floor(width / 2) + 1,
			startY: Math.floor(height / 2) + 1,
			endX: width - 1,
			endY: height - 1,
		},
	];

	const robot_quadrants_count = [0, 0, 0, 0];

	for (let q = 0; q < 4; q++) {
		const quadrant = quadrants[q];
		for (const robot of robots) {
			if (
				robot.x >= quadrant.startX &&
				robot.x <= quadrant.endX &&
				robot.y >= quadrant.startY &&
				robot.y <= quadrant.endY
			) {
				robot_quadrants_count[q] += 1;
			}
		}
	}

	return robot_quadrants_count.reduce((acc, curr) => {
		return acc * curr;
	}, 1);
}

function part_2(input: string) {}

export { part_1, part_2 };
