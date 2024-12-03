module.exports = (input: string) => {
	const matches = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
	let answer = 0;

	for (const match of matches) {
		const [_, x, y] = match;
		answer += parseInt(x, 10) * parseInt(y, 10);
	}

    return answer
};
