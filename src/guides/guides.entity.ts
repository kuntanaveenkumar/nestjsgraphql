import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType() 
@Entity('guides') 
export class Guide {
  @Field(() => ID) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  make: string;

  @Field()
  @Column()
  model: string;

  @Field()
  @Column()
  modelnames: string;

  @Field()
  @Column()
  vehicletrim: string;

  @Field()  
  @Column()
  vehicleyear: string;

  @Field(() => Date) 
  @CreateDateColumn({ type: "timestamp" })
  dateadded: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  dateupdated: Date;
}
