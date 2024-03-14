const request = require("supertest");
const app = require("./app");

test("mean route", async () => {
	const response = await request(app).get("/mean?nums=1,2,3,4,5");
	expect(response.statusCode).toBe(200);
	expect(response.body).toEqual({ operation: "mean", value: 3 });
});

test("median route", async () => {
	const response = await request(app).get("/median?nums=1,2,3,4,5");
	expect(response.statusCode).toBe(200);
	expect(response.body).toEqual({ operation: "median", value: 3 });
});

test("mode route", async () => {
	const response = await request(app).get("/mode?nums=1,2,3,3,4,5");
	expect(response.statusCode).toBe(200);
	expect(response.body).toEqual({ operation: "mode", value: 3 });
});

test("mean route with invalid numbers", async () => {
	const response = await request(app).get("/mean?nums=1,2,foo");
	expect(response.statusCode).toBe(400);
	expect(response.body).toEqual({ error: "Invalid numbers." });
});

test("mean route without numbers", async () => {
	const response = await request(app).get("/mean");
	expect(response.statusCode).toBe(400);
	expect(response.body).toEqual({ error: "Invalid numbers." });
});
