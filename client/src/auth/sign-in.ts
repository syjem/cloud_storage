import { supabase } from '@/supabase';
import type { AuthResponse } from '@supabase/supabase-js';
import { formSchema } from '@/utils/form-schema';

export const supabaseSignIn = async (data: formSchema) => {
  const { data: authData, error }: AuthResponse =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (error) {
    throw error;
  }

  const { user, session } = authData;

  return { user, session };
};
