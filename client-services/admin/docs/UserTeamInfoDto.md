# UserTeamInfoDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Team ID | [default to undefined]
**name** | **string** | Team name | [default to undefined]
**photo** | **string** | Team photo path | [optional] [default to undefined]
**photoUrl** | **string** | Team photo URL | [optional] [default to undefined]
**leadID** | **string** | Team leader ID | [default to undefined]
**totalCredits** | **number** | Total team credits | [default to undefined]
**maxCredit** | **number** | User max credit limit in this team | [default to undefined]
**creditPeriod** | **string** | User credit period | [default to undefined]
**isLeader** | **boolean** | Is user the leader of this team | [default to undefined]

## Example

```typescript
import { UserTeamInfoDto } from 'orion-chamber-admin-client';

const instance: UserTeamInfoDto = {
    id,
    name,
    photo,
    photoUrl,
    leadID,
    totalCredits,
    maxCredit,
    creditPeriod,
    isLeader,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
