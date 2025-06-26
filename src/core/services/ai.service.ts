import { Injectable, Logger } from '@nestjs/common';
import { GarmentType } from '../../vton/types';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiBaseUrl = process.env.AI_MODULE_URL!;

  /**
   * Get garment type from AI module for frontend use
   */
  async getGarmentType(garmentBase64: string): Promise<GarmentType> {
    try {
      const response = await fetch(`${this.aiBaseUrl}/get-garment-type`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          garment: garmentBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Service error: ${response.statusText}`);
      }

      const result = await response.json();
      this.logger.log(`Garment type detected: ${result.garmentType}`);

      return result.garmentType as GarmentType;
    } catch (error) {
      this.logger.error('Failed to get garment type from AI service', error);
      throw new Error('AI service is not available');
    }
  }
}