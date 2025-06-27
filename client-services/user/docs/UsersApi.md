# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getProfile**](#getprofile) | **GET** /api/v1/users/profile | |
|[**updateProfile**](#updateprofile) | **PUT** /api/v1/users/profile | |
|[**usersTest**](#userstest) | **GET** /api/v1/users/test | |

# **getProfile**
> UserProfileDto getProfile()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserProfileDto**

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

# **updateProfile**
> UpdateProfileResponseDto updateProfile(updateProfileDto)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UpdateProfileDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let updateProfileDto: UpdateProfileDto; //

const { status, data } = await apiInstance.updateProfile(
    updateProfileDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProfileDto** | **UpdateProfileDto**|  | |


### Return type

**UpdateProfileResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersTest**
> usersTest()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.usersTest();
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

