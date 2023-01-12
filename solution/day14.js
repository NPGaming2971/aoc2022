const { readFileSync, writeFileSync } = require("fs");

const input = readFileSync("./input/day14.txt", "utf8");

function processInput() {
	return input.split("\r\n").map((i) =>
		i
			.replaceAll(" ", "")
			.split("->")
			.map((e) =>
				e
					.split(",")
					.map(Number)
					.map((e) => e)
			)
	);
}
const processed = processInput();

const highestYPoint = Math.max(...processed.map((i) => i.map((e) => e[1])).flat()) + 3;
const arr = Array.from({ length: highestYPoint }, () => Array.from({ length: 1000 }));
const fallPosY = 0,
	fallPosX = 500;

// O(n^2)?
function format() {
	processed.forEach((i) => {
		i.forEach(([x, y], index) => {
			if (index === i.length - 1) return;
			let [nX, nY] = i[index + 1];

			if (x !== nX) {
				for (let g = x; x < nX ? g <= nX : g >= nX; x < nX ? g++ : g--) {
					arr[y][g] = "#";
				}
			}

			if (y !== nY) {
				for (let g = y; y < nY ? g <= nY : g >= nY; y < nY ? g++ : g--) {
					arr[g][x] = "#";
				}
			}
		});
	});
}
format();

function recur(x, y) {
	// If there is nothing below
	if (!arr[y + 1][x]) {
		y += 1;
		[x, y] = recur(x, y);
	} else {
		// If there is not something bottom left
		if (!arr[y + 1][x - 1]) {
			y += 1;
			x -= 1;

			[x, y] = recur(x, y);
		} else {
			// If there is not something bottom right
			if (!arr[y + 1][x + 1]) {
				y += 1;
				x += 1;
				[x, y] = recur(x, y);
			}
		}
	}

	return [x, y];
}
arr[arr.length - 1].fill("#");
for (let i = 0; i < Infinity; i++) {
	try {
		const [x, y] = recur(fallPosX, fallPosY);
		arr[y][x] = "o";

		if (x === 500 && y === 0) break;
	} catch (err) {
		console.log(err);
		break;
	}
}

const i = arr
	.map((e) => {
		return e.map((g) => (!g ? " " : g)).join("");
	})
	.join("\n");
writeFileSync("./day14.txt", i);

console.log("Part 2:", Array.from(i.matchAll(/\o/g)).length);
