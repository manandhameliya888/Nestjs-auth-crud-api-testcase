import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard('jwt')) // This is inbuilt guard given by passport
  @UseGuards(JwtGuard) // This is the custom guard
  @Get('me')
  // getMe(@Req() req: Request) { // This is inbuilt decorator @Req() to get Request data
  // req.user contain the data which is inside the token
  // console.log({ user: req.user });

  // getMe(@GetUser() user: User, @GetUser('email') email: string) { // If you want specific field or both like full response in 1 variable and specific field in separate variable
  // console.log(email);
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
