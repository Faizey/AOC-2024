function part_1(input: string) {
	const disk = input.split("").map(Number);
	let answer = 0;
	let blocks: Array<number | "."> = [];
	let id = 0;

	disk.forEach((d, i) => {
		const is_block_file = i % 2 === 0;
		for (let a = 0; a < d; a++) {
			blocks.push(is_block_file ? id : ".");
		}

		if (is_block_file) {
			id++;
		}
	});

	let pointerStart = 0;
	let pointerEnd = blocks.length - 1;

	while (pointerStart < pointerEnd) {
		if (blocks[pointerStart] !== ".") {
			pointerStart++;
			continue;
		}

		while (blocks[pointerEnd] === "." && pointerEnd > pointerStart) {
			pointerEnd--;
		}

		if (pointerStart < pointerEnd) {
			blocks[pointerStart] = blocks[pointerEnd];
			blocks[pointerEnd] = ".";
			pointerEnd--;
		}
	}

	blocks.forEach((block, index) => {
		if (typeof block === "string") return;

		answer += block * index;
	});

	return answer;
}

function part_2(input: string) {}

export { part_1, part_2 };
