function parse_input(input: string) {
	const rows = input.split("\n");

	return rows.map((i) => {
		const [total, rest] = i.split(":");

		return {
			total: parseInt(total),
			numbers: rest.split(" ").filter(Boolean).map(Number),
		};
	});
}

function calculate(operator: string, a: number, b: number) {
	switch (operator) {
		case "*":
			return a * b;
		case "+":
			return a + b;
		case "||":
			return parseInt(`${a}${b}`);
	}
}

function generate_combinations(
	operators: string[],
	length: number
): string[][] {
	if (length === 1) return operators.map((op) => [op]);
	const combinations: string[][] = [];
	const smaller_combinations = generate_combinations(operators, length - 1);

	for (const op of operators) {
		for (const smaller_comb of smaller_combinations) {
			combinations.push([op, ...smaller_comb]);
		}
	}

	return combinations;
}

function evaluate_expression(numbers: number[], operators: string[]) {
	let result = numbers[0];
	for (let x = 0; x < operators.length; x++) {
		result = calculate(operators[x], result, numbers[x + 1]);
	}

	return result;
}

function part_1(input: string) {
	const rows = parse_input(input);
	const operators = ["*", "+"];
	let answer = 0;

	for (const { total, numbers } of rows) {
		const operator_combinations = generate_combinations(
			operators,
			numbers.length - 1
		);

		for (const combination of operator_combinations) {
			if (evaluate_expression(numbers, combination) === total) {
				answer += total;
				break;
			}
		}
	}

	return answer;
}

function part_2(input: string) {
	const rows = parse_input(input);
	const operators = ["*", "+", "||"];
	let answer = 0;

	for (const { total, numbers } of rows) {
		const operator_combinations = generate_combinations(
			operators,
			numbers.length - 1
		);

		for (const combination of operator_combinations) {
			if (evaluate_expression(numbers, combination) === total) {
				answer += total;
				break;
			}
		}
	}

	return answer;
}

export { part_1, part_2 };
