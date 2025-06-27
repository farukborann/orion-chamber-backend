# VtonProcessResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Process ID | [default to undefined]
**userID** | **string** | User ID who created the process | [default to undefined]
**teamID** | **string** | Team ID | [default to undefined]
**type** | **string** | Process type | [default to undefined]
**status** | **string** | Current process status | [default to undefined]
**visibility** | **string** | Process visibility | [default to undefined]
**credit** | **number** | Credits consumed by this process | [default to undefined]
**createdAt** | **string** | Process creation date | [default to undefined]
**vtonInput** | **object** | VTON input parameters | [default to undefined]
**vtonOutput** | **object** | VTON output (only when completed) | [optional] [default to undefined]

## Example

```typescript
import { VtonProcessResponseDto } from 'orion-chamber-user-client';

const instance: VtonProcessResponseDto = {
    id,
    userID,
    teamID,
    type,
    status,
    visibility,
    credit,
    createdAt,
    vtonInput,
    vtonOutput,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
