import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @Get()
    getUserById(@Param('id') id:string) {
        return this.userService.findById(id);
    }
    
}
