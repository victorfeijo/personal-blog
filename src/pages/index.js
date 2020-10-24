import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Card from '../components/card';

import './home.css';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {/* <Bio /> */}
      <div className="container">
        <div className="row mt-4">
          {posts.map((post) => {
            const title = post.frontmatter.title || post.fields.slug;
            const featuredImage = post.frontmatter.featuredImage?.childImageSharp?.fluid;

            return (
              <div className="col-12 col-md-6 col-lg-4" key={post.fields.slug}>
                <Link to={post.fields.slug} itemProp="url">
                  <Card>
                    {featuredImage && <Card.Image image={featuredImage} />}
                    <Card.Body>
                      <article
                        itemScope
                        itemType="http://schema.org/Article"
                      >
                        <header>
                          <h2>
                            <span itemProp="headline">{title}</span>
                          </h2>
                        </header>
                        <section>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.frontmatter.description || post.excerpt,
                            }}
                            itemProp="description"
                          />
                        </section>
                        <div className="row justify-content-end">
                          <div className="col-auto">
                            <small>{post.frontmatter.date}</small>
                          </div>
                        </div>
                      </article>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
