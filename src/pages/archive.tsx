import * as React from "react"
import Layout from "../components/layout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { Link } from "gatsby"
import { filter } from "lodash"
import { HelmetDatoCms } from "gatsby-source-datocms"
import { useArchiveQuery } from "../queries/useArchiveQuery"
import { GatsbyImage } from "gatsby-plugin-image"
import { ExhibitionsArchive } from "../components/exhibitionsArchive.js"
import { EventsArchive } from "../components/eventsArchive.js"
dayjs.extend(utc)
dayjs.extend(timezone)

enum Status {
  PAST = "PAST",
}

const ArchivePage = () => {
  const { allDatoCmsExhibition, allDatoCmsEvent, datoCmsArchive } =
    useArchiveQuery()
  const exhibitions = allDatoCmsExhibition.nodes
  const events = allDatoCmsEvent.nodes
  const pastExhibitions = filter(exhibitions, ["exhibitionStatus", Status.PAST])
  const pastEvents = filter(events, ["eventStatus", Status.PAST])

  return (
    <Layout theme="white">
      <HelmetDatoCms title="Archive" />
      <div className="container-fluid archive page-top">
        <h2 className="heading-feature text-torch-red mb-8 md:mb-10 lg:mb-12">
          Archive
        </h2>
				<ExhibitionsArchive/>
				<EventsArchive/>
        <section aria-label="Archive disclaimer" className="page-gap page-grid">
          {datoCmsArchive.archiveDisclaimer && (
            <div
              className="body-sans text-block col-span-12 md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2"
              dangerouslySetInnerHTML={{
                __html: datoCmsArchive.archiveDisclaimer,
              }}
            />
          )}
        </section>
      </div>
    </Layout>
  )
}

export default ArchivePage
