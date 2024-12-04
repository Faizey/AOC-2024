export function part_1(input: string) {
	const matches = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
	let answer = 0;

	for (const match of matches) {
		const [_, x, y] = match;
		answer += parseInt(x, 10) * parseInt(y, 10);
	}

	return answer;
}

export function part_2(input: string)  {
	const matches = [
		...input.matchAll(/do\(\)|don\'t\(\)|mul\((\d{1,3}),(\d{1,3})\)/g),
	];
	let answer = 0;
	let enabled = true;

	for (const match of matches) {
		const [matchedString, x, y] = match;

		if (matchedString === "do()") {
			enabled = true;
            continue;
		}

		if (matchedString === "don't()") {
			enabled = false;
            continue;
		}

		if (!enabled) {
			continue;
		}

		answer += parseInt(x, 10) * parseInt(y, 10);
	}

	return answer;
};
