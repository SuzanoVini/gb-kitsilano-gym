# Deployment Checklist

## Pre-Deployment

- [ ] All code committed to Git
- [ ] `.env.local` file NOT committed (check .gitignore)
- [ ] Environment variables documented in `.env.example`
- [ ] All tests passing (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No linting errors (`npm run lint`)

## Vercel Configuration

- [ ] Project imported to Vercel
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Production domain configured
- [ ] Build settings verified (Next.js auto-detected)

## Supabase Configuration

- [ ] Production Supabase project created (or using existing)
- [ ] Site URL updated in Supabase Auth settings
- [ ] Redirect URLs added (including Vercel domain)
- [ ] Row Level Security (RLS) policies enabled on all tables
- [ ] Database migrations applied
- [ ] Required database functions created
- [ ] Database triggers set up

## Post-Deployment

- [ ] Deployment successful (check Vercel dashboard)
- [ ] Site loads at production URL
- [ ] Login functionality works
- [ ] All navigation tabs accessible
- [ ] Data fetching works correctly
- [ ] No console errors in browser
- [ ] Mobile responsive layout verified
- [ ] SSL certificate active (https)

## Performance Checks

- [ ] Lighthouse score > 90 (run in Chrome DevTools)
- [ ] All images optimized
- [ ] No unnecessary console.logs in production
- [ ] Error boundaries working

## Security

- [ ] Environment variables secure (not exposed in client)
- [ ] API routes protected (if any)
- [ ] Authentication working correctly
- [ ] RLS policies tested and working
- [ ] CORS configured correctly in Supabase

## Monitoring

- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking set up (Sentry, etc.) (optional)
- [ ] Set up status page monitoring (optional)

## Custom Domain (Optional)

- [ ] Custom domain purchased
- [ ] DNS records configured
- [ ] Domain added in Vercel
- [ ] SSL certificate issued
- [ ] Site accessible via custom domain
- [ ] Custom domain added to Supabase redirect URLs
