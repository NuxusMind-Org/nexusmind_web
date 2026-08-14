// NexusMind API - Core Types & DTO Definitions

// --- Common & Pagination ---
export interface Pageable {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface SortObject {
  sorted?: boolean;
  empty?: boolean;
  unsorted?: boolean;
}

export interface PageableObject {
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  offset?: number;
  sort?: SortObject;
  unpaged?: boolean;
}

export interface PaginatedResponse<T> {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  size?: number;
  content?: T[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

// --- Auth DTOs ---
export type Role = 'SUPER_ADMIN' | 'BPM' | 'DOCTOR' | 'PATIENT';
export type PatientMood = 'SAD' | 'HAPPY' | 'TIRED' | 'CALM' | 'NORMAL';

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}

export interface PasientRegisterDto {
  name: string;
  surname: string;
  age: number;
  email: string;
  password?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordWithOtpRequest {
  email: string;
  otp: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface VerifyOtpRequest {
  email?: string;
  otp?: string;
}

export interface AdminLoginRequest {
  username?: string;
  password?: string;
}

export interface PasientRegisterEntity {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  age?: number;
  password?: string;
  phone?: string;
  deletedAt?: string;
  mood?: PatientMood;
  moodUpdatedDate?: string;
  profileImageUrl?: string;
  status?: string;
  language?: string;
  twoFactorEnabled?: boolean;
  verified?: boolean;
}

// --- Profile DTOs ---
export interface UpdateProfileStatusRequest {
  status?: string;
}

export interface UpdateNameRequest {
  name?: string;
  surname?: string;
}

export interface UpdateLanguageRequest {
  language?: string;
}

export interface UpdateEmailRequest {
  email?: string;
}

export interface ProfileResponse {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  status?: string;
  language?: string;
  profileImageUrl?: string;
  twoFactorEnabled?: boolean;
}

// --- News (Xeber) DTOs ---
export type XeberStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface XeberSectionRequestDto {
  title?: string;
  text?: string;
}

export interface XeberSectionResponseDto {
  title?: string;
  text?: string;
  order?: number;
}

export interface XeberRequestDto {
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: XeberSectionRequestDto[];
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  status?: XeberStatus;
}

export interface XeberResponseDto {
  id?: number;
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: XeberSectionResponseDto[];
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  status?: XeberStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type PageXeberResponseDto = PaginatedResponse<XeberResponseDto>;

// --- Training DTOs ---
export type TrainingType = 'ONLINE' | 'IN_PERSON';

export interface TrainingRequest {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  location?: string;
  organizerName?: string;
  startDate?: string;
  endDate?: string;
  totalHours?: number;
  seats?: number;
  availableSeats?: number;
  price?: number;
  type?: TrainingType;
  coverImageUrl?: string;
  tags?: string[];
}

export interface TrainingResponse {
  id?: number;
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  location?: string;
  organizerName?: string;
  startDate?: string;
  endDate?: string;
  totalHours?: number;
  seats?: number;
  availableSeats?: number;
  price?: number;
  type?: TrainingType;
  coverImageUrl?: string;
  tags?: string[];
  registeredUsersCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type PageTrainingResponse = PaginatedResponse<TrainingResponse>;

export interface TrainingTypeCountResponse {
  value?: string;
  label?: string;
  count?: number;
}

// --- Article (Meqale) DTOs ---
export interface MeqaleSectionRequestDto {
  title?: string;
  text?: string;
  sectionOrder?: number;
}

export interface MeqaleSectionResponseDto {
  title?: string;
  text?: string;
  sectionOrder?: number;
}

export interface MeqaleHighlightCardRequestDto {
  title?: string;
  text?: string;
}

export interface MeqaleHighlightCardResponseDto {
  id?: number;
  title?: string;
  text?: string;
}

export interface MeqaleRequestDto {
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: MeqaleSectionRequestDto[];
  highlightCard?: MeqaleHighlightCardRequestDto;
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  doctorId?: number;
  status?: XeberStatus;
  schemaMarkup?: string;
  metaKeywords?: string[];
}

export interface MeqaleResponseDto {
  id?: number;
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: MeqaleSectionResponseDto[];
  highlightCard?: MeqaleHighlightCardResponseDto;
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  doctorId?: number;
  status?: XeberStatus;
  createdAt?: string;
  updatedAt?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
}

export type PageMeqaleResponseDto = PaginatedResponse<MeqaleResponseDto>;

// --- Blog DTOs ---
export interface BlogSectionRequest {
  title?: string;
  text?: string;
}

export interface BlogSectionResponse {
  title?: string;
  text?: string;
  order?: number;
}

export interface BlogRequest {
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: BlogSectionRequest[];
  imageUrl?: string;
  category?: string;
  authorName?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
}

export interface BlogResponse {
  id?: number;
  title?: string;
  shortDescription?: string;
  introText?: string;
  sections?: BlogSectionResponse[];
  imageUrl?: string;
  category?: string;
  authorName?: string;
  createdAt?: string;
  updatedAt?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
}

export type PageBlogResponse = PaginatedResponse<BlogResponse>;

// --- Gallery DTOs ---
export type MediaType = 'IMAGE' | 'VIDEO';
export type GalleryCategory = 'TERAPIYALAR' | 'OTAQLAR' | 'TELIMLER';

export interface GalleryItemRequest {
  title?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  category?: GalleryCategory;
}

export interface GalleryItemResponse {
  id?: number;
  title?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  category?: GalleryCategory;
  categoryLabel?: string;
  popularityScore?: number;
  createdAt?: string;
}

export type PageGalleryItemResponse = PaginatedResponse<GalleryItemResponse>;

// --- Journal DTOs ---
export type JournalMood = 'VERY_LOW' | 'LOW' | 'NEUTRAL' | 'GOOD' | 'VERY_GOOD';

export interface JournalEntryRequest {
  mood?: JournalMood;
  thoughts?: string;
}

export interface JournalEntryResponse {
  id?: number;
  entryDate?: string;
  mood?: JournalMood;
  moodLabel?: string;
  moodScore?: number;
  thoughts?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type PageJournalEntryResponse = PaginatedResponse<JournalEntryResponse>;

// --- Onboarding DTOs ---
export type AddressType = 'XANIM' | 'BEY';
export type TherapyFormat = 'TEK' | 'CUTLUK' | 'AILE' | 'DOSTLAR';

export interface OnboardingRequest {
  addressType?: AddressType | null;
  therapyFormat?: TherapyFormat | null;
  parentCount?: number;
  childCount?: number;
  femaleCount?: number;
  maleCount?: number;
  environments?: string[];
  concerns?: string[];
}

export interface OnboardingResponse {
  id?: number;
  addressType?: AddressType;
  therapyFormat?: TherapyFormat;
  parentCount?: number;
  childCount?: number;
  femaleCount?: number;
  maleCount?: number;
  environments?: string[];
  concerns?: string[];
  completed?: boolean;
}

// --- Doctor DTOs ---
export interface DoctorRegisterDto {
  name?: string;
  surname?: string;
  fatherName?: string;
  age?: number;
  phone?: string;
  cv?: string;
}

export interface DoctorDto {
  id?: number;
  username?: string;
  fullName?: string;
  title?: string;
  price?: number;
  experienceYear?: number;
  rating?: number;
  bio?: string;
  imageUrl?: string;
  languages?: string[];
  education?: string[];
  certificates?: string[];
  specializations?: string[];
}

export interface DoctorResponseDto {
  id?: number;
  name?: string;
  surname?: string;
  fatherName?: string;
  age?: number;
  phone?: string;
  cvUrl?: string;
}

// --- Appointment DTOs ---
export type AppointmentStatus = 'SCHEDULED' | 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type AppointmentMode = 'VR' | 'VIDEO_CALL' | 'APP';

export interface CreateAppointmentRequest {
  doctorId?: number;
  appointmentDate?: string;
  appointmentTime?: string; // HH:mm:ss format
  mode?: AppointmentMode;
}

export interface AppointmentDto {
  id?: number;
  patientName?: string;
  doctorName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  status?: AppointmentStatus;
  mode?: AppointmentMode;
  roomUrl?: string;
  hasNote?: boolean;
}

export interface CreateSessionNoteRequest {
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}

export interface SessionNoteDto {
  id?: number;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}

export interface AppointmentStatsDto {
  todayCount?: number;
  weekCount?: number;
  monthCount?: number;
}

export interface ChatMessageResponseDto {
  id?: number;
  appointmentId?: number;
  senderRole?: Role;
  senderId?: number;
  content?: string;
  sentAt?: string;
}

// --- Site Settings DTOs ---
export type PostKeywordType = 'ARTICLE' | 'BLOG' | 'NEWS';

export interface SiteSettingsRequestDto {
  customHeadScripts?: string;
  customBodyScripts?: string;
  robotsTxt?: string;
  llmsTxt?: string;
}

export interface SiteSettingsResponseDto {
  customHeadScripts?: string;
  customBodyScripts?: string;
  robotsTxt?: string;
  llmsTxt?: string;
  updatedAt?: string;
}

export interface PostKeywordsRequestDto {
  postId?: number;
  type?: PostKeywordType;
  keywords?: string[];
}
