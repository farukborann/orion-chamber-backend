import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileUploadDto, FileCategory } from './dto';

export interface FileInfo {
  filePath: string;
  fileName: string;
  originalName: string;
  category: FileCategory;
  size: number;
  mimeType?: string;
}

@Injectable()
export class StorageService {
  private readonly uploadPath = join(process.cwd(), 'uploads');

  async uploadFile(fileUploadDto: FileUploadDto): Promise<FileInfo> {
    try {
      // Validate base64 format
      if (!fileUploadDto.fileData.includes('data:')) {
        throw new BadRequestException('Invalid base64 format');
      }

      // Extract mime type and base64 data
      const [header, base64Data] = fileUploadDto.fileData.split(',');
      const mimeType = header.match(/data:([^;]+);/)?.[1];

      if (!base64Data) {
        throw new BadRequestException('Invalid base64 data');
      }

      // Generate unique filename
      const fileExtension = this.getExtensionFromMimeType(
        mimeType || fileUploadDto.mimeType,
      );
      const uniqueFileName = `${uuidv4()}${fileExtension}`;

      // Create directory path
      const categoryPath = join(this.uploadPath, fileUploadDto.category);
      const filePath = join(categoryPath, uniqueFileName);

      // Ensure directory exists
      await fs.mkdir(categoryPath, { recursive: true });

      // Convert base64 to buffer and save
      const buffer = Buffer.from(base64Data, 'base64');
      await fs.writeFile(filePath, buffer);

      // Return relative path for database storage
      const relativePath = join(fileUploadDto.category, uniqueFileName);

      return {
        filePath: relativePath,
        fileName: uniqueFileName,
        originalName: fileUploadDto.fileName,
        category: fileUploadDto.category,
        size: buffer.length,
        mimeType: mimeType || fileUploadDto.mimeType,
      };
    } catch (error) {
      throw new BadRequestException(`File upload failed: ${error.message}`);
    }
  }

  async getFile(filePath: string): Promise<Buffer> {
    try {
      const fullPath = join(this.uploadPath, filePath);
      return await fs.readFile(fullPath);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = join(this.uploadPath, filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      // Don't throw error if file doesn't exist
      console.warn(`Failed to delete file: ${filePath}`, error.message);
    }
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      const fullPath = join(this.uploadPath, filePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  getFileUrl(filePath: string): string {
    return `/storage/serve/${filePath}`;
  }

  getFullFileUrl(filePath: string, baseUrl?: string): string {
    const defaultBaseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const base = baseUrl || defaultBaseUrl;
    return `${base}/storage/serve/${filePath}`;
  }

  private getExtensionFromMimeType(mimeType?: string): string {
    if (!mimeType) return '';

    const mimeToExt: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg',
    };

    return mimeToExt[mimeType] || '';
  }
}
