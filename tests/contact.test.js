import {
  createTestUser,
  removeTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContacts
} from "./test-utils.js";
import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";

describe.skip("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it.skip("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "fajar@gmail.com",
        phone: "0812345678",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("fajar@gmail.com");
    expect(result.body.data.phone).toBe("0812345678");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "fajar@gmail.com",
        phone: "0812345678999999999999999999991311",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe.skip("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const result = await supertest(web)
      .get("/api/contacts/50")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe.skip("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Fajar",
        last_name: "Ganteng",
        email: "fajar@mars.com",
        phone: "081299928842",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Fajar");
    expect(result.body.data.last_name).toBe("Ganteng");
    expect(result.body.data.email).toBe("fajar@mars.com");
    expect(result.body.data.phone).toBe("081299928842");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "Ganteng",
        email: "fajar@mars.com",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const result = await supertest(web)
      .put("/api/contacts/45")
      .set("Authorization", "test")
      .send({
        first_name: "Fajar",
        last_name: "Ganteng",
        email: "fajar@mars.com",
        phone: "081299928842",
      });

    expect(result.status).toBe(404);
  });
});

describe.skip("DELETE /api/contact/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Delete Success");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should can reject is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", function(){
  beforeEach(async() => {
    await createTestUser(); 
    await createManyTestContacts(); 
  });

  afterEach(async() => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can seearch without paramter", async() =>{
      const result=await supertest(web).get("/api/contacts").set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it.skip("should can seearch without parameter", async() =>{
      const result=await supertest(web).get("/api/contacts").set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it.skip("should can seearch page 2", async() =>{
      const result=await supertest(web).get("/api/contacts").query({page:2}).set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(5);
      expect(result.body.paging.page).toBe(2);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it.skip("should can seearch using name", async() =>{
      const result=await supertest(web).get("/api/contacts").query({name:"test 1"}).set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });

  it("should can seearch using email", async() =>{
      const result=await supertest(web).get("/api/contacts").query({email:"test1"}).set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });

  it("should can seearch using phone", async() =>{
      const result=await supertest(web).get("/api/contacts").query({phone:"08091234561"}).set("Authorization","test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
  });
});