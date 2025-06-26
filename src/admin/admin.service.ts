import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { MakeAdminDto } from './dto';
import { PrismaService } from '../core/services/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }

  async makeUserAdmin(makeAdminDto: MakeAdminDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: makeAdminDto.email,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: true },
    });
  }

  async removeAdminRole(makeAdminDto: MakeAdminDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: makeAdminDto.email,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: false },
    });
  }

  async deleteUser(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { deletedAt: new Date() },
    });
  }
}