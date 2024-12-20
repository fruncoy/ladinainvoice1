import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://novyleyibgrjxhxasugc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdnlsZXlpYmdyanhoeGFzdWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NDY4NDksImV4cCI6MjA0OTUyMjg0OX0.qqkxt22GwwezRdJi6vRhLIlFrC3F9f8HlU_XTxGPxzs';

export const supabase = createClient(supabaseUrl, supabaseKey);