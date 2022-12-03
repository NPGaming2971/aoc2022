//@ts-check

const { readFileSync } = require("node:fs");
const rawInput = readFileSync(`./input/day3.txt`, { encoding: "utf8" });
function preParse(input) {
	return input.split("\n");
}

let preparsed = preParse(rawInput);

const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const findIndex = (i) => str.indexOf(i) + 1;

function parse(arr) {
	arr = arr.map((e) => {
		let half = e.length / 2;
		return [e.slice(0, half), e.slice(half, str.length)];
	});

	let score = [];

	for (let i = 0; i < arr.length; i++) {
		const [com1, com2] = arr[i];

		const diff = Array.from(com1).filter((i) => Array.from(com2).includes(i));
		score.push(diff[0]);
	}

	return sum(score.map(findIndex));
}

function sum(i) {
	return i.reduce((prev, curr) => prev + curr, 0);
}

console.log(parse(preparsed));
