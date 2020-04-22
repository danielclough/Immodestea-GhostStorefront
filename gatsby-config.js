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
      address: '',
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
      mainPage: [

      //
      // Tea Products
      //
        {
          type: 'carousel',
          children: [
            {
              name: 'taiping-houkui-chinese-green',
              type: 'product',
              handle: 'taiping-houkui-chinese-green',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },            
            {
              name: 'sheng-pu-er-green-pu-er',
              type: 'product',
              handle: 'sheng-pu-er-green-pu-er',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'aged-bai-mudan-chinese-white',
              type: 'product',
              handle: 'aged-bai-mudan-chinese-white',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'silver-needles-chinese-white',
              type: 'product',
              handle: 'silver-needles-chinese-white',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'ginseng-wulong-1',
              type: 'product',
              handle: 'ginseng-wulong-1',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'rou-gui',
              type: 'product',
              handle: 'rou-gui',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'milk-wulong',
              type: 'product',
              handle: 'milk-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'local-roast-osmanthus-wulong',
              type: 'product',
              handle: 'local-roast-osmanthus-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'phoenix-wulong-dark-wulong',
              type: 'product',
              handle: 'phoenix-wulong-dark-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'sticky-rice-puer',
              type: 'product',
              handle: 'sticky-rice-puer',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'local-roast',
              type: 'product',
              handle: 'local-roast',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'jin-jun-mei',
              type: 'product',
              handle: 'jin-jun-mei',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'yunnan-red',
              type: 'product',
              handle: 'yunnan-red',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'zheng-shan-xiao-zhong-fujian-china',
              type: 'product',
              handle: 'zheng-shan-xiao-zhong-fujian-china',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'golden-monkey-chinese-red',
              type: 'product',
              handle: 'golden-monkey-chinese-red',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'lapsang-souchong-chinese-red',
              type: 'product',
              handle: 'lapsang-souchong-chinese-red',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'shou-pu-er-black-pu-er',
              type: 'product',
              handle: 'shou-pu-er-black-pu-er',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'nine-day-queen',
              type: 'product',
              handle: 'nine-day-queen',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'original-earl-grey',
              type: 'product',
              handle: 'original-earl-grey',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'jasmine-tea-fuzhou-china',
              type: 'product',
              handle: 'jasmine-tea-fuzhou-china',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
      //
      // Main Collections
      //
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
              name: 'Specials',
              type: 'collection',
              handle: 'specials',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
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
              name: 'Service',
              type: 'collection',
              handle: 'service',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Local Roast',
              type: 'collection',
              handle: 'vegas-roast',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Smoked',
              type: 'collection',
              handle: 'smoked-tea',
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
              name: 'Events',
              type: 'collection',
              handle: 'tickets',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
      //
      // Tea Collections
      //
        {
          type: 'carousel',
          children: [
            {
              name: 'Japanese Green',
              type: 'collection',
              handle: 'japanese-green',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Chinese Green',
              type: 'collection',
              handle: 'chinese-green-tea',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Yellow Tea',
              type: 'collection',
              handle: 'yellow-tea',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'White Tea',
              type: 'collection',
              handle: 'white-tea',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Darjeeling',
              type: 'collection',
              handle: 'Darjeeling',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Light Wulong',
              type: 'collection',
              handle: 'light-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Dark Wulong',
              type: 'collection',
              handle: 'dark-wulong',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Chinese Red',
              type: 'collection',
              handle: 'chinese-red',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Indian Black',
              type: 'collection',
              handle: 'indian-black',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Chinese Black',
              type: 'collection',
              handle: 'chinese-black',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Natural Flavor',
              type: 'collection',
              handle: 'natural-flavor',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
      //
      // Teaware Collections
      //        
      {
          type: 'carousel',
          children: [
            {
              name: 'Tea Pots',
              type: 'collection',
              handle: 'tea-pots',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Tea Cups',
              type: 'collection',
              handle: 'tea-cups',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Chinese Style Wares',
              type: 'collection',
              handle: 'chinese-style-wares',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Japanese Style Wares',
              type: 'collection',
              handle: 'japanese-style-wares',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Euro-American Style Wares',
              type: 'collection',
              handle: 'euro-american-style-wares',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
      //
      // Teaware Products
      //
        {
          type: 'carousel',
          children: [
            
            {
              name: 'spotted-v-cup',
              type: 'product',
              handle: 'spotted-v-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'tea-cup-muddled-v',
              type: 'product',
              handle: 'tea-cup-muddled-v',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'molten-cup',
              type: 'product',
              handle: 'molten-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'fires-eye-cup',
              type: 'product',
              handle: 'fires-eye-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'the-peacocking-cup',
              type: 'product',
              handle: 'the-peacocking-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'simple-stripes-cup',
              type: 'product',
              handle: 'simple-stripes-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'micro-chalice-cup',
              type: 'product',
              handle: 'micro-chalice-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },

            {
              name: 'classic-brown-cup-set',
              type: 'product',
              handle: 'classic-brown-cup-set',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'glass-pot-elegant-arm',
              type: 'product',
              handle: 'glass-pot-elegant-arm',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'master-crafted-clay-pot',
              type: 'product',
              handle: 'master-crafted-clay-pot',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'handmade-clay-pot-gold-pendant',
              type: 'product',
              handle: 'handmade-clay-pot-gold-pendant',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'slender-thorn-handmade-master-clay-pot',
              type: 'product',
              handle: 'slender-thorn-handmade-master-clay-pot',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'glass-teapot',
              type: 'product',
              handle: 'glass-teapot',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'small-glass-pitcher',
              type: 'product',
              handle: 'small-glass-pitcher',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'painted-pastel-cup-set',
              type: 'product',
              handle: 'painted-pastel-cup-set',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'layers-of-earth-cup',
              type: 'product',
              handle: 'layers-of-earth-cup',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
        },
      //
      // Tea Services
      //
        {
          type: 'carousel',
          children: [
            {
              name: 'love-feast',
              type: 'product',
              handle: 'love-feast',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },            
            {
              name: 'social-tea-tasting',
              type: 'product',
              handle: 'social-tea-tasting',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Festival',
              type: 'product',
              handle: 'festival-tea-service',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
            {
              name: 'Wedding',
              type: 'product',
              handle: 'wedding-tea-service',
              textColor: 'white',
              textBgColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
            },
          ],
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

