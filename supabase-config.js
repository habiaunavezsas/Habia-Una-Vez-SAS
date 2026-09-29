window.SUPABASE_CONFIG = {
  url: 'https://ippicfdrlnwbiivqmvhv.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcGljZmRybG53YmlpdnFtdmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc0MzksImV4cCI6MjEwNDEwMzQzOX0.pWOj5PmXOrd1fwVp8N6n99VpGqSWxNTt6epYWgKUiac',
  adminEmails: ['Habiaunavezsas17@gmail.com', 'alexgam1029q@gmail.com'],
  redirectUrl: typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '',
  redirectUrls: typeof window !== 'undefined'
    ? [
        `${window.location.origin}${window.location.pathname}`,
        'http://localhost:8000/',
        'http://127.0.0.1:8000/',
        'http://localhost:3000/',
        'http://127.0.0.1:3000/'
      ]
    : []
};