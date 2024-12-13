function blink(blocks) {
	let newBlocks = [];

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];

		if (block === 0) {
			newBlocks.push(1);
			continue;
		}

		if (block.toString().length % 2 === 0) {
			const strBlock = block.toString();
			newBlocks.push(
				parseInt(strBlock.substring(0, strBlock.length / 2), 10),
				parseInt(strBlock.substring(strBlock.length / 2), 10),
			);
		} else {
			newBlocks.push(block * 2024);
		}
	}

	return newBlocks;
}

function part_1(input: string) {
	let blocks = input.split(" ").map(Number);
	const blinks = 25;

	for (let count = 0; count < blinks; count++) {
		blocks = blink(blocks);
	}

	return blocks.length;
}

function part_2(input: string) {
	let blocks = input.split(" ").map(Number);
	const blinks = 50;

	for (let count = 0; count < blinks; count++) {
		blocks = blink(blocks);
		console.log(blocks.length)
	}

	return blocks.length;
}

export { part_1, part_2 };
