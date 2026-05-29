import { z } from "zod";

// ============================================================================
// EMAIL & PASSWORD VALIDATION
// ============================================================================

const EmailSchema = z
  .string()
  .email("Invalid email address")
  .min(5)
  .max(255);

const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit");

const UsernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must not exceed 50 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens");

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const UUIDSchema = z.string().uuid();
export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

// ============================================================================
// USER SCHEMAS
// ============================================================================

export const UpdateUserProfileSchema = z.object({
  full_name: z.string().max(255).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
  website_url: z.string().url().optional().nullable(),
  location: z.string().max(255).optional(),
  skills: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
});

export const ChangePasswordSchema = z.object({
  old_password: z.string().min(6),
  new_password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain uppercase, lowercase, and numbers"
  ),
});

// ============================================================================
// PROJECT SCHEMAS
// ============================================================================

export const CreateProjectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(1000),
  long_description: z.string().max(5000).optional(),
  tags: z.array(z.string()).max(10).default([]),
  tools: z.array(z.string()).max(10).default([]),
  category: z.string().max(100).optional(),
  thumbnail_url: z.string().url().optional(),
  media_urls: z.array(z.string().url()).max(20).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  is_case_study: z.boolean().default(false),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const PublishProjectSchema = z.object({
  id: UUIDSchema,
  status: z.enum(["published", "archived"]),
});

// ============================================================================
// COMMENT SCHEMAS
// ============================================================================

export const CreateCommentSchema = z.object({
  project_id: UUIDSchema,
  content: z.string().min(1).max(2000),
  parent_id: UUIDSchema.optional().nullable(),
});

export const UpdateCommentSchema = z.object({
  content: z.string().min(1).max(2000),
});

// ============================================================================
// JOB SCHEMAS
// ============================================================================

export const CreateJobSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(20).max(3000),
  budget_min: z.coerce.number().min(0),
  budget_max: z.coerce.number().min(0),
  budget_type: z.enum(["fixed", "hourly"]),
  required_skills: z.array(z.string()).max(15).default([]),
  category: z.string().max(100),
  deadline: z.string().datetime().optional(),
});

export const UpdateJobSchema = CreateJobSchema.partial();

export const JobStatusSchema = z.object({
  status: z.enum(["open", "in-progress", "completed", "closed"]),
});

// ============================================================================
// JOB APPLICATION SCHEMAS
// ============================================================================

export const CreateJobApplicationSchema = z.object({
  job_id: UUIDSchema,
  cover_letter: z.string().min(10).max(2000).optional(),
  proposed_rate: z.coerce.number().min(0).optional(),
});

export const UpdateApplicationStatusSchema = z.object({
  status: z.enum(["accepted", "rejected"]),
});

// ============================================================================
// MESSAGE SCHEMAS
// ============================================================================

export const SendMessageSchema = z.object({
  recipient_id: UUIDSchema,
  content: z.string().min(1).max(5000),
});

export const MarkMessagesAsReadSchema = z.object({
  conversation_id: UUIDSchema,
});

// ============================================================================
// LIKE/UNLIKE SCHEMAS
// ============================================================================

export const LikeSchema = z.object({
  project_id: UUIDSchema,
  action: z.enum(["like", "unlike"]),
});

// ============================================================================
// FOLLOW SCHEMAS
// ============================================================================

export const FollowUserSchema = z.object({
  user_id: UUIDSchema,
  action: z.enum(["follow", "unfollow"]),
});

// ============================================================================
// COLLECTION SCHEMAS
// ============================================================================

export const CreateCollectionSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().max(500).optional(),
  is_public: z.boolean().default(false),
});

export const UpdateCollectionSchema = CreateCollectionSchema.partial();

export const AddToCollectionSchema = z.object({
  collection_id: UUIDSchema,
  project_id: UUIDSchema.optional(),
  url: z.string().url().optional(),
  title: z.string().max(255).optional(),
});

// ============================================================================
// SEARCH & FILTER SCHEMAS
// ============================================================================

export const SearchProjectsSchema = z.object({
  q: z.string().min(1).max(100),
  category: z.string().optional(),
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  ...PaginationSchema.shape,
});

export const FilterJobsSchema = z.object({
  skill: z.string().optional(),
  budget_type: z.enum(["fixed", "hourly"]).optional(),
  min_budget: z.coerce.number().min(0).optional(),
  max_budget: z.coerce.number().min(0).optional(),
  ...PaginationSchema.shape,
});

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const SignUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: z.string(),
  username: UsernameSchema,
  full_name: z.string().max(255).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Password is required"),
});

export const ResetPasswordSchema = z.object({
  email: EmailSchema,
});

export const ConfirmResetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  new_password: PasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.new_password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ChangePasswordSchema2 = z.object({
  old_password: z.string().min(1, "Current password is required"),
  new_password: PasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.new_password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const VerifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export const RequestVerificationSchema = z.object({
  email: EmailSchema.optional(),
});

// Export types for use in components
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ConfirmResetPasswordInput = z.infer<typeof ConfirmResetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema2>;
export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type SearchProjectsInput = z.infer<typeof SearchProjectsSchema>;

// ============================================================================
// REVIEW SCHEMAS
// ============================================================================

export const CreateReviewSchema = z.object({
  reviewee_id: UUIDSchema,
  rating: z.number().min(1).max(5),
  title: z.string().max(255).optional(),
  content: z.string().max(1000),
});

// ============================================================================
// SAVED ITEMS SCHEMAS
// ============================================================================

export const SaveItemSchema = z.object({
  project_id: UUIDSchema.optional(),
  job_id: UUIDSchema.optional(),
}).refine(
  (data) => {
    const hasOne = Number(!!data.project_id) + Number(!!data.job_id) === 1;
    return hasOne;
  },
  { message: "Must specify either project_id or job_id, but not both" }
);

// ============================================================================
// ORDERS SCHEMAS
// ============================================================================

export const CreateOrderSchema = z.object({
  seller_id: UUIDSchema,
  project_id: UUIDSchema.optional(),
  job_id: UUIDSchema.optional(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1).max(1000),
}).refine(
  (data) => {
    // Either project_id or job_id (or both) must be present
    return data.project_id || data.job_id;
  },
  { message: "Must specify either project_id or job_id" }
);

// ============================================================================
// REPORTS SCHEMAS
// ============================================================================

export const CreateReportSchema = z.object({
  reported_user_id: UUIDSchema.optional(),
  reported_project_id: UUIDSchema.optional(),
  reported_comment_id: UUIDSchema.optional(),
  reason: z.enum(["spam", "harassment", "copyright", "inappropriate", "scam", "other"]),
  description: z.string().min(10).max(1000).optional(),
}).refine(
  (data) => {
    // At least one item must be reported
    return data.reported_user_id || data.reported_project_id || data.reported_comment_id;
  },
  { message: "Must specify at least one of: user_id, project_id, or comment_id to report" }
);

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const LogEventSchema = z.object({
  event_type: z.string(),
  data: z.record(z.string(), z.any()).optional(),
});

export const GetAnalyticsSchema = z.object({
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  event_type: z.string().optional(),
});

// ============================================================================
// SETTINGS SCHEMAS
// ============================================================================

export const NotificationSettingsSchema = z.object({
  email_on_like: z.boolean().default(true),
  email_on_comment: z.boolean().default(true),
  email_on_message: z.boolean().default(true),
  email_on_follow: z.boolean().default(true),
  digest_frequency: z.enum(["never", "daily", "weekly"]).default("weekly"),
});

export const PrivacySettingsSchema = z.object({
  profile_public: z.boolean().default(true),
  allow_messages: z.boolean().default(true),
  show_email: z.boolean().default(false),
});

export const MarkNotificationReadSchema = z.object({
  notification_id: z.string().uuid("Invalid notification ID"),
});

// ============================================================================
// ERROR RESPONSE SCHEMA
// ============================================================================

export const ErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.any()).optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type CreateJob = z.infer<typeof CreateJobSchema>;
export type UpdateJob = z.infer<typeof UpdateJobSchema>;
export type SendMessage = z.infer<typeof SendMessageSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type FollowUser = z.infer<typeof FollowUserSchema>;
export type CreateCollection = z.infer<typeof CreateCollectionSchema>;
export type CreateReview = z.infer<typeof CreateReviewSchema>;
export type SearchProjects = z.infer<typeof SearchProjectsSchema>;
export type FilterJobs = z.infer<typeof FilterJobsSchema>;
export type SaveItem = z.infer<typeof SaveItemSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type CreateReport = z.infer<typeof CreateReportSchema>;
export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>;
export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;
export type MarkNotificationRead = z.infer<typeof MarkNotificationReadSchema>;

