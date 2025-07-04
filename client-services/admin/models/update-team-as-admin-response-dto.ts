/* tslint:disable */
/* eslint-disable */
/**
 * Orion Chamber Admin API
 * Admin-only endpoints for system management
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { TeamDto } from './team-dto';

/**
 * 
 * @export
 * @interface UpdateTeamAsAdminResponseDto
 */
export interface UpdateTeamAsAdminResponseDto {
    /**
     * Success message
     * @type {string}
     * @memberof UpdateTeamAsAdminResponseDto
     */
    'message': string;
    /**
     * Updated team data
     * @type {TeamDto}
     * @memberof UpdateTeamAsAdminResponseDto
     */
    'team': TeamDto;
}

