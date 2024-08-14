import { prismaClient } from "../applications/database.js";
import { validate } from "../validations/validation.js";
import {getContactValidation} from "../validations/contact-validation.js";
import { ResponseError } from "../errors/response-errror.js";
import { createAddressValidation, getAddressValidation } from "../validations/address-validation.js";

const _checkContatMustExists=async(user, contactId) => {
     contactId=validate(getContactValidation, contactId);

    const totalContactInDatabase=await prismaClient.contact.count({
        where:{
            username:user.username,
            id:contactId
        }
    });

   
    if(totalContactInDatabase == 0){
        throw new ResponseError(404, "contact is not found");
    }

    return contactId;
}

const create=async(user,contactIdParams, request) => {
    const contactId=await _checkContatMustExists(user, contactIdParams);

    const address=validate(createAddressValidation, request);
    address.contact_id=contactId;

    return prismaClient.address.create({
        data:address,
        select:{
            id:true,
            street:true,
            city:true,
            province:true,
            country:true,
            postal_code:true
        }
    });
}

const get= async(user, contactId, addressId) => {
    contactId=await _checkContatMustExists(user, contactId);
    addressId=validate(getAddressValidation, addressId);

    const address=await prismaClient.address.findFirst({
        where:{
            contact_id:contactId,
            id:addressId
        },
        select:{
            id:true,
            street:true,
            city:true,
            province:true,
            country:true,
            postal_code:true
        }
    });

    if(!address){
        throw new ResponseError(404, "address if not found");
    }

    return address;
}
export default {create, get}