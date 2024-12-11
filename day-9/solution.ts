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

	let pointer_start = 0;
	let pointer_end = blocks.length - 1;
	let first_free_space_index = null;
	function has_space_to_fill() {
		let p = pointer_end;
		let has_space = false;

		while (p > 0) {
			if (blocks[p] === ".") {
				has_space = true;
			}
			p--;
		}

		return has_space;
	}

	while (pointer_end > 0 && has_space_to_fill()) {
		let required_space = 0;
		let available_space = 0;

		// // ------- DEBUG -------
		// console.log({ pointer_start, pointer_end });
		// let log_array = Array(blocks.join("").length).fill(" ");

		// log_array[pointer_start] = "^";
		// log_array[pointer_end] = "v";
		// console.log(blocks.join(""));
		// console.log(log_array.join(""));
		// console.log(" ");
		// // ------- DEBUG -------

		let pointer_req = pointer_end;
		let number_to_check = blocks[pointer_end];
		let counter = 0;
		while (blocks[pointer_req] === number_to_check) {
			counter++;
			pointer_req--;
		}

		required_space = counter;

		// console.log({ required_space });

		let pointer_avail = pointer_start;
		counter = 0;

		while (blocks[pointer_avail] === ".") {
			counter++;
			pointer_avail++;
		}

		available_space = counter;

		if (pointer_start >= blocks.length || pointer_start > pointer_end) {
			pointer_start = 0;
			pointer_end -= required_space;
			available_space = 0;
			required_space = 0;
			console.log(blocks.join(''))
			continue;
		}

		if (available_space >= required_space) {
			for (let i = 0; i < required_space; i++) {
				blocks[pointer_start] = blocks[pointer_end];
				blocks[pointer_end] = ".";

				pointer_start++;
				pointer_end--;
			}
		}

		pointer_start++;
	}

	console.log(blocks.join(""));

	blocks.forEach((block, index) => {
		if (typeof block === "string") return;

		answer += block * index;
	});

	return answer;
}

export { part_1, part_2 };
