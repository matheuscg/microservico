import { Router } from 'express';
import  MoviesRouter from "./MoviesRouter";
import CategoriesRouter from "./CategoriesRouter";

export default Router().use(CategoriesRouter).use(MoviesRouter)