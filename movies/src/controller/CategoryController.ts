import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Category} from "../entity/Category";

export class CategoryController {

    private categoryRepository = getConnection().getRepository(Category);

    async all() {
        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response) {
        return this.categoryRepository.findOne(request.params.idCategory);
    }

    async save(request: Request) {
        const newCategory = new Category();
        newCategory.name = request.body.name;
        return this.categoryRepository.save(newCategory);
    }

    async update(request: Request, response: Response) {

        const CategoryToUpdate = await this.categoryRepository.findOne(request.params.idCategory)
        CategoryToUpdate.name = request.body.name;
        return this.categoryRepository.save(CategoryToUpdate);
    }

    async remove(request: Request, response: Response) {
        const logger = response.locals.logger;
        const categoryToRemove = await this.categoryRepository.findOne(request.params.idCategory);
        if(categoryToRemove) {
            logger.info("Category: Removendo categoria")
            return this.categoryRepository.remove(categoryToRemove);
        }
        logger.info("Category: Sem categoria pra remover")
    }

}