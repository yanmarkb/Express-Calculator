const express = require("express");
const app = express();

function mean(nums) {
	return nums.reduce((a, b) => a + b) / nums.length;
}

function median(nums) {
	nums.sort((a, b) => a - b);
	const mid = Math.floor(nums.length / 2);
	return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mode(nums) {
	const freq = {};
	let max = 0;
	let mode;
	for (let num of nums) {
		freq[num] = (freq[num] || 0) + 1;
		if (freq[num] > max) {
			max = freq[num];
			mode = num;
		}
	}
	return mode;
}

app.get("/mean", (req, res) => {
	if (!req.query.nums) {
		return res.status(400).json({ error: "Invalid numbers." });
	}

	const nums = req.query.nums.split(",").map(Number);
	if (nums.includes(NaN)) {
		return res.status(400).json({ error: "Invalid numbers." });
	}

	const value = mean(nums);
	res.json({ operation: "mean", value });
});

app.get("/median", (req, res) => {
	const nums = req.query.nums.split(",").map(Number);
	if (nums.includes(NaN)) {
		return res.status(400).json({ error: "Invalid numbers." });
	}
	const value = median(nums);
	res.json({ operation: "median", value });
});

app.get("/mode", (req, res) => {
	const nums = req.query.nums.split(",").map(Number);
	if (nums.includes(NaN)) {
		return res.status(400).json({ error: "Invalid numbers." });
	}
	const value = mode(nums);
	res.json({ operation: "mode", value });
});

module.exports = app;
