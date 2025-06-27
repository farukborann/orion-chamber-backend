# UserProfileDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | User ID | [default to undefined]
**firstName** | **string** | User first name | [default to undefined]
**lastName** | **string** | User last name | [default to undefined]
**email** | **string** | User email address | [default to undefined]
**isAdmin** | **boolean** | Is user admin | [default to undefined]
**profilePhoto** | **string** | Profile photo path | [optional] [default to undefined]
**profilePhotoUrl** | **string** | Profile photo URL | [optional] [default to undefined]
**createdAt** | **string** | User creation date | [default to undefined]

## Example

```typescript
import { UserProfileDto } from 'orion-chamber-user-client';

const instance: UserProfileDto = {
    id,
    firstName,
    lastName,
    email,
    isAdmin,
    profilePhoto,
    profilePhotoUrl,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
