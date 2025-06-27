# CreateTeamDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**leaderId** | **string** | MongoDB ObjectID (24 character hex string) | [default to undefined]
**name** | **string** |  | [default to undefined]
**photo** | **string** |  | [optional] [default to undefined]
**totalCredits** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateTeamDto } from 'orion-chamber-admin-client';

const instance: CreateTeamDto = {
    leaderId,
    name,
    photo,
    totalCredits,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
