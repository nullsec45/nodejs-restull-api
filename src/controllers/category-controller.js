import categoryService from "../services/category-service.js";

const create=async(req, res, next) => {
    try{
        const user=req.user;
        const request=req.body;
        const contactId=req.params.contactId;

        const result=await categoryService.create(user, contactId, request)
        
        res.status(200).json({
            data: result
        });
    }catch(e){
        next(e);
    }
}

const get=async(req, res, next) => {
    try{
        const result=await categoryService.findAll();

        res.status(200).json({
            data:result
        });
    }catch(e){
        next(e);
    }
}

const update=async (req, res,next) => {
    try{
        const user=req.user;
        const request=req.body;
        const contactId=req.params.contactId;

        const result=await categoryService.update(user, contactId, request);
        res.status(200).json({
            data:result
        });
    }catch(e){
        next(e);
    }
}

const remove=async(req, res, next) => {
    try{
        const user=req.user;
        const contactId=req.params.contactId;
        const addressId=req.params.addressId;

        await categoryService.remove(user, contactId, addressId);

        res.status(200).json({
            message:"Delete Success"
        });
    }catch(e){
        next(e);
    }
}

const list=async(req, res, next) => {
    try{
        const user=req.user;
        const contactId=req.params.contactId;

        const result=await categoryService.list(user, contactId);

        res.status(200).json({
            data:result
        });
    }catch(e){
        next(e);
    }
}

export default{
    create,
    get,
    update,
    remove,
    list
}