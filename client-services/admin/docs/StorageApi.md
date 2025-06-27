# StorageApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**serveFile**](#servefile) | **GET** /api/v1/storage/serve/{path} | |
|[**storageTest**](#storagetest) | **GET** /api/v1/storage/test | |
|[**uploadFile**](#uploadfile) | **POST** /api/v1/storage/upload | |

# **serveFile**
> serveFile()


### Example

```typescript
import {
    StorageApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new StorageApi(configuration);

let path: string; // (default to undefined)

const { status, data } = await apiInstance.serveFile(
    path
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **path** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **storageTest**
> storageTest()


### Example

```typescript
import {
    StorageApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new StorageApi(configuration);

const { status, data } = await apiInstance.storageTest();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadFile**
> FileUploadResponseDto uploadFile(fileUploadDto)


### Example

```typescript
import {
    StorageApi,
    Configuration,
    FileUploadDto
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new StorageApi(configuration);

let fileUploadDto: FileUploadDto; //

const { status, data } = await apiInstance.uploadFile(
    fileUploadDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fileUploadDto** | **FileUploadDto**|  | |


### Return type

**FileUploadResponseDto**

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

