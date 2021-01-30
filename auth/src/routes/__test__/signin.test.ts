import request from "supertest";
import { app } from "../../app";

const endpoint = "/api/users/signin";

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post(endpoint)
    .send({
      email: "testasd",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post(endpoint)
    .send({
      email: "testasd",
      password: "",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post(endpoint)
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app).post(endpoint).send({ password: "12312312" }).expect(400);
});

it("fails when email that does not exists is supplied", async () => {
  await request(app)
    .post(endpoint)
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(endpoint)
    .send({
      email: "test@test.com",
      password: "asdasd",
    })
    .expect(400);
});

it("responds with a cookie when valid credentials", async () => {
  await global.signup();

  const response = await request(app)
    .post(endpoint)
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
