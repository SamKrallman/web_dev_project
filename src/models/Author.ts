import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  AuthorId: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'unknown' })
  originCountry: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Relation<Book>[];
}
