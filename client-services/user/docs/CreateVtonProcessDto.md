# CreateVtonProcessDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**teamId** | **string** | Team ID (ObjectId) | [default to undefined]
**mannequin** | **string** | Mannequin ID (ObjectId) or base64 uploaded image | [default to undefined]
**garment** | **string** | Base64 encoded garment image | [default to undefined]
**garmentType** | **string** | Type of garment (must be detected first using detect-garment-type endpoint) | [default to undefined]
**nSteps** | **number** | Number of processing steps (affects quality and processing time) | [default to undefined]
**manuelMask** | **string** | Optional manual mask as base64 image | [optional] [default to undefined]
**visibility** | **string** | Process visibility (me &#x3D; only user, team &#x3D; team members can see) | [optional] [default to undefined]

## Example

```typescript
import { CreateVtonProcessDto } from 'orion-chamber-user-client';

const instance: CreateVtonProcessDto = {
    teamId,
    mannequin,
    garment,
    garmentType,
    nSteps,
    manuelMask,
    visibility,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
