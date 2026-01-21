# CMS Comparison: Sanity vs Contentful vs Strapi

A detailed comparison of three headless CMS options for integration with Astro and Netlify.

---

## Executive Summary

For a small team (1-2 people) looking for a free option with good Astro and Netlify integration:

- **Best Free Option**: **Strapi** (completely free, self-hosted, unlimited everything)
- **Best Ease of Use**: **Sanity** (generous free tier, excellent Astro integration)
- **Most Restrictive Free Tier**: **Contentful** (very limited, pricing jump to $300/month)

---

## Sanity CMS

### Overview
Sanity is a modern headless CMS with a real-time collaborative editing environment and a powerful query language (GROQ). It offers both cloud-hosted and self-hosted options.

### Pros

#### Pricing & Free Tier
- **Generous free tier** with 20 user seats (more than enough for 1-2 people)
- 10,000 documents included
- 100 GB asset storage
- 100 GB bandwidth per month
- 2 datasets and 2 webhooks
- No credit card required for free tier

#### Astro Integration
- **Official integration** maintained by the Sanity team (`@sanity/astro`)
- Easy installation via `npx astro add @sanity/astro @astrojs/react`
- Can embed Sanity Studio directly in your Astro project
- Excellent support for Portable Text rendering with `astro-portabletext`
- Type-safe content queries
- Comprehensive official documentation and tutorials
- Active community and recent updates (December 2025)

#### Netlify Integration
- **Seamless integration** with pre-built plugins
- Official Sanity Studio Dashboard Widget for triggering Netlify builds
- One-click deploy triggers from within Sanity Studio
- Build status monitoring directly in the CMS
- Easy webhook setup for automatic rebuilds on content changes
- Can self-host Sanity Studio on Netlify

#### Developer Experience
- **GROQ query language** - powerful and intuitive
- Real-time collaborative editing
- Structured content with Portable Text
- Excellent TypeScript support
- Can customize the Studio extensively
- Great documentation and learning resources

### Cons

#### Pricing Concerns
- **Significant jump** if you exceed free tier: $15/seat/month for Growth Plan (minimum would be $30/month for 2 seats)
- Could become expensive as your needs grow
- Need to monitor usage to avoid unexpected costs

#### Learning Curve
- GROQ query language requires learning (different from GraphQL/REST)
- More complex setup than some competitors
- Portable Text can be tricky for beginners
- Studio customization requires React knowledge

#### Technical Limitations
- Requires React for Studio embedding in Astro (adds to bundle size)
- Not as flexible for relational data as traditional databases
- Schema changes can be complex in production

---

## Contentful

### Overview
Contentful is an established enterprise-grade headless CMS with a strong focus on content modeling and multi-platform delivery.

### Pros

#### Astro Integration
- **Good official SDK support** with zero client-side JavaScript
- Contentful.js SDK works well with Astro
- Community package available (`@astropub/contentful`)
- GraphQL API option for advanced queries
- Official Astro starter template (digital bookshelf demo)
- Supports both development (preview API) and production (delivery API) modes
- Comprehensive documentation on Astro's official docs

#### Netlify Integration
- **Official Netlify integration** that auto-configures webhooks
- Automatic webhook creation during setup
- Deploy button built into Contentful authoring interface
- Easy manual webhook setup if preferred
- Customizable triggers (publish, unpublish events)
- Can pass variables to Netlify build scope
- Edit webhook settings directly from Netlify UI

#### Enterprise Features
- Robust content modeling with relationships
- Excellent multi-locale support
- Advanced workflow and permissions (on paid plans)
- Great for scaling to large teams
- Strong API reliability and uptime

#### Ecosystem
- Large marketplace of apps and integrations
- Extensive documentation and learning resources
- Active community support
- Mature platform with proven track record

### Cons

#### Pricing - Major Concern
- **Very restrictive free tier** for production use
- Limited API calls on free plan
- **Massive pricing jump**: Free → $300/month (Basic Plan)
- Annual cost jumps from $0 to $6,000 if you exceed limits
- No mid-tier option for small projects
- Free tier is really only suitable for learning/testing

#### Free Tier Limitations
- Severely limited features compared to competitors
- Low API request limits
- Restricted content types and entries
- Only one "Intro space" license
- Not practical for production sites with regular traffic

#### Developer Experience
- More complex than alternatives for simple use cases
- Can be over-engineered for small projects
- Steeper learning curve for content modeling
- API can feel verbose compared to competitors

#### Risk Factor
- **High lock-in risk**: If your free project grows, you're forced to $300/month
- Not viable for small businesses or side projects that need to stay free
- Makes it difficult to start small and scale gradually

---

## Strapi

### Overview
Strapi is a leading open-source headless CMS built with Node.js, offering complete control through self-hosting or managed cloud options.

### Pros

#### Pricing & Free Tier - Best Option
- **Completely free and open-source** (Community Edition)
- Self-hosted: Unlimited everything (users, content, API calls, storage)
- No hidden costs or usage limits
- Strapi Cloud also offers a free tier for hosting (with limits, but self-hosting is unlimited)
- **Perfect for 1-2 people** with no budget concerns

#### Flexibility & Control
- **Full control** over your data and infrastructure
- Host anywhere: AWS, Azure, Google Cloud, DigitalOcean, or any VPS
- Can modify source code if needed
- No vendor lock-in
- Complete database control (supports PostgreSQL, MySQL, SQLite, MongoDB)

#### Astro Integration
- **Official integration** support with modern tooling
- Community-maintained Strapi Astro Loader (`@sensinum/astro-strapi-loader`)
- Integrates with Astro's Content Layer API
- Type-safe content access
- Support for nested relationships, sorting, and filtering
- Additional package for rich text blocks (`@sensinum/astro-strapi-blocks`)
- Ready-to-use Astro Strapi Starter boilerplate
- Official documentation and tutorials

#### Netlify Integration
- **Strapi Marketplace plugin** for Netlify deployments
- Trigger, monitor, and cancel Netlify builds from Strapi admin panel
- One-click deployment triggers
- Support for multiple Netlify sites
- Monitor build status without leaving Strapi
- Configurable with access tokens and build hooks

#### Developer Experience
- **Intuitive admin panel** - easy for content editors
- RESTful and GraphQL API support out of the box
- Excellent plugin ecosystem
- Role-based access control (RBAC)
- Highly customizable without React expertise
- Great for rapid prototyping

### Cons

#### Self-Hosting Requirements
- **You must manage infrastructure** (server, database, backups, security)
- Requires technical knowledge for deployment and maintenance
- Need to handle server costs (VPS/hosting fees, though can be very cheap)
- Responsible for uptime, updates, and security patches
- Additional DevOps overhead

#### Scalability Concerns
- Performance depends on your hosting infrastructure
- Need to plan for scaling (database, server resources)
- May require more optimization for high-traffic sites
- CDN and caching are your responsibility

#### Cloud Option Limitations
- Strapi Cloud free tier has **lower limits** compared to self-hosted
- Cloud paid plans can get expensive
- Self-hosting is the real "free forever" option

#### Learning Curve
- Initial setup more complex than SaaS options
- Need to understand Node.js deployment
- Database configuration required
- More moving parts to manage (app + database + file storage)

#### Community Support
- Smaller community than Contentful
- Some plugins may not be as mature
- Documentation can be less comprehensive than commercial alternatives
- Troubleshooting may require more research

---

## Side-by-Side Comparison

| Feature | Sanity | Contentful | Strapi |
|---------|--------|------------|--------|
| **Free Tier Users** | 20 seats | Limited | Unlimited (self-hosted) |
| **Free Tier Storage** | 100 GB | Very limited | Unlimited (self-hosted) |
| **Free Tier Documents** | 10,000 | Very limited | Unlimited (self-hosted) |
| **Next Paid Tier** | $15/seat ($30/mo for 2) | $300/month | $0 forever (self-hosted) |
| **Astro Integration** | ⭐⭐⭐⭐⭐ Official | ⭐⭐⭐⭐ Official SDK | ⭐⭐⭐⭐ Community |
| **Netlify Integration** | ⭐⭐⭐⭐⭐ Official | ⭐⭐⭐⭐⭐ Official | ⭐⭐⭐⭐ Plugin |
| **Setup Complexity** | Medium | Low | High (self-hosted) |
| **Maintenance** | Managed | Managed | Self-managed |
| **Vendor Lock-in** | Medium | High | None (open-source) |
| **Best For** | Teams wanting managed service with generous free tier | Enterprise (not free projects) | Developers comfortable with self-hosting |

---

## Recommendations

### For Your Use Case (1-2 people, free tier, Astro + Netlify)

#### 🥇 First Choice: **Strapi**
**Why**: Completely free forever with self-hosting, no limits, full control, and good integrations. Perfect if you're comfortable managing a server (can be very affordable on DigitalOcean, Hostinger VPS, etc.).

**Choose if**: You're comfortable with DevOps, want complete control, and can manage a Node.js application deployment.

---

#### 🥈 Second Choice: **Sanity**
**Why**: Generous free tier that will likely cover your needs indefinitely. Excellent Astro and Netlify integration. Only costs money if you significantly exceed 10K documents or 100GB storage/bandwidth.

**Choose if**: You want a managed solution without infrastructure concerns, and the free tier limits are sufficient.

---

#### 🥉 Third Choice: **Contentful**
**Why**: While it has great integrations, the free tier is too restrictive for real production use, and the $300/month jump makes it unsuitable for small projects.

**Choose if**: You have budget for paid plans, need enterprise features, or are just prototyping/learning.

---

## Implementation Recommendation

**Start with Sanity** for ease of use and managed hosting, **or** go with **Strapi** if you want complete control and zero long-term costs. Avoid Contentful unless you have enterprise needs and budget.

Both Sanity and Strapi offer excellent Astro integration and Netlify deployment options. The choice comes down to: Do you want managed (Sanity) or self-hosted (Strapi)?

---

## Sources

- [Sanity Pricing](https://www.sanity.io/pricing)
- [Contentful Pricing](https://www.contentful.com/pricing/)
- [Strapi Pricing - Cloud](https://strapi.io/pricing-cloud)
- [Strapi Pricing - Self-Hosted](https://strapi.io/pricing-self-hosted)
- [Sanity Astro Integration](https://docs.astro.build/en/guides/cms/sanity/)
- [Contentful Astro Integration](https://docs.astro.build/en/guides/cms/contentful/)
- [Strapi Astro Integration](https://docs.astro.build/en/guides/cms/strapi/)
- [Sanity Netlify Integration](https://www.netlify.com/integrations/sanity/)
- [Contentful Netlify Integration](https://docs.netlify.com/extend/install-and-use/setup-guides/contentful-integration/)
- [Strapi Netlify Plugin](https://market.strapi.io/plugins/strapi-plugin-netlify-deployments)
- [How to use Sanity CMS with Astro - Netlify Developers](https://developers.netlify.com/guides/how-to-use-sanity-cms-with-astro/)
- [Strapi GitHub - Open Source CMS](https://github.com/strapi/strapi)
- [Strapi Free Plan Blog Post](https://strapi.io/blog/introducing-the-free-plan-for-strapi-cloud)
