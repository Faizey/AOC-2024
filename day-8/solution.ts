function part_1(input: string) {
	const matrix = input.replace("\r", "").split("\n");
	const all_coordinates_by_letter: {
		[key: string]: { x: number; y: number }[];
	} = {};
	const antinodes = [];

    let altered_matrix = matrix.map(row => row.split(''));


	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] !== ".") {
				if (typeof all_coordinates_by_letter[matrix[y][x]] === "undefined") {
					all_coordinates_by_letter[matrix[y][x]] = [];
				}

				all_coordinates_by_letter[matrix[y][x]].push({ x, y });
			}
		}
	}

	for (const letter in all_coordinates_by_letter) {
		for (
			let pointer = 0;
			pointer < all_coordinates_by_letter[letter].length;
			pointer++
		) {
			const current = all_coordinates_by_letter[letter][pointer];

			for (
				let nextPointer = 0;
				nextPointer < all_coordinates_by_letter[letter].length;
				nextPointer++
			) {
				if (pointer === nextPointer) {
					continue;
				}

			}
		}
	}

    console.log(altered_matrix.map(row => row.join('')).join('\n'));

	return antinodes.length;
}

function part_2(input: string) {}

export { part_1, part_2 };
