import { 
    createTestContact, 
    createTestUser, 
    getTestContact, 
    removeAllTestAddresses, 
    removeAllTestContacts, 
    removeTestUser, 
    createTestAddress,
    getTestAddress
} from "./test-utils.js";
import supertest from "supertest";
import {web} from "../src/applications/web.js";
import { logger } from "../src/applications/logging.js";

describe.skip("POST /api/contacts/{contactId}/addresses", function(){
    beforeEach(async() => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async() => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it("should can create new address", async() => {
        const testContact=await getTestContact();
        const result=await supertest(web).post("/api/contacts/"+testContact.id+"/addresses")
                           .set("Authorization","test")
                           .send({
                                street:"jalan test",
                                city:"kota test",
                                province:"provinsi test",
                                country:"negara test",
                                postal_code:"1234443"
                           });
                           
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("negara test");
        expect(result.body.data.postal_code).toBe("1234443");
    })

    it("should reject if address request is invalid", async() => {
        const testContact=await getTestContact();
        const result=await supertest(web).post("/api/contacts/"+testContact.id+"/addresses")
                           .set("Authorization","test")
                           .send({
                                street:"jalan test",
                                city:"kota test",
                                province:"provinsi test",
                                country:"",
                                postal_code:""
                           });
                           
        expect(result.status).toBe(400);
    })

    it("should reject if contact is not found", async() => {
        const result=await supertest(web).post("/api/contacts/1111/addresses")
                           .set("Authorization","test")
                           .send({
                                street:"jalan test",
                                city:"kota test",
                                province:"provinsi test",
                                country:"",
                                postal_code:""
                           });
                           
        expect(result.status).toBe(400);
    })
});

describe.skip("GET /api/contacts/:contactId/adddresses/:addressId", function(){
     beforeEach(async() => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async() => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it.skip("should can get address", async() => {
        const testContact=await getTestContact();
        const testAddress=await getTestAddress();

        const result= await supertest(web).get("/api/contacts/"+testContact.id+"/addresses/"+testAddress.id)
                                          .set("Authorization","test");

        logger.info(result);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("negara test");
        expect(result.body.data.postal_code).toBe("1234443");
    })

    it("should reject if address if not found", async() => {
        const testContact=await getTestContact();

        const result= await supertest(web).get("/api/contacts/"+testContact.id+"/addresses/999")
                                          .set("Authorization","test");

        logger.info(result);

        expect(result.status).toBe(404);
    })

     it.skip("should can get address", async() => {
        const testAddress=await getTestAddress();

        const result= await supertest(web).get("/api/contacts/999/addresses/"+testAddress.id)
                                          .set("Authorization","test");

        logger.info(result);

        expect(result.status).toBe(404);
    })
});

describe.skip("PUT /api/contacts/:contactId/adddresses/:addressId", function(){
    beforeEach(async() => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async() => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })

    it.skip("should can update address", async() => {
        const testContact=await getTestContact();
        const testAddress=await getTestAddress();

        const result= await supertest(web).put("/api/contacts/"+testContact.id+"/addresses/"+testAddress.id)
                                          .set("Authorization","test")
                                          .send({
                                             street:"jalan test update",
                                             city:"kota test update",
                                             province:"provinsi test update",
                                             country:"negara test update",
                                             postal_code:"1234444"
                                          });

        logger.info(result);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test update");
        expect(result.body.data.city).toBe("kota test update");
        expect(result.body.data.province).toBe("provinsi test update");
        expect(result.body.data.country).toBe("negara test update");
        expect(result.body.data.postal_code).toBe("1234444");
    });

    it.skip("should reject if address not found", async() => {
        const testContact=await getTestContact();

        const result= await supertest(web).put("/api/contacts/"+testContact.id+"/addresses/9999999")
                                          .set("Authorization","test")
                                          .send({
                                             street:"jalan test update",
                                             city:"kota test update",
                                             province:"provinsi test update",
                                             country:"negara test update",
                                             postal_code:"1234444"
                                          });

        logger.info(result);

        expect(result.status).toBe(404);
    })

    it("should reject if contact is not found", async() => {
        const testAddress=await getTestAddress();

        const result= await supertest(web).put("/api/contacts/9999999/addresses/"+testAddress.id)
                                          .set("Authorization","test")
                                          .send({
                                             street:"jalan test update",
                                             city:"kota test update",
                                             province:"provinsi test update",
                                             country:"negara test update",
                                             postal_code:"1234444"
                                          });

        logger.info(result);

        expect(result.status).toBe(404);
    });
});

describe.skip("DELETE /api/contact/:contactId/addreses/:addressId", function () {
    beforeEach(async() => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async() => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    })


  it("should can delete addresses", async () => {
    const testContact = await getTestContact();
    let testAddress=await getTestAddress();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id+"/addresses/"+testAddress.id)
      .set("Authorization", "test");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Delete Success");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("should can reject if address is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" +testContact.id+"/addresses/9999")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should can reject if contact is not found", async () => {
    const testAddress=await getTestAddress();

    const result = await supertest(web)
      .delete("/api/contacts/999/addresses/"+testAddress.id)
      .set("Authorization", "test");

    logger.info(result);
    
    expect(result.status).toBe(404);
  });
});

describe("GET /api/contact/:contactId/addreses/:addressId", function () {
    beforeEach(async() => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    });

    afterEach(async() => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can list addresses", async() => {
        const testContact=await getTestContact();

        const result=await supertest(web)
                            .get("/api/contacts/"+testContact.id+"/addresses")
                            .set("Authorization","test");

        logger.info(result);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it("should can reject if contact is not found", async() => {
        const testContact=await getTestContact();

        const result=await supertest(web)
                            .get("/api/contacts/999/addresses")
                            .set("Authorization","test");

        logger.info(result);
        
        expect(result.status).toBe(404);
    });
});