import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Resolver, Query } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';
import { User } from './users/users.orm.entity';
import { Guide } from './guides/guides.entity';
//import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'test',
    entities: [User, Guide],
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
    introspection: true,
  }), UsersModule, AuthModule, GuidesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource
      .initialize()
      .then(() => {
        console.log('Database connected successfully!');
      })
      .catch((err) => {
        console.error('Failed to connect to the database:', err);
      });
  }
}