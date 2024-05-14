import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from './users.service';
import { UsersRepository } from "./users.repository";
import { PostValidator, PutValidator } from "../../middlewares/userValidation.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers: [UsersService,UsersRepository]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostValidator).forRoutes({path : 'users', method: RequestMethod.POST})
        .apply(PutValidator).forRoutes({path : 'users/:id', method: RequestMethod.PUT})
    }
}