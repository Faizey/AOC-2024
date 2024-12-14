function parse(input: string) {
	const stones = input.split(" ").map(BigInt);
	const stones_map = new Map<bigint, number>();

	for (const stone of stones) {
		stones_map.set(stone, (stones_map.get(stone) ?? 0) + 1);
	}

	return stones_map;
}

function add(stones: Map<bigint, number>, stone: bigint, count: number) {
	stones.set(stone, (stones.get(stone) ?? 0) + count);
}

function blink(stones: Map<bigint, number>) {
	const next = new Map<bigint, number>();

	for (const [stone, count] of stones) {
		if (stone === 0n) {
			add(next, 1n, count);
			continue;
		}

		const as_string = stone.toString();

		if (as_string.length % 2 === 0) {
			const left = BigInt(as_string.substring(0, as_string.length / 2));
			const right = BigInt(as_string.substring(as_string.length / 2));
			add(next, left, count);
			add(next, right, count);
			continue;
		}

		add(next, stone * 2024n, count);
	}

	console.log(next)

	return next;
}

function part_1(input: string) {
	let stones = parse(input);
	const blinks = 25;

	for (let i = 0; i < blinks; i++) {
		stones = blink(stones);
	}

	return [...stones].reduce((acc, [, count]) => acc + count, 0);
}

function part_2(input: string) {
	let stones = parse(input);
	const blinks = 75;

	for (let i = 0; i < blinks; i++) {
		stones = blink(stones);
	}

	return [...stones].reduce((acc, [, count]) => acc + count, 0);
}
export { part_1, part_2 };
