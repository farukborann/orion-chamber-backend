import {
  IsString,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Validates if string is a valid MongoDB ObjectID format (24 character hex string)
 * Does NOT transform the value, only validates structure
 */
export function IsMongoID(validationOptions?: ValidationOptions) {
  return applyDecorators(
    ApiProperty({
      type: String,
      description: 'MongoDB ObjectID (24 character hex string)',
      example: '507f1f77bcf86cd799439011',
    }),
    IsString(),
    // Custom validation for MongoDB ObjectID format
    function (object: any, propertyName: string) {
      registerDecorator({
        name: 'isMongoID',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return (
              typeof value === 'string' &&
              value.length === 24 &&
              /^[0-9a-fA-F]{24}$/.test(value)
            );
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a valid MongoDB ObjectID (24 character hex string)`;
          },
        },
      });
    },
  );
}