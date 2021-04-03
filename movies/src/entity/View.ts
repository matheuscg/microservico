import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Movie} from "./Movie";

@Entity()
export class View {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idUser: string;

    @ManyToOne(() => Movie, movie => movie.views)
    movie: Movie;
}