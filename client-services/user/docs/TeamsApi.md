# TeamsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addMember**](#addmember) | **POST** /api/v1/teams/{teamId}/members | |
|[**getMyTeams**](#getmyteams) | **GET** /api/v1/teams/my-teams | |
|[**getTeam**](#getteam) | **GET** /api/v1/teams/{teamId} | |
|[**getTeamMembers**](#getteammembers) | **GET** /api/v1/teams/{teamId}/members | |
|[**removeMember**](#removemember) | **DELETE** /api/v1/teams/{teamId}/members/{userId} | |
|[**teamsTest**](#teamstest) | **GET** /api/v1/teams/test | |
|[**updateMember**](#updatemember) | **PUT** /api/v1/teams/{teamId}/members/{userId} | |
|[**updateTeam**](#updateteam) | **PUT** /api/v1/teams/{teamId} | |

# **addMember**
> AddMemberResponseDto addMember(addMemberDto)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    AddMemberDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)
let addMemberDto: AddMemberDto; //

const { status, data } = await apiInstance.addMember(
    teamId,
    addMemberDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addMemberDto** | **AddMemberDto**|  | |
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**AddMemberResponseDto**

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

# **getMyTeams**
> GetMyTeamsResponseDto getMyTeams()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

const { status, data } = await apiInstance.getMyTeams();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetMyTeamsResponseDto**

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

# **getTeam**
> TeamDto getTeam()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)

const { status, data } = await apiInstance.getTeam(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**TeamDto**

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

# **getTeamMembers**
> GetTeamMembersResponseDto getTeamMembers()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)

const { status, data } = await apiInstance.getTeamMembers(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|


### Return type

**GetTeamMembersResponseDto**

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

# **removeMember**
> RemoveMemberResponseDto removeMember()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)
let userId: string; // (default to undefined)

const { status, data } = await apiInstance.removeMember(
    teamId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**RemoveMemberResponseDto**

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

# **teamsTest**
> teamsTest()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

const { status, data } = await apiInstance.teamsTest();
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

# **updateMember**
> UpdateMemberResponseDto updateMember(updateMemberDto)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    UpdateMemberDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)
let userId: string; // (default to undefined)
let updateMemberDto: UpdateMemberDto; //

const { status, data } = await apiInstance.updateMember(
    teamId,
    userId,
    updateMemberDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateMemberDto** | **UpdateMemberDto**|  | |
| **teamId** | [**string**] |  | defaults to undefined|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UpdateMemberResponseDto**

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

# **updateTeam**
> UpdateTeamResponseDto updateTeam(updateTeamDto)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    UpdateTeamDto
} from 'orion-chamber-user-client';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: string; // (default to undefined)
let updateTeamDto: UpdateTeamDto; //

const { status, data } = await apiInstance.updateTeam(
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

**UpdateTeamResponseDto**

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

