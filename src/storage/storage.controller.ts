import { Response } from 'express';

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileUploadDto, FileUploadResponseDto } from './dto';
import { StorageService } from './storage.service';
import { AuthGuard } from '../core/guards/auth.guard';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  async uploadFile(
    @Body() fileUploadDto: FileUploadDto,
  ): Promise<FileUploadResponseDto> {
    const fileInfo = await this.storageService.uploadFile(fileUploadDto);

    return {
      message: 'File uploaded successfully',
      file: {
        path: fileInfo.filePath,
        fileName: fileInfo.fileName,
        originalName: fileInfo.originalName,
        category: fileInfo.category,
        size: fileInfo.size,
        url: this.storageService.getFileUrl(fileInfo.filePath),
      },
    };
  }

  @Get('serve/*path')
  @UseGuards(AuthGuard)
  async serveFile(@Param('path') filePath: string, @Res() res: Response) {
    try {
      // Security: prevent directory traversal
      if (filePath.includes('..') || filePath.includes('~')) {
        throw new NotFoundException('File not found');
      }

      const fileExists = await this.storageService.fileExists(filePath);
      if (!fileExists) {
        throw new NotFoundException('File not found');
      }

      const fileBuffer = await this.storageService.getFile(filePath);

      // Set appropriate headers
      res.set({
        'Content-Type': this.getMimeType(filePath),
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000', // 1 year cache
      });

      res.send(fileBuffer);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  @Get('test')
  @ApiOperation({ operationId: 'storageTest' })
  test() {
    return { message: 'Storage endpoints are working!' };
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.toLowerCase().split('.').pop();
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }
}
