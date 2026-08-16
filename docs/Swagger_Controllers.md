# NexusMind API - Swagger Controllers & Services Reference

**Server URL:** `https://nexusmind-889936615032.europe-west3.run.app`
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
- [chat-rest-controller](#chat-rest-controller)
- [doctor-controller](#doctor-controller)
- [doctor-profile-controller](#doctor-profile-controller)
- [gallery-controller](#gallery-controller)
- [journal-controller](#journal-controller)
- [news-controller](#news-controller)
- [onboarding-controller](#onboarding-controller)
- [otp-controller](#otp-controller)
- [profile-controller](#profile-controller)
- [site-settings-controller](#site-settings-controller)
- [super-admin-controller](#super-admin-controller)
- [training-controller](#training-controller)
- [webhook-controller](#webhook-controller)
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

**Operation ID:** `create_5`  

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

### `GET` /appointments/{id}

**Operation ID:** `getById_4`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentDto` |

---

### `PATCH` /appointments/{id}

**Operation ID:** `updateStatus_2`  

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | `path` | ✅ Yes | `integer` | - |

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | `AppointmentDto` |

---

### `GET` /appointments/stats

**Operation ID:** `getStats`  

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
| `mood` | `query` | ✅ Yes | `string` | - |

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
- **Schema:** `AdminLoginRequest`

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

**Operation ID:** `update_4`  

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

**Operation ID:** `delete_4`  

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

**Operation ID:** `create_4`  

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
| `200` | OK | Array<`PasientRegisterEntity`> |

---

### `GET` /doctors/doctors

**Operation ID:** `getAllDoctors_2`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorResponseDto`> |

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
| `200` | OK | Array<`object`> |

---

### `GET` /nexusmind/doctors

**Operation ID:** `getAllDoctors`  

#### Responses

| Status Code | Description | Schema |
| --- | --- | --- |
| `200` | OK | Array<`DoctorEntity`> |

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
| `type` | `query` | ❌ No | `string` | - |
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
| `patientName` | `string` | - | ❌ No |
| `doctorName` | `string` | - | ❌ No |
| `appointmentDate` | `string` | `date` | ❌ No |
| `appointmentTime` | `ref` | `LocalTime` | ❌ No |
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` | ❌ No |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ❌ No |
| `roomUrl` | `string` | - | ❌ No |
| `hasNote` | `boolean` | - | ❌ No |

### AppointmentEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `pasient` | `ref` | `PasientRegisterEntity` | ❌ No |
| `doctor` | `ref` | `DoctorEntity` | ❌ No |
| `appointmentDate` | `string` | `date` | ❌ No |
| `appointmentTime` | `ref` | `LocalTime` | ❌ No |
| `finishTime` | `string` | `date-time` | ❌ No |
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` | ❌ No |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ❌ No |
| `roomUrl` | `string` | - | ❌ No |
| `note` | `ref` | `SessionNote` | ❌ No |

### AppointmentStatsDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `todayCount` | `integer` | `int64` | ❌ No |
| `weekCount` | `integer` | `int64` | ❌ No |
| `monthCount` | `integer` | `int64` | ❌ No |

### AuthResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `token` | `string` | - | ❌ No |

### BlogRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ✅ Yes |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`BlogSectionRequest`> | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `authorName` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `string` | - | ❌ No |
| `slug` | `string` | - | ❌ No |

### BlogResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`BlogSectionResponse`> | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `authorName` | `string` | - | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |

### BlogSectionRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ✅ Yes |
| `text` | `string` | - | ✅ Yes |

### BlogSectionResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |
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

### CreateAppointmentRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `doctorId` | `integer` | `int64` | ✅ Yes |
| `appointmentDate` | `string` | `date` | ✅ Yes |
| `appointmentTime` | `ref` | `LocalTime` | ✅ Yes |
| `mode` | `string` | `"VR"` \| `"VIDEO_CALL"` \| `"APP"` | ✅ Yes |

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
| `title` | `string` | - | ❌ No |
| `price` | `number` | `double` | ❌ No |
| `experienceYear` | `integer` | `int32` | ❌ No |
| `rating` | `number` | `double` | ❌ No |
| `bio` | `string` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `languages` | `array` | Array<`string`> | ❌ No |
| `education` | `array` | Array<`string`> | ❌ No |
| `certificates` | `array` | Array<`string`> | ❌ No |
| `specializations` | `array` | Array<`string`> | ❌ No |

### DoctorEntity

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `username` | `string` | - | ❌ No |
| `name` | `string` | - | ❌ No |
| `surname` | `string` | - | ❌ No |
| `fatherName` | `string` | - | ❌ No |
| `university` | `string` | - | ❌ No |
| `major` | `string` | - | ❌ No |
| `imageURl` | `string` | - | ❌ No |
| `bio` | `string` | - | ❌ No |
| `price` | `number` | `double` | ❌ No |
| `age` | `integer` | `int32` | ❌ No |
| `experienceYear` | `integer` | `int32` | ❌ No |
| `email` | `string` | - | ❌ No |
| `password` | `string` | - | ❌ No |
| `title` | `string` | - | ❌ No |
| `rating` | `number` | `double` | ❌ No |
| `role` | `string` | `"SUPER_ADMIN"` \| `"BPM"` \| `"DOCTOR"` \| `"PATIENT"` \| `"SEO"` | ❌ No |
| `languages` | `array` | Array<`string`> | ❌ No |
| `education` | `array` | Array<`string`> | ❌ No |
| `certificates` | `array` | Array<`string`> | ❌ No |
| `specializations` | `array` | Array<`string`> | ❌ No |
| `appointments` | `array` | Array<`AppointmentEntity`> | ❌ No |

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
| `fatherName` | `string` | - | ❌ No |
| `age` | `integer` | `int32` | ❌ No |
| `phone` | `string` | - | ❌ No |
| `cvUrl` | `string` | - | ❌ No |

### ForgotPasswordRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ✅ Yes |

### GalleryItemRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ✅ Yes |
| `thumbnailUrl` | `string` | - | ✅ Yes |
| `mediaUrl` | `string` | - | ❌ No |
| `mediaType` | `string` | `"IMAGE"` \| `"VIDEO"` | ✅ Yes |
| `category` | `string` | `"TERAPIYALAR"` \| `"OTAQLAR"` \| `"TELIMLER"` | ✅ Yes |

### GalleryItemResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `thumbnailUrl` | `string` | - | ❌ No |
| `mediaUrl` | `string` | - | ❌ No |
| `mediaType` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
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
| `title` | `string` | - | ❌ No |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`MeqaleSectionRequestDto`> | ❌ No |
| `quote` | `string` | - | ❌ No |
| `highlightCards` | `array` | Array<`MeqaleHighlightCardRequestDto`> | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |

### MeqaleResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`MeqaleSectionResponseDto`> | ❌ No |
| `quote` | `string` | - | ❌ No |
| `highlightCards` | `array` | Array<`MeqaleHighlightCardResponseDto`> | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `doctorId` | `integer` | `int64` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |

### MeqaleSectionRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |

### MeqaleSectionResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |
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
| `environments` | `array` | Array<`string`> | ✅ Yes |
| `concerns` | `array` | Array<`string`> | ✅ Yes |

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
| `environments` | `array` | Array<`string`> | ❌ No |
| `concerns` | `array` | Array<`string`> | ❌ No |
| `completed` | `boolean` | - | ❌ No |

### PageBlogResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`BlogResponse`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageGalleryItemResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`GalleryItemResponse`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageJournalEntryResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`JournalEntryResponse`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageMeqaleResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`MeqaleResponseDto`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageTrainingResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`TrainingResponse`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### PageXeberResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `totalElements` | `integer` | `int64` | ❌ No |
| `totalPages` | `integer` | `int32` | ❌ No |
| `pageable` | `ref` | `PageableObject` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `content` | `array` | Array<`XeberResponseDto`> | ❌ No |
| `number` | `integer` | `int32` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `first` | `boolean` | - | ❌ No |
| `last` | `boolean` | - | ❌ No |
| `numberOfElements` | `integer` | `int32` | ❌ No |
| `empty` | `boolean` | - | ❌ No |

### Pageable

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `page` | `integer` | `int32` | ❌ No |
| `size` | `integer` | `int32` | ❌ No |
| `sort` | `array` | Array<`string`> | ❌ No |

### PageableObject

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `paged` | `boolean` | - | ❌ No |
| `pageNumber` | `integer` | `int32` | ❌ No |
| `pageSize` | `integer` | `int32` | ❌ No |
| `offset` | `integer` | `int64` | ❌ No |
| `sort` | `ref` | `SortObject` | ❌ No |
| `unpaged` | `boolean` | - | ❌ No |

### PasientRegisterDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `name` | `string` | - | ✅ Yes |
| `surname` | `string` | - | ✅ Yes |
| `age` | `integer` | `int32` | ❌ No |
| `email` | `string` | - | ✅ Yes |
| `password` | `string` | - | ✅ Yes |
| `phone` | `string` | - | ❌ No |

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
| `status` | `string` | `"TELEBE"` \| `"ISCI"` \| `"DIGER"` | ❌ No |
| `language` | `string` | `"AZ"` \| `"EN"` \| `"RU"` | ❌ No |
| `twoFactorEnabled` | `boolean` | - | ❌ No |
| `appointments` | `array` | Array<`AppointmentEntity`> | ❌ No |
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
| `appointment` | `ref` | `AppointmentEntity` | ❌ No |
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

### TrainingRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ✅ Yes |
| `tags` | `array` | Array<`string`> | ❌ No |
| `type` | `string` | `"ONLINE"` \| `"IN_PERSON"` | ✅ Yes |
| `trainingDate` | `string` | `date` | ✅ Yes |
| `trainingTime` | `ref` | `LocalTime` | ✅ Yes |
| `location` | `string` | - | ✅ Yes |
| `priceAzn` | `number` | - | ✅ Yes |
| `imageUrl` | `string` | - | ❌ No |
| `live` | `boolean` | - | ❌ No |

### TrainingResponse

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `tags` | `array` | Array<`string`> | ❌ No |
| `type` | `string` | - | ❌ No |
| `typeLabel` | `string` | - | ❌ No |
| `trainingDate` | `string` | `date` | ❌ No |
| `trainingTime` | `ref` | `LocalTime` | ❌ No |
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
| `status` | `string` | `"SCHEDULED"` \| `"WAITING"` \| `"IN_PROGRESS"` \| `"COMPLETED"` \| `"CANCELLED"` | ✅ Yes |

### VerifyOtpRequest

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `email` | `string` | - | ❌ No |
| `otp` | `string` | - | ❌ No |

### XeberRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`XeberSectionRequestDto`> | ❌ No |
| `quote` | `string` | - | ❌ No |
| `quoteAuthor` | `string` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `readTimeMinutes` | `integer` | `int32` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `string` | - | ❌ No |
| `slug` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |

### XeberResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `id` | `integer` | `int64` | ❌ No |
| `title` | `string` | - | ❌ No |
| `shortDescription` | `string` | - | ❌ No |
| `introText` | `string` | - | ❌ No |
| `sections` | `array` | Array<`XeberSectionResponseDto`> | ❌ No |
| `quote` | `string` | - | ❌ No |
| `quoteAuthor` | `string` | - | ❌ No |
| `imageUrl` | `string` | - | ❌ No |
| `category` | `string` | - | ❌ No |
| `readTimeMinutes` | `integer` | `int32` | ❌ No |
| `viewCount` | `integer` | `int64` | ❌ No |
| `status` | `string` | `"DRAFT"` \| `"PUBLISHED"` \| `"ARCHIVED"` | ❌ No |
| `createdAt` | `string` | `date-time` | ❌ No |
| `updatedAt` | `string` | `date-time` | ❌ No |
| `metaTitle` | `string` | - | ❌ No |
| `metaDescription` | `string` | - | ❌ No |
| `slug` | `string` | - | ❌ No |
| `schemaMarkup` | `string` | - | ❌ No |
| `metaKeywords` | `array` | Array<`string`> | ❌ No |

### XeberSectionRequestDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |

### XeberSectionResponseDto

| Property | Type | Format / Ref | Required |
| --- | --- | --- | --- |
| `title` | `string` | - | ❌ No |
| `text` | `string` | - | ❌ No |
| `sectionOrder` | `integer` | `int32` | ❌ No |

