# Frontend Performance Optimization

This repository contains examples and guides on how to optimize frontend performance, focusing on Core Web Vitals and key performance metrics.

## Contents

The repository is organized according to key performance metrics:

### First Contentful Paint (FCP)
- [Eliminate render-blocking resources](./first-contentful-paint/eliminate-render-blocking/)
- Optimize Critical CSS
- Lazy-load non-essential images

### Largest Contentful Paint (LCP)
- Optimize images
- Use CDN
- Preload important resources

### Cumulative Layout Shift (CLS)
- Use fixed dimensions for images and videos
- Avoid inserting dynamic content
- Use transform properties for animations

### First Input Delay (FID) / Interaction to Next Paint (INP)
- Break up long JavaScript tasks
- Use Web Workers
- Avoid main-thread blocking

## Why optimize performance?

- Improve user experience
- Increase conversion rates
- Improve SEO and search rankings
- Reduce bounce rates
- Support users with slow connections or limited devices

## Measurement tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome DevTools Performance panel](https://developers.google.com/web/tools/chrome-devtools/performance)
- [Core Web Vitals report](https://support.google.com/webmasters/answer/9205520)

## Contributions

All contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details. 
