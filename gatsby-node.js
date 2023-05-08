const path = require("path")

function getCurrentDate() {
  const d = new Date()
  let month = (d.getMonth() + 1).toString()
  if (month.length < 2) {
    month = `0${month}`
  }
  let day = d.getDate().toString()
  if (day.length < 2) {
    day = `0${day}`
  }
  return `${d.getFullYear()}-${month}-${day}`
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const papers = await graphql(`
    {
      allDatoCmsPaper(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          featureColour {
            hex
          }
        }
      }
    }
  `)
  papers.data.allDatoCmsPaper.nodes.forEach(({ slug, featureColour }) => {
    createPage({
      path: `papers/${slug}`,
      component: path.resolve("./src/templates/paper.tsx"),
      context: {
        slug: slug,
        featureColour: featureColour.hex,
      },
    })
  })
  const articles = await graphql(`
    {
      allDatoCmsArticle(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          darkMode
          featureColour {
            hex
          }
        }
      }
    }
  `)
  articles.data.allDatoCmsArticle.nodes.forEach(
    ({ slug, darkMode, featureColour }) => {
      createPage({
        path: `articles/${slug}`,
        component: path.resolve("./src/templates/article.tsx"),
        context: {
          slug: slug,
          darkMode: darkMode,
          featureColour: featureColour.hex,
        },
      })
    }
  )
  const creatives = await graphql(`
    {
      allDatoCmsCreative(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          name
        }
      }
    }
  `)
  creatives.data.allDatoCmsCreative.nodes.forEach(({ slug, name }) => {
    createPage({
      path: `creatives/${slug}`,
      component: path.resolve("./src/templates/creative.tsx"),
      context: {
        slug: slug,
        name: name,
      },
    })
  })

  const exhibitions = await graphql(`
    {
      allDatoCmsExhibition(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          featureColour {
            hex
          }
          artists {
            name
          }
          curators {
            name
          }
        }
      }
    }
  `)
  exhibitions.data.allDatoCmsExhibition.nodes.forEach(
    ({ slug, featureColour, artists, curators }) => {
      const artistNames = []
      artists.map((artist) => artistNames.push(artist.name))
      const curatorNames = []
      curators.map((curator) => curatorNames.push(curator.name))
      createPage({
        path: `exhibitions/${slug}`,
        component: path.resolve("./src/templates/exhibition.tsx"),
        context: {
          slug: slug,
          featureColour: featureColour.hex,
          artistNames: artistNames,
          curatorNames: curatorNames,
          currentDate: getCurrentDate(),
        },
      })
    }
  )

  const events = await graphql(`
    {
      allDatoCmsEvent(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          featureColour {
            hex
          }
        }
      }
    }
  `)
  events.data.allDatoCmsEvent.nodes.forEach(({ slug, featureColour }) => {
    createPage({
      path: `events/${slug}`,
      component: path.resolve("./src/templates/event.tsx"),
      context: {
        slug: slug,
        featureColour: featureColour.hex,
        currentDate: getCurrentDate(),
      },
    })
  })

  const digitalProjects = await graphql(`
    {
      allDatoCmsDigitalProject(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          featureColour {
            hex
          }
          darkMode
        }
      }
    }
  `)
  digitalProjects.data.allDatoCmsDigitalProject.nodes.forEach(
    ({ slug, featureColour, darkMode }) => {
      createPage({
        path: `digital/${slug}`,
        component: path.resolve("./src/templates/digital.tsx"),
        context: {
          slug: slug,
          featureColour: featureColour.hex,
          darkMode: darkMode,
        },
      })
    }
  )

  const eventSeries = await graphql(`
    {
      allDatoCmsEventSeries(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          textColour {
            hex
          }
          backgroundColour {
            hex
          }
        }
      }
    }
  `)
  eventSeries.data.allDatoCmsEventSeries.nodes.forEach(
    ({ slug, textColour, backgroundColour }) => {
      createPage({
        path: `${slug}`,
        component: path.resolve("./src/templates/event-series.tsx"),
        context: {
          slug: slug,
          textColour: textColour.hex,
          backgroundColour: backgroundColour.hex,
          currentDate: getCurrentDate(),
        },
      })
    }
  )

  const SpecialEvent = await graphql(`
    {
      allDatoCmsSpecialEvent(
        filter: { meta: { isValid: { eq: true }, status: { ne: "draft" } } }
      ) {
        nodes {
          slug
          textColour {
            hex
          }
          backgroundColour {
            hex
          }
        }
      }
    }
  `)
  SpecialEvent.data.allDatoCmsSpecialEvent.nodes.forEach(
    ({ slug, textColour, backgroundColour }) => {
      createPage({
        path: `events/${slug}`,
        component: path.resolve("./src/templates/special-event.tsx"),
        context: {
          slug: slug,
          textColour: textColour.hex,
          backgroundColour: backgroundColour.hex,
        },
      })
    }
  )
}
