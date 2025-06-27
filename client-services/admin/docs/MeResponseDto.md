# MeResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | User ID | [default to undefined]
**firstName** | **string** | User first name | [default to undefined]
**lastName** | **string** | User last name | [default to undefined]
**email** | **string** | User email address | [default to undefined]
**isAdmin** | **boolean** | Is user admin | [default to undefined]
**profilePhoto** | **string** | Profile photo path | [optional] [default to undefined]
**teams** | [**Array&lt;UserTeamInfoDto&gt;**](UserTeamInfoDto.md) | Teams user is member of | [default to undefined]

## Example

```typescript
import { MeResponseDto } from 'orion-chamber-admin-client';

const instance: MeResponseDto = {
    id,
    firstName,
    lastName,
    email,
    isAdmin,
    profilePhoto,
    teams,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
