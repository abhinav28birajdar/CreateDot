// Comprehensive Type Definitions for DesignDot Platform

// ============ USER TYPES ============
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  tagline?: string;
  location?: string;
  website?: string;
  portfolioUrl?: string;
  accountType: 'creator' | 'client';
  experienceLevel?: 'beginner' | 'intermediate' | 'senior' | 'expert';
  isVerified: boolean;
  isPro: boolean;
  isAvailableForHire: boolean;
  hourlyRate?: number;
  projectMinBudget?: number;
  skills: string[];
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
  lastSeenAt?: string;
  followersCount: number;
  followingCount: number;
  projectsCount: number;
  likesReceivedCount: number;
  viewsCount: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface UserProfile extends User {
  longBio?: string;
  languages?: string[];
  specializations?: string[];
  clientList?: string[];
  awards?: Award[];
  education?: Education[];
  experience?: Experience[];
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

// ============ PROJECT TYPES ============
export interface Project {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  images: ProjectImage[];
  videos?: ProjectVideo[];
  category: string;
  subcategory?: string;
  tags: string[];
  tools: string[];
  colorPalette?: string[];
  externalUrl?: string;
  attachments?: Attachment[];
  visibility: 'public' | 'private' | 'password' | 'unlisted';
  password?: string;
  allowComments: boolean;
  allowDownloads: boolean;
  isMature: boolean;
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  coCreators?: User[];
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
  savesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface ProjectImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
  order: number;
  alt?: string;
}

export interface ProjectVideo {
  id: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  order: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// ============ COMMENT TYPES ============
export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  projectId: string;
  parentId?: string;
  replies?: Comment[];
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
}

export interface Reaction {
  id: string;
  type: string;
  userId: string;
  user: User;
}

// ============ COLLECTION TYPES ============
export interface Collection {
  id: string;
  title: string;
  description?: string;
  coverImages: string[];
  visibility: 'public' | 'private' | 'unlisted';
  allowCollaborators: boolean;
  collaborators?: User[];
  userId: string;
  user: User;
  projectsCount: number;
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

// ============ JOB TYPES ============
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  niceToHave?: string[];
  benefits?: string[];
  category: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  locationType: 'remote' | 'onsite' | 'hybrid';
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: 'hourly' | 'monthly' | 'yearly';
  experienceLevel: string;
  applicationDeadline?: string;
  applicationMethod: 'email' | 'form' | 'external';
  applicationEmail?: string;
  applicationUrl?: string;
  companyId: string;
  company: Company;
  isFeatured: boolean;
  status: 'active' | 'closed' | 'draft';
  viewsCount: number;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  size?: string;
  industry?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  job: Job;
  userId: string;
  user: User;
  coverLetter?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewing' | 'rejected' | 'hired';
  createdAt: string;
  updatedAt: string;
}

// ============ MESSAGE TYPES ============
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  attachments?: Attachment[];
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

// ============ NOTIFICATION TYPES ============
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId: string;
  actorId?: string;
  actor?: User;
  projectId?: string;
  project?: Project;
  jobId?: string;
  job?: Job;
  isRead: boolean;
  createdAt: string;
}

export type NotificationType = 
  | 'follow'
  | 'like'
  | 'comment'
  | 'reply'
  | 'mention'
  | 'save'
  | 'feature'
  | 'job_match'
  | 'message'
  | 'milestone'
  | 'system';

// ============ ACTIVITY TYPES ============
export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  user: User;
  targetUserId?: string;
  targetUser?: User;
  projectId?: string;
  project?: Project;
  commentId?: string;
  comment?: Comment;
  createdAt: string;
}

export type ActivityType =
  | 'project_upload'
  | 'project_like'
  | 'project_comment'
  | 'project_save'
  | 'user_follow'
  | 'collection_create'
  | 'job_application';

// ============ HIRE PROFILE TYPES ============
export interface HireProfile {
  userId: string;
  user: User;
  availability: 'available' | 'busy' | 'not_available';
  responseTime?: string;
  preferredProjectTypes?: string[];
  minimumBudget?: number;
  typicalTurnaround?: string;
  workProcess?: string;
  faq?: FAQ[];
  testimonials?: Testimonial[];
  servicesOffered?: Service[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientAvatar?: string;
  clientCompany?: string;
  content: string;
  rating: number;
  projectUrl?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice?: number;
  deliveryTime?: string;
}

// ============ SUBSCRIPTION TYPES ============
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  createdAt: string;
}

// ============ CHALLENGE TYPES ============
export interface Challenge {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  category: string;
  prizes: Prize[];
  rules: string;
  startDate: string;
  endDate: string;
  submissionsCount: number;
  status: 'upcoming' | 'active' | 'voting' | 'ended';
  winners?: ChallengeEntry[];
  createdAt: string;
}

export interface Prize {
  place: number;
  description: string;
  value?: number;
}

export interface ChallengeEntry {
  id: string;
  challengeId: string;
  projectId: string;
  project: Project;
  userId: string;
  user: User;
  votesCount: number;
  rank?: number;
  createdAt: string;
}

// ============ SETTINGS TYPES ============
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  emailNotifications: NotificationSettings;
  pushNotifications: NotificationSettings;
  inAppNotifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  newFollowers: boolean;
  comments: boolean;
  likes: boolean;
  messages: boolean;
  jobOpportunities: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

export interface PrivacySettings {
  showEmail: boolean;
  showLocation: boolean;
  profileVisibility: 'public' | 'private';
  activityVisibility: 'everyone' | 'followers' | 'nobody';
  messageRequests: 'everyone' | 'followers' | 'nobody';
  commentPermission: 'everyone' | 'followers' | 'nobody';
}

// ============ API RESPONSE TYPES ============
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SearchResults {
  projects: Project[];
  users: User[];
  jobs: Job[];
  collections: Collection[];
  totalResults: number;
}

// ============ FORM TYPES ============
export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  accountType: 'creator' | 'client';
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ProjectUploadFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  tools: string[];
  visibility: 'public' | 'private' | 'password' | 'unlisted';
  allowComments: boolean;
  allowDownloads: boolean;
  isMature: boolean;
  externalUrl?: string;
}

export interface OnboardingData {
  step1: {
    fullName: string;
    username: string;
    avatar?: File;
    bio: string;
    location: string;
  };
  step2: {
    primaryDiscipline: string;
    skills: string[];
    experienceLevel: string;
    interests: string[];
  };
  step3: {
    projects: ProjectUploadFormData[];
  };
  step4: {
    socialLinks: SocialLink[];
    portfolioUrl?: string;
  };
  step5: {
    emailNotifications: Partial<NotificationSettings>;
    privacy: Partial<PrivacySettings>;
    acceptGuidelines: boolean;
  };
}
