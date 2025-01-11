import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/supabase';
import { toast } from 'sonner';

export const supabaseSignOut = async () => {
  try {
    await supabase.auth.signOut();
    useAuthStore.getState().clearAuth();
    toast.success('Signed out successfully.');
  } catch (error) {
    toast.error('Failed to log out.');
    console.error('Error during logout:', error);
  }
};
