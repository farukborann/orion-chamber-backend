# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminTest**](#admintest) | **GET** /api/v1/admin/test | |
|[**deleteUser**](#deleteuser) | **DELETE** /api/v1/admin/users/{email} | |
|[**getAllUsers**](#getallusers) | **GET** /api/v1/admin/users | |
|[**makeUserAdmin**](#makeuseradmin) | **POST** /api/v1/admin/make-admin | |
|[**removeAdminRole**](#removeadminrole) | **POST** /api/v1/admin/remove-admin | |

# **adminTest**
> adminTest()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.adminTest();
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

# **deleteUser**
> DeleteUserResponseDto deleteUser()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.deleteUser(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**DeleteUserResponseDto**

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

# **getAllUsers**
> GetAllUsersResponseDto getAllUsers()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.getAllUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetAllUsersResponseDto**

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

# **makeUserAdmin**
> MakeAdminResponseDto makeUserAdmin(makeAdminDto)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    MakeAdminDto
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let makeAdminDto: MakeAdminDto; //

const { status, data } = await apiInstance.makeUserAdmin(
    makeAdminDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **makeAdminDto** | **MakeAdminDto**|  | |


### Return type

**MakeAdminResponseDto**

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

# **removeAdminRole**
> RemoveAdminResponseDto removeAdminRole(makeAdminDto)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    MakeAdminDto
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let makeAdminDto: MakeAdminDto; //

const { status, data } = await apiInstance.removeAdminRole(
    makeAdminDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **makeAdminDto** | **MakeAdminDto**|  | |


### Return type

**RemoveAdminResponseDto**

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

