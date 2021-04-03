import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Category} from "./Category";
import {View} from "./View";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    release: string;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany(() => View, view => view.movie)
    views: View[];
}