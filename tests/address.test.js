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

describe("GET /api/contacts/:contactId/adddresses/:addressId", function(){
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

    it.skip("should can get contact", async() => {
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

     it.skip("should can get contact", async() => {
        const testAddress=await getTestAddress();

        const result= await supertest(web).get("/api/contacts/999/addresses/"+testAddress.id)
                                          .set("Authorization","test");

        logger.info(result);

        expect(result.status).toBe(404);
    })
});