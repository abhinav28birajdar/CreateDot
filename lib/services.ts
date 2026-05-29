// Complete API Service with all operations
import { createSupabaseClient } from "@/lib/supabase";
import {
  User,
  Project,
  Comment,
  Like,
  Follower,
  Message,
  Notification,
  Job,
  Order,
  Review,
  Collection,
} from "@/types";

const supabase = createSupabaseClient();

// ============================================================================
// PROJECT SERVICES
// ============================================================================

export const projectsService = {
  async getAll(limit = 12, offset = 0, filters?: any) {
    let query = supabase
      .from("projects")
      .select("*, users(*)", { count: "exact" })
      .eq("status", "published");

    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data as Project[], total: count || 0 };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*, users(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Project;
  },

  async create(project: Omit<Project, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
  },

  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as Project[];
  },
};

// ============================================================================
// USER SERVICES
// ============================================================================

export const usersService = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as User;
  },

  async getByUsername(username: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;
    return data as User;
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  async search(query: string, limit = 10) {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, full_name, avatar_url")
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};

// ============================================================================
// COMMENT SERVICES
// ============================================================================

export const commentsService = {
  async create(
    projectId: string,
    userId: string,
    content: string,
    parentId?: string
  ) {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          project_id: projectId,
          user_id: userId,
          content,
          parent_id: parentId || null,
        },
      ])
      .select("*, users(*)")
      .single();

    if (error) throw error;
    return data as Comment;
  },

  async getByProject(projectId: string, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from("comments")
      .select("*, users(*)", { count: "exact" })
      .eq("project_id", projectId)
      .is("parent_id", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: (data || []) as Comment[], count: data?.length || 0 };
  },

  async getReplies(commentId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*, users(*)")
      .eq("parent_id", commentId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return (data || []) as Comment[];
  },

  async delete(id: string) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw error;
  },
};

// ============================================================================
// LIKE SERVICES
// ============================================================================

export const likesService = {
  async toggle(projectId: string, userId: string) {
    const { data: existing } = await supabase
      .from("likes")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      await supabase
        .from("likes")
        .delete()
        .eq("project_id", projectId)
        .eq("user_id", userId);
    } else {
      await supabase
        .from("likes")
        .insert([{ project_id: projectId, user_id: userId }]);
    }
  },

  async isLiked(projectId: string, userId: string) {
    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (error) return false;
    return !!data;
  },

  async getCount(projectId: string) {
    const { count, error } = await supabase
      .from("likes")
      .select("id", { count: "exact", head: true })
      .eq("project_id", projectId);

    if (error) throw error;
    return count || 0;
  },
};

// ============================================================================
// FOLLOWER SERVICES
// ============================================================================

export const followersService = {
  async toggle(followerId: string, followingId: string) {
    const { data: existing } = await supabase
      .from("followers")
      .select("id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .single();

    if (existing) {
      await supabase
        .from("followers")
        .delete()
        .eq("follower_id", followerId)
        .eq("following_id", followingId);
    } else {
      await supabase
        .from("followers")
        .insert([{ follower_id: followerId, following_id: followingId }]);
    }
  },

  async isFollowing(followerId: string, followingId: string) {
    const { data } = await supabase
      .from("followers")
      .select("id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .single();

    return !!data;
  },

  async getFollowers(userId: string, limit = 20, offset = 0) {
    const { data } = await supabase
      .from("followers")
      .select("*, follower:users(id, username, avatar_url)")
      .eq("following_id", userId)
      .range(offset, offset + limit - 1);

    return ((data || []) as any[]).map((f) => f.follower);
  },

  async getFollowing(userId: string, limit = 20, offset = 0) {
    const { data } = await supabase
      .from("followers")
      .select("*, following:users(id, username, avatar_url)")
      .eq("follower_id", userId)
      .range(offset, offset + limit - 1);

    return ((data || []) as any[]).map((f) => f.following);
  },
};

// ============================================================================
// MESSAGE SERVICES
// ============================================================================

export const messagesService = {
  async send(
    senderId: string,
    recipientId: string,
    content: string,
    subject?: string
  ) {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: senderId,
          recipient_id: recipientId,
          content,
          subject: subject || "New message",
          is_read: false,
        },
      ])
      .select("*, sender:users(*), recipient:users(*)")
      .single();

    if (error) throw error;
    return data as Message;
  },

  async getConversation(userId: string, otherUserId: string, limit = 50) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`
      )
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Message[];
  },

  async markAsRead(messageId: string) {
    const { error } = await supabase
      .from("messages")
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    if (error) throw error;
  },
};

// ============================================================================
// NOTIFICATION SERVICES
// ============================================================================

export const notificationsService = {
  async create(notification: Omit<Notification, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("notifications")
      .insert([notification])
      .select()
      .single();

    if (error) throw error;
    return data as Notification;
  },

  async getUnread(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .eq("is_read", false)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Notification[];
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", notificationId);

    if (error) throw error;
  },
};

// ============================================================================
// JOB SERVICES
// ============================================================================

export const jobsService = {
  async create(job: Omit<Job, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("jobs")
      .insert([job])
      .select()
      .single();

    if (error) throw error;
    return data as Job;
  },

  async getAll(limit = 12, offset = 0, filters?: any) {
    let query = supabase
      .from("jobs")
      .select("*, users(*)", { count: "exact" })
      .eq("status", "open");

    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: (data || []) as Job[], total: count || 0 };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, users(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Job;
  },
};

// ============================================================================
// REVIEW SERVICES
// ============================================================================

export const reviewsService = {
  async create(review: Omit<Review, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("reviews")
      .insert([review])
      .select("*, reviewer:users(*)")
      .single();

    if (error) throw error;
    return data as Review;
  },

  async getByUser(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, reviewer:users(*)")
      .eq("reviewed_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Review[];
  },

  async getAverageRating(userId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("reviewed_user_id", userId);

    if (error || !data || data.length === 0) return 0;

    const avg =
      (data as any[]).reduce((sum, r) => sum + r.rating, 0) / data.length;
    return Math.round(avg * 10) / 10;
  },
};

// ============================================================================
// COLLECTION SERVICES
// ============================================================================

export const collectionsService = {
  async create(
    collection: Omit<Collection, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("collections")
      .insert([collection])
      .select()
      .single();

    if (error) throw error;
    return data as Collection;
  },

  async getByUser(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .eq("user_id", userId)
      .limit(limit);

    if (error) throw error;
    return (data || []) as Collection[];
  },

  async addItem(collectionId: string, projectId: string, position: number) {
    const { error } = await supabase
      .from("collection_items")
      .insert([{ collection_id: collectionId, project_id: projectId, position }]);

    if (error) throw error;
  },
};

