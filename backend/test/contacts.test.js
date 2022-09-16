const request = require("supertest");

const createServer = require("../services/express.service");
const { invalidContact, validContact } = require("./test.utils");

const app = createServer();

let contactCount = 0;
let validContactId = "";
let updatedContact = {};

describe(`from "/healthcheck`, () => {
  describe("GET", () => {
    test("returns status of Express", async () => {
      const res = await request(app).get("/healthcheck");
      expect(res.statusCode).toBe(200);
    });
  });
});

describe(`from "/contacts"`, () => {
  describe("GET", () => {
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
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Missing name or email!');
      });
    });
    describe("given a valid contact", () => {
      test("insert contact successfully", async () => {
        const res = await request(app).post("/api/contacts").send(validContact);
        expect(res.body.message).toBe("New contact created!");
        expect(res.statusCode).toBe(200);
        expect(_.omit(res.body.data, "_id")).toEqual(validContact);
      });
    });
  });
});

describe(`from "/contacts/:contact_id`, () => {
  describe("GET", () => {
    describe("given a valid contact_id", () => {
      test("return associated contact", async () => {
        const res = await request(app).get(`/api/contacts/${validContactId}`);
        expect(res.statusCode).toBe(200);
        expect(_.omit(res.body.data, "_id")).toEqual(validContact);
      });
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
          .patch(`/api/contacts/${validContactId}`)
          .send(updatedContact);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.initial).toEqual({
          _id: validContactId,
          ...validContact,
        });
        expect(res.body.data.updated).toEqual(updatedContact);
      });
    });
  });

  describe("DELETE", () => {
    describe("skipping invalid contact_id", () => {});
    describe("remove valid contact_id", () => {
      test("returns success json with the deleted contact infomation", async () => {
        const res = await request(app).delete(
          `/api/contacts/${validContactId}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(updatedContact);
      });
    });
  });