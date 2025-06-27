# VtonApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createVtonProcess**](#createvtonprocess) | **POST** /api/v1/vton/create | Create a new VTON process|
|[**detectGarmentType**](#detectgarmenttype) | **POST** /api/v1/vton/detect-garment-type | Detect garment type from base64 image (Frontend use)|
|[**getUserVtonProcesses**](#getuservtonprocesses) | **GET** /api/v1/vton/processes | Get user\&#39;s VTON processes|
|[**getVtonProcessStatus**](#getvtonprocessstatus) | **GET** /api/v1/vton/status/{id} | Get VTON process status by ID|

# **createVtonProcess**
> VtonProcessResponseDto createVtonProcess(createVtonProcessDto)


### Example

```typescript
import {
    VtonApi,
    Configuration,
    CreateVtonProcessDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new VtonApi(configuration);

let createVtonProcessDto: CreateVtonProcessDto; //

const { status, data } = await apiInstance.createVtonProcess(
    createVtonProcessDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createVtonProcessDto** | **CreateVtonProcessDto**|  | |


### Return type

**VtonProcessResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **detectGarmentType**
> GarmentTypeResponseDto detectGarmentType(garmentTypeDetectionDto)


### Example

```typescript
import {
    VtonApi,
    Configuration,
    GarmentTypeDetectionDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new VtonApi(configuration);

let garmentTypeDetectionDto: GarmentTypeDetectionDto; //

const { status, data } = await apiInstance.detectGarmentType(
    garmentTypeDetectionDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **garmentTypeDetectionDto** | **GarmentTypeDetectionDto**|  | |


### Return type

**GarmentTypeResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserVtonProcesses**
> Array<VtonProcessResponseDto> getUserVtonProcesses()


### Example

```typescript
import {
    VtonApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new VtonApi(configuration);

let teamId: string; // (default to undefined)

const { status, data } = await apiInstance.getUserVtonProcesses(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**Array<VtonProcessResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getVtonProcessStatus**
> VtonProcessResponseDto getVtonProcessStatus()


### Example

```typescript
import {
    VtonApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new VtonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getVtonProcessStatus(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**VtonProcessResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

