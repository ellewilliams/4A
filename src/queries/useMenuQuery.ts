import { useStaticQuery, graphql } from "gatsby"

export function useMenuQuery() {
  const data = useStaticQuery(graphql`
    query {
      datoCmsMenu {
        menuItems {
					link
					linkName
					externalLink
					subMenu {
						link
						linkName
						externalLink
					}
				}
      }
    }
  `)

  return data
}
