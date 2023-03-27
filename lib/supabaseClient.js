import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://ghqfuemcoxvazwwohhxh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocWZ1ZW1jb3h2YXp3d29oaHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4MTc2NzgsImV4cCI6MTk5NTM5MzY3OH0.eVcUeZ3-ZwXQsDyHmR1qQqUfLgg-Vz37UsigjgGNmKg')