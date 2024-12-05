function part_1(input: string) {
	const rules: number[][] = [];
	const allPages: number[][] = [];
	let answer = 0;

	input.split("\n").forEach((l) => {
		if (!l) return;

		if (l.includes("|")) {
			rules.push(l.split("|").map(Number));
			return;
		}

		allPages.push(l.split(",").map(Number));
	});

	allPages.forEach((pages) => {
		let isCorrect = true;

		rules.forEach((rule) => {
			if (!isCorrect) {
				return;
			}

			const [before, after] = rule;
			const pageBeforeIndex = pages.indexOf(before);
			const pageAfterIndex = pages.indexOf(after);

			if (pageAfterIndex === -1 || pageBeforeIndex === -1) {
				return;
			}

			if (pageBeforeIndex > pageAfterIndex) {
				isCorrect = false;
				return;
			}
		});

		if (isCorrect) {
			answer += pages[Math.floor(pages.length / 2)];
		}
	});

	return answer;
}

function part_2(input: string) {
	const rules: number[][] = [];
	const allPages: number[][] = [];
	const incorrectPages: number[][] = [];
	let answer = 0;

	input.split("\n").forEach((l) => {
		if (!l) return;

		if (l.includes("|")) {
			rules.push(l.split("|").map(Number));
			return;
		}

		allPages.push(l.split(",").map(Number));
	});

	allPages.forEach((pages) => {
		let skip = false;

		rules.forEach((rule) => {
			if (skip) return;

			const [before, after] = rule;
			const pageBeforeIndex = pages.indexOf(before);
			const pageAfterIndex = pages.indexOf(after);

			if (pageAfterIndex === -1 || pageBeforeIndex === -1) {
				return;
			}

			if (pageBeforeIndex > pageAfterIndex) {
				incorrectPages.push(pages);
				skip = true;
				return;
			}
		});
	});

	incorrectPages.forEach((pages) => {
		let keepTrying = true;
		while (keepTrying) {
			let hasSorted = true;
			rules.forEach((rule) => {
				const [before, after] = rule;
				const pageBeforeIndex = pages.indexOf(before);
				const pageAfterIndex = pages.indexOf(after);

				if (pageAfterIndex === -1 || pageBeforeIndex === -1) {
					return;
				}

				if (pageBeforeIndex > pageAfterIndex) {
					pages[pageAfterIndex] = before;
					pages[pageBeforeIndex] = after;
					hasSorted = false;
					return;
				}
			});

			if (hasSorted) {
				keepTrying = false;
			}
		}

		answer += pages[Math.floor(pages.length / 2)];
	});

	return answer;
}

export { part_1, part_2 };
