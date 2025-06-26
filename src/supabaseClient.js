import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://biogorgidbdgfhqgkbxp.supabase.co'; // replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpb2dvcmdpZGJkZ2ZocWdrYnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDQyODAsImV4cCI6MjA2NjMyMDI4MH0.m3FkDDrEWKDr2ICVytcV2lQCDMDAwpwxXZwws89uLts'; // replace this

export const supabase = createClient(supabaseUrl, supabaseKey);
