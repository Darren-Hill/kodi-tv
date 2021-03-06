import React from "react"
import {
  Text,
  TextVariants,
  TextContent,
  TextList,
  TextListItem,
  List,
  ListItem,
  ListVariant,
  Split,
  SplitItem,
  Stack,
  StackItem,
} from "@patternfly/react-core"
import WarningTriangleIcon from "@patternfly/react-icons/dist/js/icons/warning-triangle-icon"
import { graphql } from "gatsby"
import ConditionalSlideshow from "../components/ConditionalSlideshow"
import ConditionalTextListItem from "../components/ConditionalTextListItem"
import ItemWithComma from "../components/ItemWithComma"
import Layout from "../gatsby-theme-patternfly/components/Layout"
import { IAddon } from "../addon"
import MetadataHeader from "src/components/SiteMetadata"

export default function Addon({
  data,
}: {
  data: {
    addon: IAddon
  }
}) {
  const addon = data.addon
  let slides: { source: string }[] = []
  let authorlabel = "Author"
  let categorylabel = "Category"
  if (addon.authors.length > 1) {
    authorlabel = "Authors"
  }
  if (addon.categories.length > 1) {
    categorylabel = "Categories"
  }
  if (addon.screenshots != null) {
    addon.screenshots.forEach((screenshot: { localpath: string }) => {
      slides.push({ source: screenshot.localpath })
    })
  }

  return (
    <Layout>
      <MetadataHeader title={addon.name + ' | Add-On'} />
      <Stack hasGutter>
        <StackItem>
          <Split hasGutter>
            <SplitItem>
              <img width="150" height="150" alt="" src={addon.icon} />
            </SplitItem>
            <SplitItem isFilled>
              <Stack hasGutter>
                <StackItem>
                  <TextContent>
                    <Text component={TextVariants.h1}>{addon.name}</Text>
                    <Text>{addon.summary}</Text>
                  </TextContent>
                </StackItem>
                <StackItem>
                  <List variant={ListVariant.inline}>
                    <ListItem>{addon.version}</ListItem>
                    <ListItem>&bull;</ListItem>
                    <ListItem>Last updated: {addon.lastupdate}</ListItem>
                  </List>
                  <TextContent id="authors">
                    <TextList component="dl">
                      <TextListItem component="dt">{authorlabel}</TextListItem>
                      <TextListItem component="dd">
                        {addon.authors.map(
                          (
                            author: { name: string; slug: string },
                            index: any
                          ) => {
                            return (
                              <ItemWithComma
                                description={author.name}
                                url={"/addons/author/" + author.slug}
                                index={index}
                                length={addon.authors.length - 1}
                                linkType="internal"
                              />
                            )
                          }
                        )}
                      </TextListItem>
                    </TextList>
                  </TextContent>
                </StackItem>
              </Stack>
            </SplitItem>
          </Split>
        </StackItem>
        <StackItem>
          <Split hasGutter>
            <SplitItem>
              <WarningTriangleIcon />
            </SplitItem>
            <SplitItem isFilled>
              To download this Add-On, we highly recommend you do it via the
              user interface in Kodi. Simply look for the "Get More" button in
              the Add-Ons menu. If you want to install it manually, you can
              direct download from the platforms link that matches your platform
              then in Kodi look for the "Install via Zip" option.
            </SplitItem>
          </Split>
        </StackItem>
        <StackItem>
          <TextContent id="info" className="pf-u-py-xl">
            <TextList component="dl">
              <TextListItem component="dt">Description</TextListItem>
              <TextListItem component="dd"><div dangerouslySetInnerHTML={{ __html: addon.description }} /></TextListItem>
              <ConditionalTextListItem
                hide={addon.forum == null}
                title={"Forum"}
                description={addon.forum}
                url={addon.forum}
              />
              <ConditionalTextListItem
                hide={addon.website == null}
                title={"Website"}
                description={addon.website}
                url={addon.website}
              />
              <ConditionalTextListItem
                hide={addon.source == null}
                title={"Source"}
                description={addon.source}
                url={addon.source}
              />
              <TextListItem component="dt">License</TextListItem>
              <TextListItem component="dd">{addon.license}</TextListItem>
              <TextListItem component="dt">Platforms</TextListItem>
              <TextListItem component="dd">
                {addon.platforms.map(
                  (
                    platform: { platform: string; path: string },
                    index: any
                  ) => {
                    return (
                      <ItemWithComma
                        description={platform.platform}
                        url={platform.path}
                        index={index}
                        length={addon.platforms.length - 1}
                        linkType="external"
                      />
                    )
                  }
                )}
              </TextListItem>
              <TextListItem component="dt">Size</TextListItem>
              <TextListItem component="dd">{addon.size}</TextListItem>
              <TextListItem component="dt">{categorylabel}</TextListItem>
              <TextListItem component="dd">
                {addon.categories.map(
                  (category: { name: string; slug: string }, index: any) => {
                    return (
                      <ItemWithComma
                        description={category.name}
                        url={"/addons/category/" + category.slug}
                        index={index}
                        length={addon.categories.length - 1}
                        linkType="internal"
                      />
                    )
                  }
                )}
              </TextListItem>
            </TextList>
          </TextContent>
        </StackItem>
        <StackItem>
          <ConditionalSlideshow slides={slides} />
        </StackItem>
      </Stack>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    addon(slug: { eq: $slug }) {
      addonid
      authors {
        icon
        name
        slug
      }
      banners {
        localpath
      }
      categories {
        icon
        name
        slug
      }
      clearlogos {
        localpath
      }
      description
      disclaimer
      fanarts {
        localpath
        remotepath
      }
      featured
      firstseen(formatString: "MMMM DD, YYYY")
      forum
      icon
      lastupdate(formatString: "MMMM DD, YYYY")
      license
      name
      news
      platforms {
        path
        platform
      }
      screenshots {
        localpath
      }
      size
      source
      summary
      version
      website
    }
  }
`
