function part_1(input: string) {
	let blocks = input.split(" ");
	const blinks = 25;

	for (let count = 0; count < blinks; count++) {
		for (let i = 0; i < blocks.length; i++) {
			const block = blocks[i];

			if (parseInt(block, 10) === 0) {
				blocks[i] = "1";
				continue;
			}

			if (block.length % 2 === 0) {
				blocks.splice(
					i++,
					1,
					"" + parseInt(block.substring(0, block.length / 2), 10),
					"" + parseInt(block.substring(block.length / 2, block.length), 10),
				);

				continue;
			}

			blocks[i] = "" + parseInt(block, 10) * 2024;
		}
	}

	return blocks.length;
}

function part_2(input: string) {}

export { part_1, part_2 };
