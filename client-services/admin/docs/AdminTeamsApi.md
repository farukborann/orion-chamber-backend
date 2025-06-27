# AdminTeamsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminTeamsTest**](#adminteamstest) | **GET** /api/v1/admin/teams/test | Admin teams endpoints test|
|[**createTeam**](#createteam) | **POST** /api/v1/admin/teams | Create a new team (Admin only)|
|[**deleteTeam**](#deleteteam) | **DELETE** /api/v1/admin/teams/{teamId} | Delete team (Admin only)|
|[**getAllTeams**](#getallteams) | **GET** /api/v1/admin/teams | Get all teams (Admin only)|
|[**updateTeamAsAdmin**](#updateteamasadmin) | **PUT** /api/v1/admin/teams/{teamId} | Update team as admin|

# **adminTeamsTest**
> adminTeamsTest()


### Example

```typescript
import {
    AdminTeamsApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminTeamsApi(configuration);

const { status, data } = await apiInstance.adminTeamsTest();
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

# **createTeam**
> CreateTeamResponseDto createTeam(createTeamDto)


### Example

```typescript
import {
    AdminTeamsApi,
    Configuration,
    CreateTeamDto
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminTeamsApi(configuration);

let createTeamDto: CreateTeamDto; //

const { status, data } = await apiInstance.createTeam(
    createTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTeamDto** | **CreateTeamDto**|  | |


### Return type

**CreateTeamResponseDto**

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

# **deleteTeam**
> DeleteTeamResponseDto deleteTeam()


### Example

```typescript
import {
    AdminTeamsApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminTeamsApi(configuration);

let teamId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteTeam(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**DeleteTeamResponseDto**

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

# **getAllTeams**
> GetAllTeamsResponseDto getAllTeams()


### Example

```typescript
import {
    AdminTeamsApi,
    Configuration
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminTeamsApi(configuration);

const { status, data } = await apiInstance.getAllTeams();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetAllTeamsResponseDto**

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

# **updateTeamAsAdmin**
> UpdateTeamAsAdminResponseDto updateTeamAsAdmin(updateTeamDto)


### Example

```typescript
import {
    AdminTeamsApi,
    Configuration,
    UpdateTeamDto
} from 'orion-chamber-admin-client';

const configuration = new Configuration();
const apiInstance = new AdminTeamsApi(configuration);

let teamId: string; // (default to undefined)
let updateTeamDto: UpdateTeamDto; //

const { status, data } = await apiInstance.updateTeamAsAdmin(
    teamId,
    updateTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTeamDto** | **UpdateTeamDto**|  | |
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**UpdateTeamAsAdminResponseDto**

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

