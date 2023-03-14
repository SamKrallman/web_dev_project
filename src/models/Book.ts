import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Author } from './Author';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column({ default: true })
  name: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Relation<Author>[];
}
