// NexusMind API - Core Types & DTO Definitions
// Generated and synchronized with OpenAPI 3.1.0 specification (https://api.nexusmind.az)

// ── Common & Pagination ──────────────────────────────────────

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

export interface TitleDto {
  az?: string;
  en?: string;
  ru?: string;
}

export interface LocalTime {
  hour?: number;
  minute?: number;
  second?: number;
  nano?: number;
}

// ── Auth DTOs ────────────────────────────────────────────────

export type Role = 'SUPER_ADMIN' | 'BPM' | 'DOCTOR' | 'PATIENT' | 'SEO';
export type PatientMood = 'SAD' | 'HAPPY' | 'TIRED' | 'CALM' | 'NORMAL';

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface DoctorLoginRequest {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  id?: number;
  userId?: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface PasientRegisterDto {
  id?: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  password?: string;
  phone?: string;
  registrationImageUrl?: string;
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
  newPassword: string;
  confirmPassword: string;
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
  registrationImageUrl?: string;
  status?: string;
  language?: string;
  twoFactorEnabled?: boolean;
  appointments?: AppointmentEntity[];
  verified?: boolean;
}

// ── Profile DTOs ─────────────────────────────────────────────

export interface UpdateProfileStatusRequest {
  status?: 'TELEBE' | 'ISCI' | 'DIGER' | string;
}

export interface UpdateNameRequest {
  name?: string;
  surname?: string;
}

export interface UpdateLanguageRequest {
  language?: 'AZ' | 'EN' | 'RU' | string;
}

export interface UpdateEmailRequest {
  newEmail?: string;
  email?: string; // backward-compatibility alias
}

export interface ProfileResponse {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  profileImageUrl?: string;
  status?: 'TELEBE' | 'ISCI' | 'DIGER' | string;
  language?: 'AZ' | 'EN' | 'RU' | string;
  twoFactorEnabled?: boolean;
}

// ── News (Xeber) DTOs ────────────────────────────────────────

export type XeberStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface XeberSectionRequestDto {
  title?: string | TitleDto;
  text?: string | TitleDto;
}

export interface XeberSectionResponseDto {
  title?: string | TitleDto;
  text?: string | TitleDto;
  sectionOrder?: number;
  order?: number; // legacy alias
}

export interface XeberRequestDto {
  title?: string | TitleDto;
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: XeberSectionRequestDto[];
  quote?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  status?: XeberStatus;
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
}

export interface XeberResponseDto {
  id?: number;
  title?: string | TitleDto;
  titleDto?: TitleDto; // legacy helper
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: XeberSectionResponseDto[];
  quote?: string;
  quoteAuthor?: string;
  keywords?: string;
  imageUrl?: string;
  category?: string;
  readTimeMinutes?: number;
  viewCount?: number;
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
  status?: XeberStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type PageXeberResponseDto = PaginatedResponse<XeberResponseDto>;

// ── Training DTOs ────────────────────────────────────────────

export type TrainingType = 'ONLINE' | 'IN_PERSON';

export interface TrainingRequest {
  title?: string;
  tags?: string[];
  type?: TrainingType;
  trainingDate?: string;
  trainingTime?: LocalTime;
  location?: string;
  priceAzn?: number;
  imageUrl?: string;
  live?: boolean;
  // Legacy / convenience optional fields
  shortDescription?: string;
  fullDescription?: string;
  organizerName?: string;
  startDate?: string;
  endDate?: string;
  totalHours?: number;
  seats?: number;
  availableSeats?: number;
  price?: number;
  coverImageUrl?: string;
}

export interface TrainingResponse {
  id?: number;
  title?: string;
  tags?: string[];
  type?: TrainingType | string;
  typeLabel?: string;
  trainingDate?: string;
  trainingTime?: LocalTime;
  location?: string;
  priceAzn?: number;
  imageUrl?: string;
  live?: boolean;
  // Legacy / convenience optional fields
  shortDescription?: string;
  fullDescription?: string;
  organizerName?: string;
  startDate?: string;
  endDate?: string;
  totalHours?: number;
  seats?: number;
  availableSeats?: number;
  price?: number;
  coverImageUrl?: string;
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

// ── Article (Meqale) DTOs ────────────────────────────────────

export interface MeqaleSectionRequestDto {
  title?: string | TitleDto;
  text?: string | TitleDto;
  sectionOrder?: number;
}

export interface MeqaleSectionResponseDto {
  title?: string | TitleDto;
  text?: string | TitleDto;
  sectionOrder?: number;
}

export interface MeqaleHighlightCardRequestDto {
  icon?: string;
  title?: string;
  text?: string;
}

export interface MeqaleHighlightCardResponseDto {
  id?: number;
  icon?: string;
  title?: string;
  text?: string;
  cardOrder?: number;
}

export interface MeqaleRequestDto {
  title?: string | TitleDto;
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: MeqaleSectionRequestDto[];
  quote?: string;
  highlightCards?: MeqaleHighlightCardRequestDto[];
  imageUrl?: string;
  category?: string;
  doctorId?: number;
  status?: XeberStatus;
  keywords?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
  // Legacy alias
  highlightCard?: MeqaleHighlightCardRequestDto;
  readTimeMinutes?: number;
}

export interface MeqaleResponseDto {
  id?: number;
  title?: string | TitleDto;
  titleDto?: TitleDto; // legacy helper
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: MeqaleSectionResponseDto[];
  quote?: string;
  highlightCards?: MeqaleHighlightCardResponseDto[];
  imageUrl?: string;
  category?: string;
  doctorId?: number;
  status?: XeberStatus;
  createdAt?: string;
  updatedAt?: string;
  keywords?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
  // Legacy alias
  highlightCard?: MeqaleHighlightCardResponseDto;
  readTimeMinutes?: number;
}

export type PageMeqaleResponseDto = PaginatedResponse<MeqaleResponseDto>;

// ── Blog DTOs ────────────────────────────────────────────────

export interface BlogSectionRequest {
  title?: string | TitleDto;
  text?: string | TitleDto;
}

export interface BlogSectionResponse {
  title?: string | TitleDto;
  text?: string | TitleDto;
  order?: number;
}

export interface BlogRequest {
  title?: string | TitleDto;
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: BlogSectionRequest[];
  imageUrl?: string;
  category?: string;
  authorName?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
}

export interface BlogResponse {
  id?: number;
  title?: string | TitleDto;
  titleDto?: TitleDto;
  shortDescription?: string | TitleDto;
  introText?: string | TitleDto;
  sections?: BlogSectionResponse[];
  imageUrl?: string;
  category?: string;
  authorName?: string;
  createdAt?: string;
  updatedAt?: string;
  schemaMarkup?: string;
  metaKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string | TitleDto;
  slug?: string;
}

export type PageBlogResponse = PaginatedResponse<BlogResponse>;

// ── Gallery DTOs ─────────────────────────────────────────────

export type MediaType = 'IMAGE' | 'VIDEO';
export type GalleryCategory = 'TERAPIYALAR' | 'OTAQLAR' | 'TELIMLER';

export interface GalleryItemRequest {
  title?: string | TitleDto;
  thumbnailUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  category?: GalleryCategory;
  altText?: string | TitleDto;
}

export interface GalleryItemResponse {
  id?: number;
  title?: string | TitleDto;
  thumbnailUrl?: string;
  mediaUrl?: string;
  mediaType?: MediaType | string;
  category?: GalleryCategory | string;
  altText?: string | TitleDto;
  categoryLabel?: string;
  popularityScore?: number;
  createdAt?: string;
}

export type PageGalleryItemResponse = PaginatedResponse<GalleryItemResponse>;

// ── Journal DTOs ─────────────────────────────────────────────

export type JournalMood = 'VERY_LOW' | 'LOW' | 'NEUTRAL' | 'GOOD' | 'VERY_GOOD';

export interface JournalEntryRequest {
  mood?: JournalMood;
  thoughts?: string | TitleDto;
}

export interface JournalEntryResponse {
  id?: number;
  entryDate?: string;
  mood?: JournalMood | string;
  moodLabel?: string;
  moodScore?: number;
  thoughts?: string | TitleDto;
  createdAt?: string;
  updatedAt?: string;
}

export type PageJournalEntryResponse = PaginatedResponse<JournalEntryResponse>;

// ── Onboarding DTOs ──────────────────────────────────────────

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

// ── Doctor & Working Hour DTOs ───────────────────────────────

export interface DoctorRegisterDto {
  name?: string;
  surname?: string;
  fatherName?: string;
  age?: number;
  phone?: string;
  cv?: string | File | Blob;
}

export interface DoctorDto {
  id?: number;
  username?: string;
  fullName?: string;
  title?: string | TitleDto;
  price?: number;
  experienceYear?: number;
  rating?: number;
  bio?: string | TitleDto;
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
  title?: string | TitleDto;
  bio?: string | TitleDto;
  major?: string | TitleDto;
}

export interface DoctorEntity {
  id?: number;
  username?: string;
  name?: string;
  surname?: string;
  fatherName?: string;
  university?: string;
  major?: string | TitleDto;
  imageURl?: string;
  bio?: string | TitleDto;
  price?: number;
  age?: number;
  experienceYear?: number;
  profileImageUrl?: string;
  email?: string;
  password?: string;
  title?: string | TitleDto;
  rating?: number;
  role?: Role;
  languages?: string[];
  education?: string[];
  certificates?: string[];
  specializations?: string[];
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface DayTemplate {
  dayOfWeek?: DayOfWeek;
  hours?: number[];
}

export interface SaveWeeklyTemplateRequest {
  days?: DayTemplate[];
}

export interface AvailableSlotDto {
  date: string;
  time: string;
  booked: boolean;
}

// ── Appointment DTOs ─────────────────────────────────────────

export type AppointmentStatus = 'SCHEDULED' | 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type AppointmentMode = 'VR' | 'VIDEO_CALL' | 'APP';

export interface UpdateUserStatusRequest {
  status: AppointmentStatus;
}

export interface CreateAppointmentRequest {
  doctorId?: number;
  appointmentDate?: string;
  appointmentTime?: string;
  mode?: AppointmentMode;
}

export interface SessionNoteDto {
  id?: number;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}

export interface CreateSessionNoteRequest {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface SessionNote {
  id?: number;
  appointment?: AppointmentEntity;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  createdAt?: string;
}

export interface AppointmentDto {
  id?: number;
  patientId?: number;
  patientName?: string;
  doctorId?: number;
  doctorName?: string;
  doctorProfileImageUrl?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  status?: AppointmentStatus;
  mode?: AppointmentMode;
  roomUrl?: string;
  hasNote?: boolean;
}

export interface AppointmentEntity {
  id?: number;
  pasient?: PasientRegisterEntity;
  doctor?: DoctorEntity;
  appointmentDate?: string;
  appointmentTime?: string;
  finishTime?: string;
  status?: AppointmentStatus;
  mode?: AppointmentMode;
  roomUrl?: string;
  note?: SessionNote;
}

export interface JoinTokenResponse {
  token: string;
  serverUrl: string;
  roomName: string;
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

// ── Site Settings DTOs ───────────────────────────────────────

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

// ── Doctor Price & Payment DTOs ──────────────────────────────

export interface DoctorPriceResponse {
  id?: number;
  doctorId?: number;
  label?: string;
  minAge?: number;
  maxAge?: number;
  sessionType?: string;
  durationMin?: number;
  durationMax?: number;
  amount?: number;
  currency?: string;
}

export interface StartPaymentRequest {
  amount?: number;
  description?: string;
}

export interface StartPaymentResponse {
  url?: string;
  redirectUrl?: string;
  redirect_url?: string;
  paymentUrl?: string;
  payment_url?: string;
  link?: string;
  [key: string]: unknown;
}
