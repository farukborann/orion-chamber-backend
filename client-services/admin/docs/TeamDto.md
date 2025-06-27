# TeamDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Team ID | [default to undefined]
**name** | **string** | Team name | [default to undefined]
**photo** | **string** | Team photo path | [optional] [default to undefined]
**photoUrl** | **string** | Team photo URL | [optional] [default to undefined]
**leadID** | **string** | Team leader ID | [default to undefined]
**totalCredits** | **number** | Total team credits | [default to undefined]
**createdAt** | **string** | Team creation date | [default to undefined]

## Example

```typescript
import { TeamDto } from 'orion-chamber-admin-client';

const instance: TeamDto = {
    id,
    name,
    photo,
    photoUrl,
    leadID,
    totalCredits,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
