import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import Layout from "./layout"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import Box from "@sweatpants/box"
import LiveCode from "./liveCode"
import ExternalLink from "./ExternalLink"

function Container({ as, children, ...rest }) {
  return (
    <Box as={as} margin="0 auto" maxWidth="680px" mb="500" {...rest}>
      {children}
    </Box>
  )
}

function Image(props) {
  const { caption, src, alt } = props
  return (
    <Box as="figure" width="100%" maxWidth="1100px" mx="auto" my="700">
      <Box borderRadius="7px" overflow="hidden">
        <Box as="img" display="block" width="100%" src={src} alt={alt} m="0" />
      </Box>

      <Box
        as="figcaption"
        fontSize="100"
        color="gray.700"
        mt="200"
        textAlign="center"
      >
        {caption}
      </Box>
    </Box>
  )
}

const components = {
  LiveCode,
  Box,
  ExternalLink,
  Image,
  p: (props) => <Container as="p" {...props} />,
  ul: (props) => <Container as="ul" {...props} />,
  li: (props) => <Box as="li" {...props} mb="200" />,
  h1: (props) => <Container as="h1" {...props} pt="400" />,
  h2: (props) => <Container as="h2" {...props} pt="400" />,
  h3: (props) => <Container as="h3" {...props} pt="400" />,
  h4: (props) => <Container as="h4" {...props} pt="400" />,
  h5: (props) => <Container as="h5" {...props} pt="400" />,
  h6: (props) => <Container as="h6" {...props} pt="400" />,
}

const SerifWrapper = styled.article`
  ${({ serifs }) =>
    serifs
      ? `
        p, li {
          font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        }
      `
      : ""}
`

function BlogPostLayout({ pageContext }) {
  const { title, date, body, serifs } = pageContext

  return (
    <Layout variant="center">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box margin="0 auto" maxWidth="680px">
        <Box mb="800">
          <Link to="/">← Back</Link>
        </Box>
      </Box>
      <SerifWrapper serifs={serifs}>
        <Box margin="0 auto" maxWidth="680px">
          <Box as="header" mb="800">
            <Box as="h1" mb="0">
              {title}
            </Box>
            <Box as="time" fontStyle="italic" fontSize="100" lineHeight="1em">
              {date}
            </Box>
          </Box>
        </Box>
        <Box mb="900">
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </Box>
      </SerifWrapper>
    </Layout>
  )
}

export default BlogPostLayout
