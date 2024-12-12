function part_1(input: string) {
	let blocks = input.split(" ").map(Number);
	const blinks = 25;

	for (let count = 0; count < blinks; count++) {
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

		blocks = newBlocks;
	}

	return blocks.length;
}
function part_2(input: string) {}

export { part_1, part_2 };
