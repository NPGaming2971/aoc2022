//@ts-check

const { readFileSync } = require("node:fs");
const rawInput = readFileSync(`./input/day1.txt`, { encoding: "utf8" });
function preParse(input) {
	return input.split("\n").map(Number);
}

function sum(i) {
    return i.reduce((prev, curr) => prev + curr, 0);
}

function parse(preparsed) {
	let arr = [];

	let toAdd = [];
	for (let i = 0; i < preparsed.length; i++) {
		let item = preparsed[i];
        toAdd.push(item)

		if (i === preparsed.length - 1 || item === 0) {
			arr.push(Object.values(toAdd));
            toAdd.length = 0;
		}
	}

	return arr;
}

function result(input) {
    return input.map(sum).sort((a, b) => b - a).slice(0, 3)
}

const calc = result(parse(preParse(rawInput)));

// Part 1
console.log(calc.at(0));

console.log(sum(calc))
