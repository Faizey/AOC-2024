function part_1(input: string) {
	const disk = input.split("").map(Number);
	let answer = 0;
	let blocks = [];
	let num_count = 0;
	let id = 0;

	disk.forEach((d, i) => {
		const is_block_file = i % 2 === 0;

		for (let a = 0; a < d; a++) {
			blocks.push(is_block_file ? id : ".");
			if (is_block_file) {
				num_count++;
			}
		}

		if (is_block_file) {
			id++;
		}
	});

	let pointerEnd = blocks.length - 1;
	let pointerStart = 0;

	for (pointerStart; pointerStart < num_count; pointerStart++) {
		if (blocks[pointerStart] !== ".") continue;

		while (blocks[pointerEnd] === ".") {
			pointerEnd--;
		}

		blocks[pointerStart] = blocks[pointerEnd];
		blocks[pointerEnd] = ".";

		pointerEnd--;
	}

	blocks.forEach((block, index) => {
		if (typeof block === "string") return;

		answer += block * index;
	});

	return blocks.reduce((acc: number, curr: string | number, index) => {
		if (typeof curr === "string") return acc;

		return acc + curr * index;
	}, 0);
}

function part_2(input: string) {}

export { part_1, part_2 };
