import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { SignUpInputState } from "@/Schema/userSchema";
import { toast } from "sonner";

// Define API endpoint
const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

// Define Zustand Store Type
interface UserState {
  user: any | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignUpInputState) => Promise<void>;
}

// Create Zustand Store
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API Implementation
      signup: async (input: SignUpInputState) => {
        try {
          set({ loading: true });

          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set(() => ({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            }));
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
