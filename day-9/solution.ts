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

function part_2(input: string) {
	const disk = input.split("").map(Number);
	let blocks: Array<number | "."> = [];
	let id = 0;
	let answer = 0;
	let store = [];

	disk.forEach((d, i) => {
		const is_block_file = i % 2 === 0;
		for (let a = 0; a < d; a++) {
			blocks.push(is_block_file ? id : ".");
		}

		if (is_block_file) {
			id++;
		}
	});

	for (let p = 0; p < blocks.length; p++) {
		if (blocks[p] !== ".") continue;

		let start = p;
		let end = p;

		while (blocks[p] === ".") {
			end++;
			p++;
		}

		store.push({ start, end, length: end - start });
	}

	const first_free_space = store[0].start;
	let pointer_end = blocks.length - 1;

	while (pointer_end > 0 && pointer_end > first_free_space) {

		if (blocks[pointer_end] === ".") {
			pointer_end--;
			continue;
		}

		let required_space = 0;
		const number_to_check = blocks[pointer_end];
		let pointer_req = pointer_end;

		while (blocks[pointer_req] === number_to_check) {
			required_space++;
			pointer_req--;
		}

		const i = store.findIndex(
			(si) => si.length >= required_space && si.end <= pointer_end,
		);
		if (i !== -1) {
			const { start, end, length } = store[i];

			for (let s = 0; s < required_space; s++) {
				blocks[s + start] = blocks[pointer_end];
				blocks[pointer_end] = ".";

				pointer_end--;
			}

			if (length === required_space) {
				store.splice(i, 1);
			} else {
				store.splice(i, 1, {
					start: start + required_space,
					end,
					length: length - required_space,
				});
			}
		} else {
			pointer_end -= required_space;
		}
	}

	blocks.forEach((block, index) => {
		if (typeof block === "string") return;

		answer += block * index;
	});

	return answer;
}

export { part_1, part_2 };
