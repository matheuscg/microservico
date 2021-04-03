import {CategoryController} from "../controller/CategoryController";
import { Router, Request, Response, NextFunction} from 'express';
import { ValidationError, ServiceError } from "../utils/Error"

const CategoriesRouter = Router();
const PATH_CATEGORY = "/v1/categories";

CategoriesRouter.get(PATH_CATEGORY, async ( req:Request, res: Response, next:NextFunction)=>{
       try{
        const Category = new CategoryController();
        const categories = await Category.all()
        res.json(categories);
        return next()
    }catch (exception){
        if(exception instanceof ServiceError){
            res.status(500)
        }
        return next(exception)
    }
})

CategoriesRouter.post(PATH_CATEGORY, async ( req:Request, res: Response, next:NextFunction)=>{
    try{
        const Category = new CategoryController();
        const categories = await Category.save(req)
        res.json(categories);
        res.status(201);
        return next()
    }catch (exception){
        return next(exception)
    }
})

CategoriesRouter.delete(`${PATH_CATEGORY}/:idCategory`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Category = new CategoryController();
        await Category.remove(req, res)
        res.status(204).json({});
        return next()
    }catch (exception){
        logger.info(exception,"Ocorreu um erro")
        return next(exception)
    }
})

CategoriesRouter.get(`${PATH_CATEGORY}/:idCategory`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Category = new CategoryController();
        const category = await Category.one(req, res)
        res.status(!!category ? 200: 204).json(category);

        return next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        return next(exception)
    }
})

CategoriesRouter.put(`${PATH_CATEGORY}/:idCategory`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Category = new CategoryController();
        const category = await Category.update(req, res)
        res.status(!!category ? 200: 204).json(category);
        return next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        return next(exception)
    }
})

export default  CategoriesRouter;