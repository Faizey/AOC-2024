function get_rules_and_pages(input: string) {
	const rulesArr: number[][] = [];
	const pagesArr: number[][] = [];

	input.split("\n").forEach((l) => {
		if (!l) return;

		if (l.includes("|")) {
			rulesArr.push(l.split("|").map(Number));
			return;
		}

		pagesArr.push(l.split(",").map(Number));
	});

	return { rulesArr, pagesArr };
}

function part_1(input: string) {
	const { rulesArr, pagesArr } = get_rules_and_pages(input);
	let answer = 0;

	pagesArr.forEach((pages) => {
		let isCorrect = true;

		rulesArr.forEach((rule) => {
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
	const { rulesArr, pagesArr } = get_rules_and_pages(input);
	const incorrectPages: number[][] = [];
	let answer = 0;

	pagesArr.forEach((pages) => {
		let skip = false;

		rulesArr.forEach((rule) => {
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
			rulesArr.forEach((rule) => {
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
