//@ts-check

const { readFileSync } = require("node:fs");
const rawInput = readFileSync(`./input/day3.txt`, { encoding: "utf8" });
function preParse(input) {
	return input.split("\n");
}

let preparsed = preParse(rawInput);

const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const findIndex = (i) => str.indexOf(i) + 1;
const chunks = (a, size) =>
    Array.from(
        new Array(Math.ceil(a.length / size)),
        (_, i) => a.slice(i * size, i * size + size)
    );


function parse(arr) {
	arr = chunks(arr, arr.length / 2)

	let score = [];

	for (let i = 0; i < arr.length; i++) {
		const [com1, com2] = arr[i];

		const diff = Array.from(com1).filter((i) => Array.from(com2).includes(i));
		score.push(diff[0]);
	}

	return score;
}

function sum(i) {
	return i.reduce((prev, curr) => prev + curr, 0);
}

console.log(sum(parse(preparsed).map(findIndex)));
