const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const server = require("./express.service");
const { invalidContact, validContact } = require("./test.utils");

const app = server.createServer();

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  mongoose.disconnect();
  mongoose.connection.close();
})

let validContactId = "";
let updatedContact = {};

describe("GET", () => {
  test("returns status of Express", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
  test("get contacts", async () => {
    const res = await request(app).get("/api/contacts");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST", () => {
  describe("given an invalid contact", () => {
    test("returns error json", async () => {
      const res = await request(app)
        .post("/api/contacts")
        .send(invalidContact);
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Missing name or email!');
    });
  });
  describe("given a valid contact", () => {
    test("insert contact successfully", async () => {
      const res = await request(app).post("/api/contacts").send(validContact);
      validContactId = res.body.data._id;
      expect(res.body.message).toBe("New contact created!");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toEqual(validContact.name);
      expect(res.body.data.gender).toEqual(validContact.gender);
      expect(res.body.data.email).toEqual(validContact.email);
      expect(res.body.data.phone).toEqual(validContact.phone);
    });
  });
});

describe("GET", () => {
  describe("given a valid contact_id", () => {
    test("return associated contact", async () => {
      const res = await request(app).get(`/api/contacts/${validContactId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Contact details loading..");
      expect(res.body.data).not.toBeNull();
    });
  });
});


describe("PUT", () => {
  describe("modify single valid field", () => {
    test("returns contact before and after the change", async () => {
      const { gender, ...info } = validContact;
      updatedContact = {
        _id: validContactId,
        ...info,
        gender: "female",
      }; //originally male
      const res = await request(app)
        .put(`/api/contacts/${validContactId}`)
        .send(updatedContact);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.gender).toEqual('female');
      expect(res.body.message).toBe("Contact Info updated");
    });
  });
});

describe("DELETE", () => {
  describe("remove valid contact_id", () => {
    test("returns success", async () => {
      const res = await request(app).delete(
        `/api/contacts/${validContactId}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Contact deleted");
    });
  });
});
