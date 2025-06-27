## orion-chamber-user-client@1.0.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install orion-chamber-user-client@1.0.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AuthApi* | [**getMe**](docs/AuthApi.md#getme) | **GET** /api/v1/auth/me | 
*AuthApi* | [**login**](docs/AuthApi.md#login) | **POST** /api/v1/auth/login | 
*AuthApi* | [**logout**](docs/AuthApi.md#logout) | **POST** /api/v1/auth/logout | 
*AuthApi* | [**register**](docs/AuthApi.md#register) | **POST** /api/v1/auth/register | 
*StorageApi* | [**serveFile**](docs/StorageApi.md#servefile) | **GET** /api/v1/storage/serve/{path} | 
*StorageApi* | [**storageTest**](docs/StorageApi.md#storagetest) | **GET** /api/v1/storage/test | 
*StorageApi* | [**uploadFile**](docs/StorageApi.md#uploadfile) | **POST** /api/v1/storage/upload | 
*TeamsApi* | [**addMember**](docs/TeamsApi.md#addmember) | **POST** /api/v1/teams/{teamId}/members | 
*TeamsApi* | [**getMyTeams**](docs/TeamsApi.md#getmyteams) | **GET** /api/v1/teams/my-teams | 
*TeamsApi* | [**getTeam**](docs/TeamsApi.md#getteam) | **GET** /api/v1/teams/{teamId} | 
*TeamsApi* | [**getTeamMembers**](docs/TeamsApi.md#getteammembers) | **GET** /api/v1/teams/{teamId}/members | 
*TeamsApi* | [**removeMember**](docs/TeamsApi.md#removemember) | **DELETE** /api/v1/teams/{teamId}/members/{userId} | 
*TeamsApi* | [**teamsTest**](docs/TeamsApi.md#teamstest) | **GET** /api/v1/teams/test | 
*TeamsApi* | [**updateMember**](docs/TeamsApi.md#updatemember) | **PUT** /api/v1/teams/{teamId}/members/{userId} | 
*TeamsApi* | [**updateTeam**](docs/TeamsApi.md#updateteam) | **PUT** /api/v1/teams/{teamId} | 
*UsersApi* | [**getProfile**](docs/UsersApi.md#getprofile) | **GET** /api/v1/users/profile | 
*UsersApi* | [**updateProfile**](docs/UsersApi.md#updateprofile) | **PUT** /api/v1/users/profile | 
*UsersApi* | [**usersTest**](docs/UsersApi.md#userstest) | **GET** /api/v1/users/test | 
*VtonApi* | [**createVtonProcess**](docs/VtonApi.md#createvtonprocess) | **POST** /api/v1/vton/create | Create a new VTON process
*VtonApi* | [**detectGarmentType**](docs/VtonApi.md#detectgarmenttype) | **POST** /api/v1/vton/detect-garment-type | Detect garment type from base64 image (Frontend use)
*VtonApi* | [**getUserVtonProcesses**](docs/VtonApi.md#getuservtonprocesses) | **GET** /api/v1/vton/processes | Get user\&#39;s VTON processes
*VtonApi* | [**getVtonProcessStatus**](docs/VtonApi.md#getvtonprocessstatus) | **GET** /api/v1/vton/status/{id} | Get VTON process status by ID


### Documentation For Models

 - [AddMemberDto](docs/AddMemberDto.md)
 - [AddMemberResponseDto](docs/AddMemberResponseDto.md)
 - [CreateVtonProcessDto](docs/CreateVtonProcessDto.md)
 - [FileInfoDto](docs/FileInfoDto.md)
 - [FileUploadDto](docs/FileUploadDto.md)
 - [FileUploadResponseDto](docs/FileUploadResponseDto.md)
 - [GarmentTypeDetectionDto](docs/GarmentTypeDetectionDto.md)
 - [GarmentTypeResponseDto](docs/GarmentTypeResponseDto.md)
 - [GetMyTeamsResponseDto](docs/GetMyTeamsResponseDto.md)
 - [GetTeamMembersResponseDto](docs/GetTeamMembersResponseDto.md)
 - [LoginDto](docs/LoginDto.md)
 - [LoginResponseDto](docs/LoginResponseDto.md)
 - [LogoutResponseDto](docs/LogoutResponseDto.md)
 - [MeResponseDto](docs/MeResponseDto.md)
 - [RegisterDto](docs/RegisterDto.md)
 - [RegisterResponseDto](docs/RegisterResponseDto.md)
 - [RemoveMemberResponseDto](docs/RemoveMemberResponseDto.md)
 - [TeamDto](docs/TeamDto.md)
 - [TeamMemberDto](docs/TeamMemberDto.md)
 - [UpdateMemberDto](docs/UpdateMemberDto.md)
 - [UpdateMemberResponseDto](docs/UpdateMemberResponseDto.md)
 - [UpdateProfileDto](docs/UpdateProfileDto.md)
 - [UpdateProfileResponseDto](docs/UpdateProfileResponseDto.md)
 - [UpdateTeamDto](docs/UpdateTeamDto.md)
 - [UpdateTeamResponseDto](docs/UpdateTeamResponseDto.md)
 - [UserDataDto](docs/UserDataDto.md)
 - [UserProfileDto](docs/UserProfileDto.md)
 - [UserTeamInfoDto](docs/UserTeamInfoDto.md)
 - [VtonProcessResponseDto](docs/VtonProcessResponseDto.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="cookie"></a>
### cookie

- **Type**: API key
- **API key parameter name**: connect.sid
- **Location**: 

