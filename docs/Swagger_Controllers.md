# NexusMind API - Swagger Controllers & Services Reference

**Server URL:** `https://api.nexusmind.az`
**OpenAPI Version:** `3.1.0`
**API Version:** `v1.0`  

> [!IMPORTANT]
> This document is the single source of truth for all backend controllers, endpoints, DTOs, and schemas generated from the backend OpenAPI specification.

## Table of Contents

- [appointment-controller](#appointment-controller)
- [article-controller](#article-controller)
- [auth-controller](#auth-controller)
- [blog-controller](#blog-controller)
- [bpm-controller](#bpm-controller)
- [call-invite-controller](#call-invite-controller)
- [chat-rest-controller](#chat-rest-controller)
- [doctor-controller](#doctor-controller)
- [doctor-price-controller](#doctor-price-controller)
- [doctor-profile-controller](#doctor-profile-controller)
- [file-upload-controller](#file-upload-controller)
- [gallery-controller](#gallery-controller)
- [journal-controller](#journal-controller)
- [news-controller](#news-controller)
- [notification-controller](#notification-controller)
- [onboarding-controller](#onboarding-controller)
- [otp-controller](#otp-controller)
- [password-reset-controller](#password-reset-controller)
- [payment-controller](#payment-controller)
- [profile-controller](#profile-controller)
- [search-controller](#search-controller)
- [site-settings-controller](#site-settings-controller)
- [super-admin-controller](#super-admin-controller)
- [training-controller](#training-controller)
- [webhook-controller](#webhook-controller)
- [working-hour-controller](#working-hour-controller)
- [Schemas & Data Models](#schemas--data-models)

---

## appointment-controller

### `GET` /appointments

**Operation ID:** `getMyAppointments`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `range` | `query` | ❌ No | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`AppointmentDto`> |

---

### `POST` /appointments

**Operation ID:** `create_6`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `CreateAppointmentRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentDto` |

---

### `GET` /appointments/{id}/notes

**Operation ID:** `getNote`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `SessionNoteDto` |

---

### `POST` /appointments/{id}/notes

**Operation ID:** `addNote`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `CreateSessionNoteRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `SessionNoteDto` |

---

### `POST` /appointments/{id}/join-token

**Operation ID:** `getJoinToken`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

### `POST` /appointments/doctors/me/profile-image

**Operation ID:** `uploadProfileImage`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

### `POST` /appointments/compare-face

**Operation ID:** `comparePatientFace`  

#### Request Body

- **Content-Type:** `multipart/form-data`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `boolean` |

---

### `PATCH` /appointments/{id}/status

**Operation ID:** `updateStatus_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `UpdateUserStatusRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentDto` |

---

### `PATCH` /appointments/{id}/cancel

**Operation ID:** `cancel`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentDto` |

---

### `GET` /appointments/{doctorId}

**Operation ID:** `getById_4`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`AppointmentDto`> |

---

### `GET` /appointments/stats

**Operation ID:** `getStats`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentStatsDto` |

---

### `GET` /appointments/doctor/stats

**Operation ID:** `getDoctorStats`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentStatsDto` |

---

## article-controller

### `GET` /meqale/{id}

**Operation ID:** `getById_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `MeqaleResponseDto` |

---

### `PUT` /meqale/{id}

**Operation ID:** `update_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `MeqaleRequestDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `MeqaleResponseDto` |

---

### `DELETE` /meqale/{id}

**Operation ID:** `delete_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /meqale

**Operation ID:** `getAll_1`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`MeqaleResponseDto`> |

---

### `POST` /meqale

**Operation ID:** `create_2`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `MeqaleRequestDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `MeqaleResponseDto` |

---

### `GET` /meqale/search

**Operation ID:** `search_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `keyword` | `query` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageMeqaleResponseDto` |

---

### `GET` /meqale/category/{category}

**Operation ID:** `getByCategory_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category` | `path` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageMeqaleResponseDto` |

---

### `GET` /meqale/admin/all

**Operation ID:** `getAllForAdmin_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageMeqaleResponseDto` |

---

## auth-controller

### `PUT` /auth/{patientId}/mood

**Operation ID:** `updateMood`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `patientId` | `path` | ✅ Yes | `integer` | - |
| `mood` | `query` | ✅ Yes | `"SAD"` \| `"HAPPY"` \| `"TIRED"` \| `"CALM"` \| `"NORMAL"` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /auth/{id}

**Operation ID:** `getUserById`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PasientRegisterDto` |

---

### `PUT` /auth/{id}

**Operation ID:** `updateUser`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `PasientRegisterDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `DELETE` /auth/{id}

**Operation ID:** `deleteUser`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `PUT` /auth/change-password

**Operation ID:** `changePassword`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `ChangePasswordRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /auth/upload

**Operation ID:** `uploadRegistrationImage`  

#### Request Body

- **Content-Type:** `multipart/form-data`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /auth/super-admin-login

**Operation ID:** `superAdminLogin`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `AdminLoginRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/reset-password

**Operation ID:** `resetPassword`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `ResetPasswordWithOtpRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /auth/refresh

**Operation ID:** `refresh`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `RefreshTokenRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/logout

**Operation ID:** `logout`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /auth/login

**Operation ID:** `login`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `LoginRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/forgot-password

**Operation ID:** `forgotPassword`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `ForgotPasswordRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /auth/doctor-panel-login

**Operation ID:** `doctorPanelLogin`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `DoctorLoginRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/doctor-login

**Operation ID:** `doctorLogin`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `LoginRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/bpm-login

**Operation ID:** `bpmLogin`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `AdminLoginRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AuthResponse` |

---

### `POST` /auth/add

**Operation ID:** `addPasient`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `PasientRegisterDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `GET` /auth

**Operation ID:** `getAllUsers`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`PasientRegisterDto`> |

---

### `GET` /auth/validate

**Operation ID:** `validate`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `boolean` |

---

## blog-controller

### `GET` /blog/{id}

**Operation ID:** `getById_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `BlogResponse` |

---

### `PUT` /blog/{id}

**Operation ID:** `update_5`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `BlogRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `BlogResponse` |

---

### `DELETE` /blog/{id}

**Operation ID:** `delete_5`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /blog

**Operation ID:** `getAll_2`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`BlogResponse`> |

---

### `POST` /blog

**Operation ID:** `create_5`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `BlogRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `BlogResponse` |

---

### `GET` /blog/search

**Operation ID:** `search_3`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `keyword` | `query` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageBlogResponse` |

---

### `GET` /blog/category/{category}

**Operation ID:** `getByCategory_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category` | `path` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageBlogResponse` |

---

## bpm-controller

### `GET` /bpm/patients

**Operation ID:** `getPatients`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`PasientRegisterEntity`> |

---

### `GET` /bpm/doctors

**Operation ID:** `getDoctors`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorResponseDto`> |

---

## call-invite-controller

### `POST` /api/calls/{appointmentId}/invite

**Operation ID:** `invite`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `appointmentId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

### `POST` /api/calls/{appointmentId}/extend

**Operation ID:** `extend`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `appointmentId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `POST` /api/calls/join/{inviteToken}

**Operation ID:** `join`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `inviteToken` | `path` | ✅ Yes | `string` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

## chat-rest-controller

### `GET` /chat/{appointmentId}/messages

**Operation ID:** `getMessages`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `appointmentId` | `path` | ✅ Yes | `integer` | - |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`ChatMessageResponseDto`> |

---

## doctor-controller

### `POST` /doctors/register

**Operation ID:** `registerDoctor`  

#### Request Body

- **Content-Type:** `multipart/form-data`
- **Schema:** `DoctorRegisterDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `GET` /doctors/me/patients

**Operation ID:** `getMyPatients`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`PasientResponseDto`> |

---

### `GET` /doctors/doctors

**Operation ID:** `getAllDoctors_2`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorResponseDto`> |

---

## doctor-price-controller

### `PUT` /doctors/{doctorId}/prices/{priceId}

**Operation ID:** `update_4`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |
| `priceId` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `DoctorPriceRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `DoctorPriceResponse` |

---

### `DELETE` /doctors/{doctorId}/prices/{priceId}

**Operation ID:** `delete_4`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |
| `priceId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `204` | No Content | void |

---

### `GET` /doctors/{doctorId}/prices

**Operation ID:** `getPrices`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |
| `age` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorPriceResponse`> |

---

### `POST` /doctors/{doctorId}/prices

**Operation ID:** `create_4`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `DoctorPriceRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `201` | Created | `DoctorPriceResponse` |

---

## doctor-profile-controller

### `GET` /doctors

**Operation ID:** `getAllDoctors_1`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorDto`> |

---

### `GET` /doctors/{id}

**Operation ID:** `getDoctorProfile`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `DoctorDto` |

---

## file-upload-controller

### `POST` /upload

**Operation ID:** `uploadImage`  

#### Request Body

- **Content-Type:** `multipart/form-data`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `GET` /upload/{filename}

**Operation ID:** `download`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `filename` | `path` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `DELETE` /upload/{filename}

**Operation ID:** `delete_6`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `filename` | `path` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

## gallery-controller

### `PUT` /gallery/{id}

**Operation ID:** `update_3`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `GalleryItemRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `GalleryItemResponse` |

---

### `DELETE` /gallery/{id}

**Operation ID:** `delete_3`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /gallery

**Operation ID:** `getItems`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category` | `query` | ❌ No | `string` | - |
| `sort` | `query` | ❌ No | `string` | - |
| `page` | `query` | ❌ No | `integer` | - |
| `size` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageGalleryItemResponse` |

---

### `POST` /gallery

**Operation ID:** `create_3`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `GalleryItemRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `GalleryItemResponse` |

---

## journal-controller

### `POST` /journal

**Operation ID:** `saveToday`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `JournalEntryRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `JournalEntryResponse` |

---

### `GET` /journal/{id}

**Operation ID:** `getById_3`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `JournalEntryResponse` |

---

### `DELETE` /journal/{id}

**Operation ID:** `delete_7`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /journal/today

**Operation ID:** `getToday`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `JournalEntryResponse` |

---

### `GET` /journal/history

**Operation ID:** `getHistory`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `page` | `query` | ❌ No | `integer` | - |
| `size` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageJournalEntryResponse` |

---

## news-controller

### `GET` /xeber/{id}

**Operation ID:** `getById`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `XeberResponseDto` |

---

### `PUT` /xeber/{id}

**Operation ID:** `update`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `XeberRequestDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `XeberResponseDto` |

---

### `DELETE` /xeber/{id}

**Operation ID:** `delete`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /xeber

**Operation ID:** `getAll`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`XeberResponseDto`> |

---

### `POST` /xeber

**Operation ID:** `create`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `XeberRequestDto`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `XeberResponseDto` |

---

### `GET` /xeber/search

**Operation ID:** `search_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `keyword` | `query` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageXeberResponseDto` |

---

### `GET` /xeber/category/{category}

**Operation ID:** `getByCategory`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category` | `path` | ✅ Yes | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageXeberResponseDto` |

---

### `GET` /xeber/admin/all

**Operation ID:** `getAllForAdmin`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageXeberResponseDto` |

---

## notification-controller

### `POST` /api/notifications/email

**Operation ID:** `sendEmail`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `EmailNotificationRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `EmailNotificationResponse` |

---

### `GET` /api/notifications/templates

**Operation ID:** `getTemplates`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`string`> |

---

## onboarding-controller

### `POST` /onboarding/submit

**Operation ID:** `submit`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `OnboardingRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `OnboardingResponse` |

---

### `GET` /onboarding/status

**Operation ID:** `status`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `boolean` |

---

### `GET` /onboarding/me

**Operation ID:** `getMine`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `OnboardingResponse` |

---

## otp-controller

### `POST` /otp/verify

**Operation ID:** `verifyOtp`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `VerifyOtpRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

## password-reset-controller

### `POST` /api/auth/reset-password

**Operation ID:** `resetPassword_1`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `ResetPasswordRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

### `POST` /api/auth/forgot-password

**Operation ID:** `forgotPassword_1`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `ForgotPasswordRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

## payment-controller

### `POST` /api/payments/start

**Operation ID:** `start`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `StartPaymentRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `object` |

---

### `POST` /api/payments/callback

**Operation ID:** `callback`  

#### Request Body

- **Content-Type:** `application/x-www-form-urlencoded`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

## profile-controller

### `PUT` /profile/status

**Operation ID:** `updateStatus`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `UpdateProfileStatusRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `ProfileResponse` |

---

### `PUT` /profile/name

**Operation ID:** `updateName`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `UpdateNameRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `ProfileResponse` |

---

### `PUT` /profile/language

**Operation ID:** `updateLanguage`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `UpdateLanguageRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `ProfileResponse` |

---

### `PUT` /profile/email

**Operation ID:** `updateEmail`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `UpdateEmailRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `ProfileResponse` |

---

### `PUT` /profile/2fa

**Operation ID:** `updateTwoFactor`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `enabled` | `query` | ✅ Yes | `boolean` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /profile/photo

**Operation ID:** `uploadPhoto`  

#### Request Body

- **Content-Type:** `multipart/form-data`
- **Schema:** `object`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `ProfileResponse` |

---

### `DELETE` /profile/photo

**Operation ID:** `deletePhoto`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

## search-controller

### `GET` /search/journal

**Operation ID:** `searchJournal`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `q` | `query` | ✅ Yes | `string` | - |
| `page` | `query` | ❌ No | `integer` | - |
| `size` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`JournalEntryResponse`> |

---

### `GET` /search/doctors

**Operation ID:** `searchDoctors`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `q` | `query` | ✅ Yes | `string` | - |
| `lang` | `query` | ❌ No | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorSearchResult`> |

---

### `GET` /search/content

**Operation ID:** `searchContent`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `q` | `query` | ✅ Yes | `string` | - |
| `lang` | `query` | ❌ No | `string` | - |
| `page` | `query` | ❌ No | `integer` | - |
| `size` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`ContentSearchResult`> |

---

## site-settings-controller

### `GET` /sitemap.xml

**Operation ID:** `sitemapXml`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /sitemap.xml

**Operation ID:** `updateSitemapXml`  

#### Request Body

- **Content-Type:** `application/xml`
- **Schema:** `string`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /robots.txt

**Operation ID:** `robotsTxt`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /robots.txt

**Operation ID:** `updateRobotsTxt`  

#### Request Body

- **Content-Type:** `text/plain`
- **Schema:** `string`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /llms.txt

**Operation ID:** `llmsTxt`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

### `POST` /llms.txt

**Operation ID:** `updateLlmsTxt`  

#### Request Body

- **Content-Type:** `text/plain`
- **Schema:** `string`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /site-settings/scripts

**Operation ID:** `getPublicScripts`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `SiteSettingsResponseDto` |

---

## super-admin-controller

### `GET` /nexusmind/patients

**Operation ID:** `getAllPatients`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`PasientResponseDto`> |

---

### `GET` /nexusmind/doctors

**Operation ID:** `getAllDoctors`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorResponseDto`> |

---

### `DELETE` /nexusmind/doctors/{id}

**Operation ID:** `deleteDoctor`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

## training-controller

### `PUT` /trainings/{id}

**Operation ID:** `update_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `TrainingRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `TrainingResponse` |

---

### `DELETE` /trainings/{id}

**Operation ID:** `delete_1`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /trainings

**Operation ID:** `search`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `type` | `query` | ❌ No | `"ONLINE"` \| `"IN_PERSON"` | - |
| `search` | `query` | ❌ No | `string` | - |
| `pageable` | `query` | ✅ Yes | `Pageable` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `PageTrainingResponse` |

---

### `POST` /trainings

**Operation ID:** `create_1`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `TrainingRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `TrainingResponse` |

---

### `POST` /trainings/{trainingId}/register

**Operation ID:** `register`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `trainingId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `DELETE` /trainings/{trainingId}/register

**Operation ID:** `unregister`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `trainingId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /trainings/type-counts

**Operation ID:** `getTypeCounts`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`TrainingTypeCountResponse`> |

---

### `GET` /trainings/popular-tags

**Operation ID:** `getPopularTags`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `limit` | `query` | ❌ No | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`string`> |

---

### `GET` /trainings/calendar

**Operation ID:** `getMonth`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `year` | `query` | ✅ Yes | `integer` | - |
| `month` | `query` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`TrainingResponse`> |

---

## webhook-controller

### `POST` /api/webhooks/livekit

**Operation ID:** `receiveWebhook`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `Authorization` | `header` | ✅ Yes | `string` | - |

#### Request Body

- **Content-Type:** `application/webhook+json`
- **Schema:** `string`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `string` |

---

## working-hour-controller

### `GET` /doctors/me/working-hours

**Operation ID:** `getMyRanges`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `from` | `query` | ✅ Yes | `string` | - |
| `to` | `query` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`WorkingRangeDto`> |

---

### `POST` /doctors/me/working-hours

**Operation ID:** `addMyRange`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `WorkingHourRangeRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `POST` /doctors/me/working-hours/batch

**Operation ID:** `addMyWorkingHoursBatch`  

#### Request Body

- **Content-Type:** `application/json`
- **Schema:** `WorkingHoursBatchRequest`

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

### `GET` /doctors/{doctorId}/working-hours/available

**Operation ID:** `getAvailableSlots`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `doctorId` | `path` | ✅ Yes | `integer` | - |
| `from` | `query` | ✅ Yes | `string` | - |
| `to` | `query` | ✅ Yes | `string` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`AvailableSlotDto`> |

---

### `DELETE` /doctors/me/working-hours/{rangeId}

**Operation ID:** `deleteMyRange`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `rangeId` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | void |

---

## Schemas & Data Models

### AdminLoginRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `username` | `string` | - | ❌ No |
| `password` | `string` | - | ❌ No |

### AppointmentDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `patientId` | `integer` | `int64` | ❌ No |
| `patientName` | `string` | - | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `doctorName` | `string` | - | ❌ No |
| `doctorProfileImageUrl` | `string` | - | ❌ No |
| `appointmentDate` | `string` | `date` | ❌ No |
| `appointmentTime` | `LocalTime` | - | ❌ No |
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` \| `"PENDING_PAYMENT"` | ❌ No |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ❌ No |
| `roomUrl` | `string` | - | ❌ No |
| `hasNote` | `boolean` | - | ❌ No |

### AppointmentEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `pasient` | `PasientRegisterEntity` | - | ❌ No |
| `doctor` | `DoctorEntity` | - | ❌ No |
| `appointmentDate` | `string` | `date` | ❌ No |
| `appointmentTime` | `LocalTime` | - | ❌ No |
| `finishTime` | `string` | `date-time` | ❌ No |
| `durationMinutes` | `integer` | `int32` | ❌ No |
| `sessionsType` | `string` | `"INDIVIDUAL"` \| `"COUPLE"` | ❌ No |
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` \| `"PENDING_PAYMENT"` | ❌ No |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ❌ No |
| `roomUrl` | `string` | - | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `note` | `SessionNote` | - | ❌ No |

### AppointmentStatsDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `todayCount` | `integer` | `int64` | ❌ No |
| `weekCount` | `integer` | `int64` | ❌ No |
| `monthCount` | `integer` | `int64` | ❌ No |

### AuthResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `token` | `string` | - | ❌ No |
| `refreshToken` | `string` | - | ❌ No |

### AvailableSlotDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `date` | `string` | `date` | ❌ No |
| `time` | `LocalTime` | - | ❌ No |
| `booked` | `boolean` | - | ❌ No |

### BlogRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`BlogSectionRequest`> | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `authorName` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |

### BlogResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `TitleDto` | - | ❌ No |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`BlogSectionResponse`> | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `authorName` | `string` | - | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |

### BlogSectionRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `text` | `TitleDto` | - | ✅ Yes |

### BlogSectionResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ❌ No |
| `text` | `TitleDto` | - | ❌ No |
| `order` | `integer` | `int32` | ❌ No |

### ChangePasswordRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `oldPassword` | `string` | - | ✅ Yes |
| `newPassword` | `string` | - | ✅ Yes |
| `confirmPassword` | `string` | - | ✅ Yes |

### ChatMessageResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `appointmentId` | `integer` | `int64` | ❌ No |
| `senderRole` | `string` | `"SUPER_ADMIN"` \| `"BPM"` \| `"DOCTOR"` \| `"PATIENT"` \| `"SEO"` | ❌ No |
| `senderId` | `integer` | `int64` | ❌ No |
| `content` | `string` | - | ❌ No |
| `sentAt` | `string` | `date-time` | ❌ No |

### ContentSearchResult

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `type` | `string` | - | ❌ No |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |

### CreateAppointmentRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `doctorId` | `integer` | `int64` | ✅ Yes |
| `appointmentDate` | `string` | `date` | ✅ Yes |
| `appointmentTime` | `string` | `time` | ✅ Yes |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ✅ Yes |
| `durationMinutes` | `integer` | `int32` | ❌ No |
| `sessionsType` | `string` | `"INDIVIDUAL"` \| `"COUPLE"` | ❌ No |

### CreateSessionNoteRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `subjective` | `string` | - | ✅ Yes |
| `objective` | `string` | - | ✅ Yes |
| `assessment` | `string` | - | ✅ Yes |
| `plan` | `string` | - | ✅ Yes |

### DoctorDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `username` | `string` | - | ❌ No |
| `fullName` | `string` | - | ❌ No |
| `title` | `TitleDto` | - | ❌ No |
| `price` | `number` | `double` | ❌ No |
| `experienceYear` | `integer` | `int32` | ❌ No |
| `rating` | `number` | `double` | ❌ No |
| `bio` | `TitleDto` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `languages` | Array<`string`> | - | ❌ No |
| `education` | Array<`string`> | - | ❌ No |
| `certificates` | Array<`string`> | - | ❌ No |
| `specializations` | Array<`string`> | - | ❌ No |
| `trainings` | Array<`string`> | - | ❌ No |

### DoctorEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `username` | `string` | - | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `university` | `string` | - | ❌ No |
| `major` | `TitleDto` | - | ❌ No |
| `imageURl` | `string` | - | ❌ No |
| `bio` | `TitleDto` | - | ❌ No |
| `experienceYear` | `integer` | `int32` | ❌ No |
| `profileImageUrl` | `string` | - | ❌ No |
| `email` | `string` | - | ❌ No |
| `password` | `string` | - | ❌ No |
| `role` | `string` | `"SUPER_ADMIN"` \| `"BPM"` \| `"DOCTOR"` \| `"PATIENT"` \| `"SEO"` | ❌ No |
| `languages` | Array<`string`> | - | ❌ No |
| `education` | Array<`string`> | - | ❌ No |
| `specializations` | Array<`string`> | - | ❌ No |
| `trainings` | Array<`string`> | - | ❌ No |
| `prices` | Array<`DoctorPriceEntity`> | - | ❌ No |

### DoctorLoginRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ❌ No |
| `password` | `string` | - | ❌ No |

### DoctorPriceDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `label` | `string` | - | ❌ No |
| `minAge` | `integer` | `int32` | ❌ No |
| `maxAge` | `integer` | `int32` | ❌ No |
| `sessionType` | `string` | - | ❌ No |
| `durationMin` | `integer` | `int32` | ❌ No |
| `durationMax` | `integer` | `int32` | ❌ No |
| `amount` | `number` | - | ❌ No |
| `currency` | `string` | - | ❌ No |

### DoctorPriceEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `doctor` | `DoctorEntity` | - | ❌ No |
| `label` | `string` | - | ❌ No |
| `minAge` | `integer` | `int32` | ❌ No |
| `maxAge` | `integer` | `int32` | ❌ No |
| `sessionType` | `string` | - | ❌ No |
| `durationMin` | `integer` | `int32` | ❌ No |
| `durationMax` | `integer` | `int32` | ❌ No |
| `amount` | `number` | - | ❌ No |
| `currency` | `string` | - | ❌ No |

### DoctorPriceRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `label` | `string` | - | ✅ Yes |
| `minAge` | `integer` | `int32` | ❌ No |
| `maxAge` | `integer` | `int32` | ❌ No |
| `sessionType` | `string` | - | ❌ No |
| `durationMin` | `integer` | `int32` | ❌ No |
| `durationMax` | `integer` | `int32` | ❌ No |
| `amount` | `number` | - | ✅ Yes |
| `currency` | `string` | - | ❌ No |

### DoctorPriceResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `label` | `string` | - | ❌ No |
| `minAge` | `integer` | `int32` | ❌ No |
| `maxAge` | `integer` | `int32` | ❌ No |
| `sessionType` | `string` | - | ❌ No |
| `durationMin` | `integer` | `int32` | ❌ No |
| `durationMax` | `integer` | `int32` | ❌ No |
| `amount` | `number` | - | ❌ No |
| `currency` | `string` | - | ❌ No |

### DoctorRegisterDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `fatherName` | `string` | - | ❌ No |
| `age` | `integer` | `int32` | ❌ No |
| `phone` | `string` | - | ❌ No |
| `cv` | `string` | `binary` | ❌ No |

### DoctorResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `username` | `string` | - | ❌ No |
| `profileImageUrl` | `string` | - | ❌ No |
| `bio` | `TitleDto` | - | ❌ No |
| `major` | `TitleDto` | - | ❌ No |
| `prices` | Array<`DoctorPriceDto`> | - | ❌ No |

### DoctorSearchResult

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `fullName` | `string` | - | ❌ No |
| `bio` | `string` | - | ❌ No |

### EmailNotificationRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `to` | `string` | - | ✅ Yes |
| `template` | `string` | `"SESSION_REMINDER_24H"` \| `"SESSION_REMINDER_3H"` \| `"SESSION_REMINDER_30MIN"` \| `"OTP_CODE"` \| `"SESSION_CONFIRMED"` \| `"RESCHEDULE_CONFIRMED"` \| `"RESCHEDULE_REQUEST"` \| `"SPECIALIST_AVAILABILITY"` \| `"PAYMENT_RECEIPT"` \| `"SESSION_FEEDBACK"` \| `"RECOMMENDED_MATERIALS"` \| `"MILESTONE"` \| `"HABIT_DAILY"` \| `"MOOD_CHECK"` \| `"BREATHING"` \| `"JOURNAL"` \| `"PSYCH_FACT"` \| `"DAILY_RECOMMENDATION"` \| `"PODCAST_AND_BOOK_OF_DAY"` \| `"SCHEDULE_UPDATED"` \| `"FAVORITE_AVAILABLE"` \| `"WELCOME"` \| `"GUIDE_NEKSI"` \| `"FIRST_SESSION"` \| `"INACTIVE_15_DAYS"` \| `"INACTIVE_30_DAYS"` \| `"INACTIVE_60_DAYS"` \| `"NEW_SPECIALISTS"` | ✅ Yes |
| `params` | `object` | - | ❌ No |

### EmailNotificationResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `success` | `boolean` | - | ❌ No |
| `message` | `string` | - | ❌ No |
| `template` | `string` | `"SESSION_REMINDER_24H"` \| `"SESSION_REMINDER_3H"` \| `"SESSION_REMINDER_30MIN"` \| `"OTP_CODE"` \| `"SESSION_CONFIRMED"` \| `"RESCHEDULE_CONFIRMED"` \| `"RESCHEDULE_REQUEST"` \| `"SPECIALIST_AVAILABILITY"` \| `"PAYMENT_RECEIPT"` \| `"SESSION_FEEDBACK"` \| `"RECOMMENDED_MATERIALS"` \| `"MILESTONE"` \| `"HABIT_DAILY"` \| `"MOOD_CHECK"` \| `"BREATHING"` \| `"JOURNAL"` \| `"PSYCH_FACT"` \| `"DAILY_RECOMMENDATION"` \| `"PODCAST_AND_BOOK_OF_DAY"` \| `"SCHEDULE_UPDATED"` \| `"FAVORITE_AVAILABLE"` \| `"WELCOME"` \| `"GUIDE_NEKSI"` \| `"FIRST_SESSION"` \| `"INACTIVE_15_DAYS"` \| `"INACTIVE_30_DAYS"` \| `"INACTIVE_60_DAYS"` \| `"NEW_SPECIALISTS"` | ❌ No |
| `sentAt` | `string` | `date-time` | ❌ No |

### ForgotPasswordRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ✅ Yes |

### GalleryItemRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `thumbnailUrl` | `string` | - | ✅ Yes |
| `mediaUrl` | `string` | - | ❌ No |
| `mediaType` | `string` | `"IMAGE"` \| `"VIDEO"` | ✅ Yes |
| `category` | `string` | `"TERAPIYALAR"` \| `"OTAQLAR"` \| `"TELIMLER"` | ✅ Yes |
| `altText` | `TitleDto` | - | ❌ No |

### GalleryItemResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `TitleDto` | - | ❌ No |
| `thumbnailUrl` | `string` | - | ❌ No |
| `mediaUrl` | `string` | - | ❌ No |
| `mediaType` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `altText` | `TitleDto` | - | ❌ No |
| `categoryLabel` | `string` | - | ❌ No |
| `popularityScore` | `integer` | `int64` | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |

### JournalEntryRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `mood` | `string` | `"VERY_LOW"` \| `"LOW"` \| `"NEUTRAL"` \| `"GOOD"` \| `"VERY_GOOD"` | ✅ Yes |
| `thoughts` | `string` | - | ❌ No |

### JournalEntryResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `entryDate` | `string` | `date` | ❌ No |
| `mood` | `string` | - | ❌ No |
| `moodLabel` | `string` | - | ❌ No |
| `moodScore` | `integer` | `int32` | ❌ No |
| `thoughts` | `string` | - | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |

### LocalTime

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `hour` | `integer` | `int32` | ❌ No |
| `minute` | `integer` | `int32` | ❌ No |
| `second` | `integer` | `int32` | ❌ No |
| `nano` | `integer` | `int32` | ❌ No |

### LoginRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ✅ Yes |
| `password` | `string` | - | ✅ Yes |

### MeqaleHighlightCardRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `icon` | `string` | - | ❌ No |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |

### MeqaleHighlightCardResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `icon` | `string` | - | ❌ No |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |
| `cardOrder` | `integer` | `int32` | ❌ No |

### MeqaleRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`MeqaleSectionRequestDto`> | - | ❌ No |
| `quote` | `string` | - | ❌ No |
| `highlightCards` | Array<`MeqaleHighlightCardRequestDto`> | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `keywords` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |

### MeqaleResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `TitleDto` | - | ❌ No |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`MeqaleSectionResponseDto`> | - | ❌ No |
| `quote` | `string` | - | ❌ No |
| `highlightCards` | Array<`MeqaleHighlightCardResponseDto`> | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |
| `keywords` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |

### MeqaleSectionRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `text` | `TitleDto` | - | ✅ Yes |

### MeqaleSectionResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ❌ No |
| `text` | `TitleDto` | - | ❌ No |
| `sectionOrder` | `integer` | `int32` | ❌ No |

### OnboardingRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `addressType` | `string` | `"XANIM"` \| `"BEY"` | ✅ Yes |
| `therapyFormat` | `string` | `"TEK"` \| `"CUTLUK"` \| `"AILE"` \| `"DOSTLAR"` | ✅ Yes |
| `parentCount` | `integer` | `int32` | ❌ No |
| `childCount` | `integer` | `int32` | ❌ No |
| `femaleCount` | `integer` | `int32` | ❌ No |
| `maleCount` | `integer` | `int32` | ❌ No |
| `environments` | Array<`string`> | `"SESSIZ"` \| `"YARADICI"` \| `"TEBIET"` \| `"KITABXANA"` \| `"MINIMALIST"` \| `"SEMIMI"` | ✅ Yes |
| `concerns` | Array<`string`> | `"AILE_PROBLEMLERI"` \| `"SEVGI_PROBLEMLERI"` \| `"TEKLIK"` \| `"GELECEK_QAYGISI"` \| `"AGIR_DEPRESSIYA"` \| `"XRONIKI_YORGUNLUQ"` | ✅ Yes |

### OnboardingResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `addressType` | `string` | `"XANIM"` \| `"BEY"` | ❌ No |
| `therapyFormat` | `string` | `"TEK"` \| `"CUTLUK"` \| `"AILE"` \| `"DOSTLAR"` | ❌ No |
| `parentCount` | `integer` | `int32` | ❌ No |
| `childCount` | `integer` | `int32` | ❌ No |
| `femaleCount` | `integer` | `int32` | ❌ No |
| `maleCount` | `integer` | `int32` | ❌ No |
| `environments` | Array<`string`> | `"SESSIZ"` \| `"YARADICI"` \| `"TEBIET"` \| `"KITABXANA"` \| `"MINIMALIST"` \| `"SEMIMI"` | ❌ No |
| `concerns` | Array<`string`> | `"AILE_PROBLEMLERI"` \| `"SEVGI_PROBLEMLERI"` \| `"TEKLIK"` \| `"GELECEK_QAYGISI"` \| `"AGIR_DEPRESSIYA"` \| `"XRONIKI_YORGUNLUQ"` | ❌ No |
| `completed` | `boolean` | - | ❌ No |

### PageBlogResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`BlogResponse`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageGalleryItemResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`GalleryItemResponse`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageJournalEntryResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`JournalEntryResponse`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageMeqaleResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`MeqaleResponseDto`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageTrainingResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`TrainingResponse`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageXeberResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `PageableObject` | - | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | Array<`XeberResponseDto`> | - | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### Pageable

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `page` | `integer` | `int32` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `sort` | Array<`string`> | - | ❌ No |

### PageableObject

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `paged` | `boolean` | - | ❌ No |
| `pageNumber` | `integer` | `int32` | ❌ No |
| `pageSize` | `integer` | `int32` | ❌ No |
| `offset` | `integer` | `int64` | ❌ No |
| `sort` | `SortObject` | - | ❌ No |
| `unpaged` | `boolean` | - | ❌ No |

### PasientRegisterDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `name` | `string` | - | ✅ Yes |
| `surname` | `string` | - | ✅ Yes |
| `age` | `integer` | `int32` | ❌ No |
| `email` | `string` | - | ✅ Yes |
| `password` | `string` | - | ✅ Yes |
| `phone` | `string` | - | ❌ No |
| `registrationImageUrl` | `string` | - | ❌ No |

### PasientRegisterEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `email` | `string` | - | ❌ No |
| `age` | `integer` | `int32` | ✅ Yes |
| `password` | `string` | - | ❌ No |
| `phone` | `string` | - | ❌ No |
| `deletedAt` | `string` | `date-time` | ❌ No |
| `mood` | `string` | `"SAD"` \| `"HAPPY"` \| `"TIRED"` \| `"CALM"` \| `"NORMAL"` | ❌ No |
| `moodUpdatedDate` | `string` | `date` | ❌ No |
| `profileImageUrl` | `string` | - | ❌ No |
| `registrationImageUrl` | `string` | - | ❌ No |
| `status` | `string` | `"TELEBE"` \| `"ISCI"` \| `"DIGER"` | ❌ No |
| `language` | `string` | `"AZ"` \| `"EN"` \| `"RU"` | ❌ No |
| `twoFactorEnabled` | `boolean` | - | ❌ No |
| `appointments` | Array<`AppointmentEntity`> | - | ❌ No |
| `verified` | `boolean` | - | ❌ No |

### PasientResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `username` | `string` | - | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `email` | `string` | - | ❌ No |
| `age` | `integer` | `int32` | ❌ No |
| `phone` | `string` | - | ❌ No |
| `role` | `string` | `"SUPER_ADMIN"` \| `"BPM"` \| `"DOCTOR"` \| `"PATIENT"` \| `"SEO"` | ❌ No |
| `verified` | `boolean` | - | ❌ No |

### ProfileResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `email` | `string` | - | ❌ No |
| `profileImageUrl` | `string` | - | ❌ No |
| `status` | `string` | `"TELEBE"` \| `"ISCI"` \| `"DIGER"` | ❌ No |
| `language` | `string` | `"AZ"` \| `"EN"` \| `"RU"` | ❌ No |
| `twoFactorEnabled` | `boolean` | - | ❌ No |

### RefreshTokenRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `refreshToken` | `string` | - | ❌ No |

### ResetPasswordRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `token` | `string` | - | ❌ No |
| `newPassword` | `string` | - | ❌ No |

### ResetPasswordWithOtpRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ✅ Yes |
| `otp` | `string` | - | ✅ Yes |
| `newPassword` | `string` | - | ✅ Yes |
| `confirmPassword` | `string` | - | ✅ Yes |

### SessionNote

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `appointment` | `AppointmentEntity` | - | ❌ No |
| `subjective` | `string` | - | ❌ No |
| `objective` | `string` | - | ❌ No |
| `assessment` | `string` | - | ❌ No |
| `plan` | `string` | - | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |

### SessionNoteDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `subjective` | `string` | - | ❌ No |
| `objective` | `string` | - | ❌ No |
| `assessment` | `string` | - | ❌ No |
| `plan` | `string` | - | ❌ No |

### SiteSettingsResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `customHeadScripts` | `string` | - | ❌ No |
| `customBodyScripts` | `string` | - | ❌ No |
| `robotsTxt` | `string` | - | ❌ No |
| `llmsTxt` | `string` | - | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |

### SortObject

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `sorted` | `boolean` | - | ❌ No |
| `empty` | `boolean` | - | ❌ No |
| `unsorted` | `boolean` | - | ❌ No |

### StartPaymentRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `appointmentId` | `integer` | `int64` | ❌ No |
| `amount` | `number` | - | ❌ No |
| `description` | `string` | - | ❌ No |

### TitleDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `az` | `string` | - | ❌ No |
| `en` | `string` | - | ❌ No |
| `ru` | `string` | - | ❌ No |

### TrainingRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ✅ Yes |
| `tags` | Array<`string`> | - | ❌ No |
| `type` | `string` | `"ONLINE"` \| `"IN_PERSON"` | ✅ Yes |
| `trainingDate` | `string` | `date` | ✅ Yes |
| `trainingTime` | `LocalTime` | - | ✅ Yes |
| `location` | `string` | - | ✅ Yes |
| `priceAzn` | `number` | - | ✅ Yes |
| `imageUrl` | `string` | - | ❌ No |
| `live` | `boolean` | - | ❌ No |

### TrainingResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `tags` | Array<`string`> | - | ❌ No |
| `type` | `string` | - | ❌ No |
| `typeLabel` | `string` | - | ❌ No |
| `trainingDate` | `string` | `date` | ❌ No |
| `trainingTime` | `LocalTime` | - | ❌ No |
| `location` | `string` | - | ❌ No |
| `priceAzn` | `number` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `live` | `boolean` | - | ❌ No |

### TrainingTypeCountResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `value` | `string` | - | ❌ No |
| `label` | `string` | - | ❌ No |
| `count` | `integer` | `int64` | ❌ No |

### UpdateEmailRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `newEmail` | `string` | - | ✅ Yes |

### UpdateLanguageRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `language` | `string` | `"AZ"` \| `"EN"` \| `"RU"` | ✅ Yes |

### UpdateNameRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `name` | `string` | - | ✅ Yes |
| `surname` | `string` | - | ❌ No |

### UpdateProfileStatusRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `status` | `string` | `"TELEBE"` \| `"ISCI"` \| `"DIGER"` | ✅ Yes |

### UpdateUserStatusRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` \| `"PENDING_PAYMENT"` | ✅ Yes |

### VerifyOtpRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ❌ No |
| `otp` | `string` | - | ❌ No |

### WorkingDayRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `date` | `string` | `date` | ❌ No |
| `times` | Array<`LocalTime`> | - | ❌ No |

### WorkingHourRangeRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `date` | `string` | `date` | ❌ No |
| `startTime` | `string` | - | ❌ No |
| `endTime` | `string` | - | ❌ No |

### WorkingHoursBatchRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `days` | Array<`WorkingDayRequest`> | - | ❌ No |

### WorkingRangeDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `date` | `string` | - | ❌ No |
| `startTime` | `string` | - | ❌ No |
| `endTime` | `string` | - | ❌ No |

### XeberRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ✅ Yes |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`XeberSectionRequestDto`> | - | ❌ No |
| `quote` | `string` | - | ❌ No |
| `quoteAuthor` | `string` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `readTimeMinutes` | `integer` | `int32` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |

### XeberResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `TitleDto` | - | ❌ No |
| `shortDescription` | `TitleDto` | - | ❌ No |
| `introText` | `TitleDto` | - | ❌ No |
| `sections` | Array<`XeberSectionResponseDto`> | - | ❌ No |
| `quote` | `string` | - | ❌ No |
| `quoteAuthor` | `string` | - | ❌ No |
| `keywords` | `string` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `readTimeMinutes` | `integer` | `int32` | ❌ No |
| `viewCount` | `integer` | `int64` | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `TitleDto` | - | ❌ No |
| `slug` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | Array<`string`> | - | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |

### XeberSectionRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ❌ No |
| `text` | `TitleDto` | - | ❌ No |

### XeberSectionResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `TitleDto` | - | ❌ No |
| `text` | `TitleDto` | - | ❌ No |
| `sectionOrder` | `integer` | `int32` | ❌ No |
