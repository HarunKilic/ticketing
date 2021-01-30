import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

let mongo: MongoMemoryServer;

jest.mock("../nats-wrapper.ts");

// process.env.STRIPE_KEY =
//   "sk_test_51CyfDUFhmo8EshjhCNYQWUAR9ySVsouXFTaj3I2dPUsgs5URFeMDx1YLQsUSBLoMJQ2NQuoQktjmG3njziVeXufl00yk55gfnG";

beforeAll(async () => {
  process.env.JWT_KEY = "fewfwe";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // Json => Base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
