// API service wrapper for Supabase calls
import { createSupabaseClient } from "@/lib/supabase";
import { Project, User, Comment, Like } from "@/types";

const supabase = createSupabaseClient();

// Projects
export const projectsService = {
  async getAll(limit = 12, offset = 0) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as Project[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Project;
  },

  async getByUserId(userId: string, limit = 12) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Project[];
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

  async search(query: string, limit = 12) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .or(
        `title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{"${query}"}`
      )
      .eq("status", "published")
      .limit(limit);

    if (error) throw error;
    return data as Project[];
  },
};

// Users
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
};

// Likes
export const likesService = {
  async like(userId: string, projectId: string) {
    const { error } = await supabase
      .from("likes")
      .insert([{ user_id: userId, project_id: projectId }]);

    if (error) throw error;
  },

  async unlike(userId: string, projectId: string) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", userId)
      .eq("project_id", projectId);

    if (error) throw error;
  },

  async isLiked(userId: string, projectId: string) {
    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", userId)
      .eq("project_id", projectId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  },
};

// Comments
export const commentsService = {
  async getByProjectId(projectId: string, limit = 10) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", projectId)
      .is("parent_id", null)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Comment[];
  },

  async create(comment: Omit<Comment, "id" | "created_at" | "updated_at" | "likes_count" | "replies_count">) {
    const { data, error } = await supabase
      .from("comments")
      .insert([comment])
      .select()
      .single();

    if (error) throw error;
    return data as Comment;
  },

  async delete(id: string) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw error;
  },
};

// Followers
export const followersService = {
  async follow(followerId: string, followingId: string) {
    const { error } = await supabase.from("followers").insert([
      { follower_id: followerId, following_id: followingId },
    ]);

    if (error) throw error;
  },

  async unfollow(followerId: string, followingId: string) {
    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    if (error) throw error;
  },

  async isFollowing(followerId: string, followingId: string) {
    const { data, error } = await supabase
      .from("followers")
      .select("id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data;
  },

  async getFollowers(userId: string) {
    const { data, error } = await supabase
      .from("followers")
      .select("follower_id")
      .eq("following_id", userId);

    if (error) throw error;
    return data?.map((f) => f.follower_id) || [];
  },

  async getFollowing(userId: string) {
    const { data, error } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", userId);

    if (error) throw error;
    return data?.map((f) => f.following_id) || [];
  },
};

