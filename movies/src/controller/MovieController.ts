import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Movie} from "../entity/Movie";
import {Category} from "../entity/Category";
import {View} from "../entity/View";

export class MovieController {

    private movieRepository = getConnection().getRepository(Movie);
    private viewRepository = getConnection().getRepository(View);
    private categoryRepository = getConnection().getRepository(Category);
    async all() {
        return this.movieRepository.find();
    }

    async one(request: Request, response: Response) {
        return this.movieRepository.findOne(request.params.id);
    }

    async update(request: Request, response: Response) {

        const movieToUpdate = await this.movieRepository.findOne(request.params.idMovie)
        movieToUpdate.name = request.body.name
        movieToUpdate.description = request.body.description
        movieToUpdate.image = request.body.image
        movieToUpdate.release = request.body.release
        return this.categoryRepository.save(movieToUpdate);
    }

    async save(request: Request) {

        // pegar a lista de categorias do filme
        // depois de cadastrar, cadastrar usuários
        const movieToSave = new Movie()
        movieToSave.name = request.body.name
        movieToSave.description = request.body.description
        movieToSave.image = request.body.image
        movieToSave.release = request.body.release

        return this.movieRepository.save(movieToSave);
    }

    async saveView(request: Request, response: Response) {
        const logger = response.locals.logger;
        // tslint:disable-next-line:radix
        const movie: Movie = await this.movieRepository.findOne(request.params.idMovie);

        if(!!movie){
            logger.info("Filme não encontrado")
        }
        const view = new View()
        view.idUser = request.body.idUser;
        view.movie = movie
        return this.viewRepository.save(view);
    }
    async getView(request: Request, response: Response) {
        const logger = response.locals.logger;
        const movie: Movie = await this.movieRepository.findOne(request.params.idMovie);

        if(!!movie){
            logger.info("Filme não encontrado")
        }
        const view = new View()
        view.idUser = request.body.idUser;
        view.movie = movie
        return this.viewRepository.find({movie});
    }

    async getViewOne(request: Request, response: Response) {
        const logger = response.locals.logger;
        const movie: Movie = await this.movieRepository.findOne(request.params.idMovie);

        if(!!movie){
            logger.info("Filme não encontrado")
        }
        const view = new View()
        view.id = Number(request.params.idView);
        view.movie = movie
        return this.viewRepository.findOne(view);
    }

    async removeView(request: Request, response: Response) {
        const logger = response.locals.logger;
        const movie: Movie = await this.movieRepository.findOne(request.params.idMovie);

        if(!!movie){
            logger.info("Filme não encontrado")
        }
        const view = new View()
        view.id = Number(request.params.idView);
        view.movie = movie
        return this.viewRepository.remove(view);
    }
    async remove(request: Request, response: Response, next: NextFunction) {
        const logger = response.locals.logger;
        const movieToRemove = await this.movieRepository.findOne(request.params.id);
        if(movieToRemove) {
            logger.info("Category: Removendo categoria")
            return this.movieRepository.remove(movieToRemove);
        }
        logger.info("Category: Sem categoria pra remover")
    }

}