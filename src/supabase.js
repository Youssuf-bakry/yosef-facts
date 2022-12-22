import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://baarcbwedjhmqirubnws.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYXJjYndlZGpobXFpcnVibndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5NDU5MjgsImV4cCI6MTk4NjUyMTkyOH0.CEdTdV7pOmFP06uy1gytrTpJ_t5gHl2e8jxi0Vu5AFk";
export const supabase = createClient(supabaseUrl, supabaseKey);
