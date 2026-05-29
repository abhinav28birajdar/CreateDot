// ============================================================================
// COMPLETE TYPE DEFINITIONS FOR CREATE DOT APP
// ============================================================================

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  cover_url?: string | null;
  bio: string | null;
  website_url?: string;
  location?: string;
  role: "guest" | "creator" | "client" | "admin";
  verified: boolean;
  skills: string[];
  tools: string[];
  social_links: Record<string, string>;
  followers_count: number;
  following_count: number;
  projects_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  projects_count: number;
  likes_count: number;
  followers: string[];
  following: string[];
  rating?: number;
  review_count?: number;
  response_rate?: number;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  long_description?: string;
  tags: string[];
  tools: string[];
  media_urls: string[];
  thumbnail_url: string | null;
  cover_url?: string | null;
  is_case_study: boolean;
  is_featured: boolean;
  status: "draft" | "published" | "archived";
  category?: string;
  difficulty_level?: "beginner" | "intermediate" | "advanced";
  time_spent_hours?: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  download_count: number;
  price?: number;
  is_sellable: boolean;
  license_type?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
  user?: User;
  liked_by_current_user?: boolean;
}

// ============================================================================
// INTERACTION TYPES
// ============================================================================

export interface Like {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  project_id: string;
  content: string;
  parent_id: string | null;
  mentions: string[];
  likes_count: number;
  replies_count: number;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  replies?: Comment[];
}

export interface Follower {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

// ============================================================================
// COLLECTION TYPES
// ============================================================================

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_private: boolean;
  cover_image_url?: string | null;
  pins_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  items?: CollectionItem[];
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  project_id: string;
  position: number;
  created_at: string;
  project?: Project;
}

// ============================================================================
// JOB TYPES
// ============================================================================

export interface Job {
  id: string;
  user_id: string;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  budget_type: "fixed" | "hourly";
  skills_required: string[];
  tools_required?: string[];
  status: "open" | "in_progress" | "completed" | "closed";
  category?: string;
  deadline?: string;
  attachments?: string[];
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  message?: string;
  portfolio_links?: string[];
  status: "pending" | "accepted" | "rejected" | "completed";
  bid_amount?: number;
  created_at: string;
  updated_at: string;
  user?: User;
  job?: Job;
}

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  content: string;
  is_read: boolean;
  attachments?: string[];
  related_project_id?: string;
  related_job_id?: string;
  created_at: string;
  read_at?: string;
  sender?: User;
  recipient?: User;
}

export interface Conversation {
  id: string;
  user_id_1: string;
  user_id_2: string;
  last_message_at: string;
  unread_count: number;
  user_1?: User;
  user_2?: User;
  last_message?: Message;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  user_id: string;
  actor_id?: string;
  type: "like" | "comment" | "follow" | "mention" | "project_featured" | "message" | "job_application" | "order" | "payment" | "announcement";
  title: string;
  description?: string;
  related_project_id?: string;
  related_job_id?: string;
  related_message_id?: string;
  action_url?: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  actor?: User;
}

// ============================================================================
// REVIEW TYPES
// ============================================================================

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  rating: number;
  title?: string;
  content: string;
  tags?: string[];
  is_verified_transaction: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  reviewer?: User;
}

// ============================================================================
// ORDER/TRANSACTION TYPES
// ============================================================================

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  project_id?: string;
  job_id?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  payment_method?: string;
  stripe_payment_id?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  buyer?: User;
  seller?: User;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface Analytic {
  id: string;
  project_id?: string;
  user_id?: string;
  event_type: "view" | "like" | "comment" | "share" | "download" | "purchase";
  visitor_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at: string;
}

export interface ProjectAnalytics {
  total_views: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_downloads: number;
  views_by_date: Record<string, number>;
  top_referrers: string[];
}

export interface UserAnalytics {
  total_projects: number;
  total_views: number;
  total_followers: number;
  growth_data: Record<string, number>;
  top_projects: Project[];
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

export interface Achievement {
  id: string;
  user_id: string;
  badge_type: string;
  name: string;
  description?: string;
  icon_url?: string;
  earned_at: string;
}

// ============================================================================
// REPORT TYPES
// ============================================================================

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id?: string;
  reported_project_id?: string;
  reported_comment_id?: string;
  reason: "spam" | "harassment" | "copyright" | "inappropriate" | "scam" | "other";
  description: string;
  status: "pending" | "resolved" | "dismissed";
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
  reporter?: User;
}

// ============================================================================
// SAVED/BOOKMARKS TYPES
// ============================================================================

export interface SavedItem {
  id: string;
  user_id: string;
  project_id?: string;
  job_id?: string;
  category: "project" | "job" | "inspiration";
  created_at: string;
  project?: Project;
  job?: Job;
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  target_type?: string;
  target_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
  admin?: User;
}

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface AuthSession {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface FilterOptions {
  sortBy?: "recent" | "popular" | "trending";
  category?: string;
  difficulty?: string;
  priceRange?: [number, number];
  tools?: string[];
  skills?: string[];
}

export interface SearchOptions {
  query: string;
  type?: "project" | "user" | "job";
  filters?: FilterOptions;
  page?: number;
  limit?: number;
}

// ============================================================================
// EMAIL SUBSCRIPTION TYPES
// ============================================================================

export interface EmailSubscription {
  id: string;
  user_id: string;
  newsletter: boolean;
  digest: boolean;
  notifications: boolean;
  promotions: boolean;
  marketing: boolean;
  unsubscribed_at?: string;
  created_at: string;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardStats {
  profile_views: number;
  profile_views_trend: number;
  project_views: number;
  project_views_trend: number;
  total_likes: number;
  total_likes_trend: number;
  followers: number;
  followers_trend: number;
  earnings?: number;
  earnings_trend?: number;
}

// ============================================================================
// UI COMPONENT PROPS TYPES
// ============================================================================

export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  showQuickJump?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validation?: string;
  options?: Array<{ label: string; value: string }>;
}

