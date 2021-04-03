import {MovieController} from "../controller/MovieController";
import { Router, Request, Response, NextFunction} from 'express';
import { ValidationError, ServiceError } from "../utils/Error"

const MoviesRouter = Router();
const MOVIE_PATH = "/v1/movies";
MoviesRouter.get(MOVIE_PATH, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movies = await Movie.all()
        res.json(movies);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

MoviesRouter.post(MOVIE_PATH, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movies = await Movie.save(req);
        res.status(201).json(movies);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

MoviesRouter.get(`${MOVIE_PATH}/:idMovie`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.one(req,res);
        res.status(!!movie ? 200: 204).json(movie);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

MoviesRouter.put(`${MOVIE_PATH}/:idMovie`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.update(req,res);
        res.status(!!movie ? 200: 204).json(movie);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})


MoviesRouter.get(`${MOVIE_PATH}/:idMovie/views`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.getView(req,res);
        res.status(!!movie ? 200: 204).json(movie);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

MoviesRouter.post(`${MOVIE_PATH}/:idMovie/views`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.saveView(req,res);
        res.status( 201).json({});
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})


MoviesRouter.get(`${MOVIE_PATH}/:idMovie/views/:idView`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.getViewOne(req,res);
        res.status(!!movie ? 200: 204).json(movie);
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

MoviesRouter.delete(`${MOVIE_PATH}/:idMovie/views/:idView`, async ( req:Request, res: Response, next:NextFunction)=>{
    const logger = res.locals.logger;
    try{
        const Movie = new MovieController();
        const movie = await Movie.removeView(req,res);
        res.status(!!movie ? 200: 204).json({});
        next()
    }catch (exception){
        logger.info(exception, "Ocorreu um erro")
        next(exception)
    }
})

export default MoviesRouter;