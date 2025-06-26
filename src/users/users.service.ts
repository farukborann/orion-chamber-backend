import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateProfileDto } from './dto';
import { PrismaService } from '../core/services/prisma.service';
import { FileCategory } from '../storage/dto';
import { StorageService, FileInfo } from '../storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null, // Soft delete check
      },
    });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = {};

    // Handle profile photo upload
    if (updateProfileDto.profilePhoto) {
      // Delete old profile photo if exists
      if (user.profilePhoto) {
        await this.storageService.deleteFile(user.profilePhoto);
      }

      // Upload new profile photo
      const fileInfo: FileInfo = await this.storageService.uploadFile({
        fileData: updateProfileDto.profilePhoto,
        fileName: `profile-${userId}`,
        category: FileCategory.PROFILE,
      });

      updateData.profilePhoto = fileInfo.filePath;
    }

    // Update other fields
    if (updateProfileDto.firstName) {
      updateData.firstName = updateProfileDto.firstName;
    }
    if (updateProfileDto.lastName) {
      updateData.lastName = updateProfileDto.lastName;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getProfilePhotoUrl(profilePhoto?: string): string | null {
    if (!profilePhoto) return null;
    return this.storageService.getFileUrl(profilePhoto);
  }
}
