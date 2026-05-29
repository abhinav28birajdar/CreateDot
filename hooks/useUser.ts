import { useAuth } from "@/contexts/auth-context";
import { User } from "@/types";

export const useUser = () => {
  const { user, session } = useAuth();

  return {
    user: user as User | null,
    isLoading: session.isLoading,
    isAuthenticated: !!user,
    error: session.error,
  };
};

export default useUser;

