const path = require(`path`)
require('dotenv').config({ path: `.env` });
const flattenMenu = require('@gatsbystorefront/gatsby-theme-storefront-shopify/src/utils/flattenMenu');

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)
/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/

module.exports = {
  plugins: [
    {
      resolve: '@gatsbystorefront/gatsby-theme-storefront-shopify',
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: '/',
        shopifyLite: true,
        enableWebp: false,
      },
    },

        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-ghost`,
            options: {
                apiUrl: process.env.GHOST_API_URL,
                contentApiKey: process.env.GHOST_CONTENT_API_KEY,
            },
        },
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [
                    generateRSSFeed(config),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
    ],
    siteMetadata: {
    siteUrl: 'https://Immodestea.com',
    gatsbyStorefrontConfig: {
      storeName: 'Immodestea',
      storeDescription: 'Tea for the Open Mind',
      email: 'daniel@Immodestea.com',
      company: 'Immodestea',
      location: 'Las Vegas, NV',
      address: '1 Centre St.',
      phone: '(530) 362-8437',
      workingDays: 'Every Day',
      workingHours: '10AM - 10PM',
      socialNetworks: [
        'https://facebook.com/Immodestea',
        'https://instagram.com/Immodestea',
        'https://pinterest.com',
        'https://twitter.com/Immodestea',
        'https://youtube.com/Immodestea',
      ],
      payments: ['visa', 'mastercard', 'amex', 'discover', 'shopify', 'paypal'],
      // For available social share buttons see: https://github.com/nygardk/react-share
      shareButtons: [
        'Facebook',
        'Twitter',
      ],
      googleAnalyticsId: 'UA-141525658-5',
      //
      // carousel, collection, product
      //
      mainPage: [
        {
          type: 'carousel',
          children: [
            {
              name: 'Tea',
              type: 'collection',
              handle: 'tea-1',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Yixing',
              type: 'collection',
              handle: 'yixing',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Local Roast - Osmanthus Wulong',
              type: 'product',
              handle: 'local-roast-osmanthus-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
        {
          name: 'Tea Wares',
          type: 'collection',
          handle: 'teaware',
          textColor: 'white',
          textBgColor: 'rgba(0, 0, 0, 0.3)',
          padding: '1rem',
        },
        {
          name: 'Local Roast',
          type: 'product',
          handle: 'local-roast',
          textColor: 'white',
          textBgColor: 'rgba(0, 0, 0, 0.3)',
          padding: '1rem',
        },
        {
          name: 'Jin Jun Mei',
          type: 'product',
          handle: 'jin-jun-mei',
          textColor: 'white',
          textBgColor: 'rgba(0, 0, 0, 0.3)',
          padding: '1rem',
        },
        {
          name: 'Service',
          type: 'collection',
          handle: 'service',
          textColor: 'white',
          textBgColor: 'rgba(0, 0, 0, 0.3)',
          padding: '1rem',
        },
      ],
      // Menu types: "header", "collection", "product", "link"
      menu: flattenMenu({
        name: 'Menu',
        type: 'top',
        children: [
          {
            name: "Tea",
            type: 'header',
            children: [
              {
                name: 'Green',
                type: 'collection',
                handle: 'Green',
              },
              {
                name: 'Wulong',
                type: 'header',
                children: [
                  {
                    name: 'Light',
                    type: 'collection',
                    link: 'light-wulong',
                  },
                  {
                    name: 'Dark',
                    type: 'collection',
                    link: 'dark-wulong',
                  },
                ],
              },
              {
                name: 'Red',
                type: 'collection',
                handle: 'Red',
              },
              {
                name: 'Fermented',
                type: 'collection',
                handle: 'Fermented',
              },
              {
                name: 'Flavored',
                type: 'collection',
                handle: 'Flavored',
              },
            ],
          },
          {
            name: "Service",
            type: 'header',
            handle: '',
            link: '',
            children: [
              {
                name: 'Festival',
                type: 'product',
                handle: 'festival-tea-service',
              },
              {
                name: 'Small Event',
                type: 'product',
                handle: 'social-tea-tasting',
              },
              {
                name: 'Educational',
                type: 'product',
                handle: 'event-tea-service',
              },
            ],
          },
          { name: 'Blog', type: 'blog', handle: '/' },
        ],
      }),
      footerLinks: [
        {
          name: 'About us',
          link: '/pages/about',
        },
        {
          name: 'Terms of Service',
          link: '/policy/termsOfService',
        },
        {
          name: 'Privacy policy',
          link: '/policy/privacyPolicy',
        },
        {
          name: 'Refunds',
          link: '/policy/refundPolicy',
        },
        {
          name: 'External',
          link: 'https://amazon.com',
        },
      ],
      locales: 'en-US',
      currency: 'USD',
      productsPerCollectionPage: '9',
      articlesPerBlogPage: '6',
    },
  },
};

