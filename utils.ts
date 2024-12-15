class Matrix<T> {
	matrix: T[][];

	constructor(input: string, parseAsNumber: boolean = false) {
		this.matrix = input
			.replace("\r", "")
			.split("\n")
			.map((row) =>
				row
					.split("")
					.map((cell) =>
						parseAsNumber
							? (parseInt(cell, 10) as unknown as T)
							: (cell as unknown as T),
					),
			);
	}

	get_dimensions(): { rows: number; cols: number } {
		return {
			rows: this.matrix.length,
			cols: this.matrix[0].length,
		};
	}

	get_element(x: number, y: number): string {
		if (this.is_valid_coord(x, y)) {
			return this.matrix[y][x];
		}
		throw new Error("Invalid coordinates");
	}

	set_element(x: number, y: number, value: string): void {
		if (this.is_valid_coord(x, y)) {
			const row = this.matrix[y].split("");
			row[x] = value;
			this.matrix[y] = row.join("");
		} else {
			throw new Error("Invalid coordinates");
		}
	}

	is_valid_coord(x: number, y: number): boolean {
		const { rows, cols } = this.get_dimensions();
		return x >= 0 && y >= 0 && x < cols && y < rows;
	}

	print_matrix(): void {
		console.log(this.matrix.join("\n"));
	}
}

export { Matrix as matrix };
