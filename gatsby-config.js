require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_AUTHOR,
  SITE_URL,
  SITE_LANGUAGE,
  SITE_ICON_PATH,
  SITE_BACKGROUND_COLOR,
  SITE_THEME_COLOR,
  GOOGLE_ANALYTICS_ID,
  DATO_TOKEN,
  STRIPE_SECCRET_KEY,
} = process.env

module.exports = {
  flags: {
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  siteMetadata: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    author: SITE_AUTHOR,
    siteUrl: SITE_URL,
    lang: SITE_LANGUAGE,
    icon: SITE_ICON_PATH,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-TD82RSKSJD",
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: ["/preview/**"],
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: SITE_ICON_PATH,
        name: SITE_TITLE,
        short_name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        lang: SITE_LANGUAGE,
        display: "standalone",
        icon: SITE_ICON_PATH,
        start_url: `/`,
        background_color: SITE_BACKGROUND_COLOR,
        theme_color: SITE_THEME_COLOR,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-preload-fonts",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
          options: {
            props: {
              className: "svg",
            },
          },
        },
      },
    },
    "gatsby-plugin-react-axe",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: SITE_URL,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area. Make sure to grant both CDA and CMA permissions.
        apiToken: DATO_TOKEN,

        // The project environment to read from. Defaults to the primary environment:
        environment: `main`,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: true,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        localeFallbacks: {
          it: ["en"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://www.us2.list-manage.com/subscribe/post?u=dce4715ce2b8f617885225776&amp;id=943f51383b", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [
          "Balance",
          "BalanceTransaction",
          "Product",
          "ApplicationFee",
          "Sku",
          "Subscription",
          "Price",
        ],
        secretKey: STRIPE_SECCRET_KEY,
        downloadFiles: false,
      },
    },
    "gatsby-plugin-next-seo",
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
				{
					allDatoCmsCreative(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {ne: "draft"}}}
					) {
						edges {
							node {
								name
								slug
								id
								model {
									name
								}
								profileImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
							}
						}
					}
					allDatoCmsArticle(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {ne: "draft"}}}
					) {
						edges {
							node {
								title
								id
								slug
								featureImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								author {
									... on DatoCmsCreative {
										slug
										name
									}
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsPaper(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {eq: "published"}}}
					) {
						edges {
							node {
								title
								id
								slug
								featureImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								featureColour {
									hex
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsDigitalProject(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {eq: "published"}}}
					) {
						edges {
							node {
								title
								id
								slug
								featureImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								artist {
									... on DatoCmsCreative {
										slug
										name
									}
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsEvent(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {ne: "draft"}}}
					) {
						edges {
							node {
								id
								title
								slug
								formattedTitle
								featureImageVideo {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								artists {
									... on DatoCmsCreative {
										slug
										name
									}
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsExhibition(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {ne: "draft"}}}
					) {
						edges {
							node {
								id
								title
								slug
								formattedTitle
								featureImageVideo {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								artists {
									... on DatoCmsCreative {
										slug
										name
									}
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsEventSeries(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {eq: "published"}}}
					) {
						edges {
							node {
								id
								slug
								formattedTitle
								featureImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								model {
									name
								}
							}
						}
					}
					allDatoCmsSpecialEvent(
						sort: {
							fields: [meta___publishedAt],
							order: DESC
						},
						filter: {meta: {isValid: {eq: true}, status: {eq: "published"}}}
					) {
						edges {
							node {
								id
								slug
								formattedTitle
								featureImage {
									alt
									gatsbyImageData(placeholder: NONE)
								}
								artists {
									... on DatoCmsCreative {
										slug
										name
									}
								}
								model {
									name
								}
							}
						}
					}
				}
			`,

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. This is required.
        normalizer: ({ data }) =>
          [
            ...data.allDatoCmsArticle.edges,
            ...data.allDatoCmsCreative.edges,
            ...data.allDatoCmsDigitalProject.edges,
            ...data.allDatoCmsEvent.edges,
            ...data.allDatoCmsExhibition.edges,
            ...data.allDatoCmsPaper.edges,
            ...data.allDatoCmsSpecialEvent.edges,
            ...data.allDatoCmsEventSeries.edges,
          ].map(({ node }) => ({
            id: node.id,
            title: node.formattedTitle
              ? node.formattedTitle
              : node.name || node.title,
            slug: node.slug,
            type: node.model.name,
            image: node.featureImageVideo
              ? node.featureImageVideo
              : node.profileImage || node.featureImage,
            artist: node.artists ? node.artists : node.artist,
          })),
      },
    },
  ],
}
