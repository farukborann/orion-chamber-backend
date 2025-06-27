## orion-chamber-admin-client@1.0.0

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
npm install orion-chamber-admin-client@1.0.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AdminApi* | [**adminTest**](docs/AdminApi.md#admintest) | **GET** /api/v1/admin/test | 
*AdminApi* | [**deleteUser**](docs/AdminApi.md#deleteuser) | **DELETE** /api/v1/admin/users/{email} | 
*AdminApi* | [**getAllUsers**](docs/AdminApi.md#getallusers) | **GET** /api/v1/admin/users | 
*AdminApi* | [**makeUserAdmin**](docs/AdminApi.md#makeuseradmin) | **POST** /api/v1/admin/make-admin | 
*AdminApi* | [**removeAdminRole**](docs/AdminApi.md#removeadminrole) | **POST** /api/v1/admin/remove-admin | 
*AdminTeamsApi* | [**adminTeamsTest**](docs/AdminTeamsApi.md#adminteamstest) | **GET** /api/v1/admin/teams/test | Admin teams endpoints test
*AdminTeamsApi* | [**createTeam**](docs/AdminTeamsApi.md#createteam) | **POST** /api/v1/admin/teams | Create a new team (Admin only)
*AdminTeamsApi* | [**deleteTeam**](docs/AdminTeamsApi.md#deleteteam) | **DELETE** /api/v1/admin/teams/{teamId} | Delete team (Admin only)
*AdminTeamsApi* | [**getAllTeams**](docs/AdminTeamsApi.md#getallteams) | **GET** /api/v1/admin/teams | Get all teams (Admin only)
*AdminTeamsApi* | [**updateTeamAsAdmin**](docs/AdminTeamsApi.md#updateteamasadmin) | **PUT** /api/v1/admin/teams/{teamId} | Update team as admin
*AuthApi* | [**getMe**](docs/AuthApi.md#getme) | **GET** /api/v1/auth/me | 
*AuthApi* | [**login**](docs/AuthApi.md#login) | **POST** /api/v1/auth/login | 
*AuthApi* | [**logout**](docs/AuthApi.md#logout) | **POST** /api/v1/auth/logout | 
*AuthApi* | [**register**](docs/AuthApi.md#register) | **POST** /api/v1/auth/register | 
*StorageApi* | [**serveFile**](docs/StorageApi.md#servefile) | **GET** /api/v1/storage/serve/{path} | 
*StorageApi* | [**storageTest**](docs/StorageApi.md#storagetest) | **GET** /api/v1/storage/test | 
*StorageApi* | [**uploadFile**](docs/StorageApi.md#uploadfile) | **POST** /api/v1/storage/upload | 


### Documentation For Models

 - [AdminUserDto](docs/AdminUserDto.md)
 - [CreateTeamDto](docs/CreateTeamDto.md)
 - [CreateTeamResponseDto](docs/CreateTeamResponseDto.md)
 - [DeleteTeamResponseDto](docs/DeleteTeamResponseDto.md)
 - [DeleteUserResponseDto](docs/DeleteUserResponseDto.md)
 - [FileInfoDto](docs/FileInfoDto.md)
 - [FileUploadDto](docs/FileUploadDto.md)
 - [FileUploadResponseDto](docs/FileUploadResponseDto.md)
 - [GetAllTeamsResponseDto](docs/GetAllTeamsResponseDto.md)
 - [GetAllUsersResponseDto](docs/GetAllUsersResponseDto.md)
 - [LoginDto](docs/LoginDto.md)
 - [LoginResponseDto](docs/LoginResponseDto.md)
 - [LogoutResponseDto](docs/LogoutResponseDto.md)
 - [MakeAdminDto](docs/MakeAdminDto.md)
 - [MakeAdminResponseDto](docs/MakeAdminResponseDto.md)
 - [MeResponseDto](docs/MeResponseDto.md)
 - [RegisterDto](docs/RegisterDto.md)
 - [RegisterResponseDto](docs/RegisterResponseDto.md)
 - [RemoveAdminResponseDto](docs/RemoveAdminResponseDto.md)
 - [TeamDto](docs/TeamDto.md)
 - [UpdateTeamAsAdminResponseDto](docs/UpdateTeamAsAdminResponseDto.md)
 - [UpdateTeamDto](docs/UpdateTeamDto.md)
 - [UserDataDto](docs/UserDataDto.md)
 - [UserTeamInfoDto](docs/UserTeamInfoDto.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="cookie"></a>
### cookie

- **Type**: API key
- **API key parameter name**: connect.sid
- **Location**: 

