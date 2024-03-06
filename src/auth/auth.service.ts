import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // Generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // Save the new user in the DB
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash: hash },

        // If you want specific fields from database rather than getting all fields
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });

      // Return the saved user
      // delete user.hash;
      // return user;

      // Return the saved user
      return {
        message: 'Signed Up Successfully!',
        access_token: (await this.signToken(user.id, user.email)).access_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Already Taken!');
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // If User does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials are Incorrect!');

    // Compare Password
    const passwordMatches = await argon.verify(user.hash, dto.password);

    // If password incorrect throw exception
    if (!passwordMatches)
      throw new ForbiddenException('Credentials are Incorrect');

    // Send Back Login Success
    // delete user.hash;

    return {
      message: 'Logged In Successfully!',
      access_token: (await this.signToken(user.id, user.email)).access_token,
    };

    // return user;
    // return { message: 'I have Signed IN' };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    // This will return the token as string
    // return this.jwt.signAsync(payload, {
    //   expiresIn: '15m',
    //   secret: secret,
    // });

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
