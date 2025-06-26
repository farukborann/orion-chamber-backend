import * as bcrypt from 'bcrypt';

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../core/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null, // Soft delete check
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
        deletedAt: null, // Initialize deletedAt for soft delete
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null, // Soft delete check
      },
      include: {
        teamMemberships: {
          where: {
            deletedAt: null, // Only non-deleted team memberships
          },
          include: {
            team: true,
          },
        },
      },
    });
  }

  async createInitialAdmin(): Promise<void> {
    const adminEmail = 'admin@oriontwin.com';
    const adminPassword = 'otad12..';

    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await this.prisma.user.create({
        data: {
          firstName: 'Admin',
          lastName: 'OrionTwin',
          email: adminEmail,
          password: hashedPassword,
          isAdmin: true,
          deletedAt: null, // Initialize deletedAt for soft delete
        },
      });
      console.log('Initial admin created:', adminEmail);
    }
  }
}