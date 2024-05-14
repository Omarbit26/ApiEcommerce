import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Role } from './roles.enums';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getUsers(@Query('page') page:string, @Query('limit') limit:string){
        if(page && limit){
            return this.userService.getUsers(Number(page), Number(limit))
        }
            return this.userService.getUsers(1, 5)
        }
    
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getUser(@Param('id',ParseUUIDPipe) id:string){
        return this.userService.getUser(id);
    }



    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() user:UpdateUserDto){
        return this.userService.updateUser(id,user)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id',ParseUUIDPipe) id: string){
        return this.userService.deleteUser(id)
    }
}
