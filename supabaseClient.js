// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual Supabase details
const SUPABASE_URL = 'https://dkqytlutanmzpeyjddbp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcXl0bHV0YW5tenBleWpkZGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMDg3MjcsImV4cCI6MjA0Mzg4NDcyN30.bNea9tiIrnb-fAO8oToM-zsg8rU6MMZKmgJ77rApRqY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      redirectTo: 'affairs_daily://login-callback',
    },
  });