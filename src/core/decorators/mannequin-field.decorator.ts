import { Transform } from 'class-transformer';
import {
  IsString,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';

/**
 * Validates mannequin field that can be either:
 * - Valid string ID (for predefined mannequins - 24 char hex string)
 * - Base64 encoded image string (for uploaded images)
 */
export function IsMannequinField() {
  return applyDecorators(
    IsString(),
    // Custom validation for mannequin (string ID or base64)
    function (object: any, propertyName: string) {
      registerDecorator({
        name: 'isMannequinField',
        target: object.constructor,
        propertyName: propertyName,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') return false;

            // Check if it's a valid string ID (24 character hex string)
            if (value.length === 24 && /^[0-9a-fA-F]{24}$/.test(value)) {
              return true;
            }

            // Check if it's a base64 image
            const base64Pattern =
              /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
            return base64Pattern.test(value);
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be either a valid string ID or a base64 encoded image`;
          },
        },
      });
    },
    // No transform needed - keep strings as-is
  );
}