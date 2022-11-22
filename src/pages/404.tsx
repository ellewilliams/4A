import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <Layout theme="white">
      <div className="container-fluid 404">
        <title>Not found</title>
        <h1 className="heading-1 text-torch-red mb-8">Page not found</h1>
        <p className="body-sans">
          We couldn’t find what you were looking for.
          <br />
          <br />
          <Link to="/" className="underline">
            Go home
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
