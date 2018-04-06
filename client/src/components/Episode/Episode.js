import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import SideCatalogue from './SideCatalogue'
import { Link } from 'react-router-dom'
import EpisodeDoc from './EpisodeDoc'

export default ({
  videoJsOptions,
  episodeState: { doc, title, courseCatalogue, name },
  courseName,
  episodeName
}) => (
  <div>
    <TopHeader />

    <Container>
      <LeftWrap>
        <CourseName to={`/${courseName}`}>{name}</CourseName>
        {courseCatalogue
          ? courseCatalogue.map((item, i) => (
              <SideCatalogue
                key={i}
                header={item.header}
                section={item.section}
                courseName={courseName}
                episodeName={episodeName}
              />
            ))
          : null}
      </LeftWrap>

      <RightWrap>
        <div>
          <VideoTitle>{title}</VideoTitle>
          <VideoPlayer {...videoJsOptions} />
        </div>

        <EpisodeDoc doc={doc} />
      </RightWrap>
    </Container>

    <Footer />
  </div>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  padding: 0 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const LeftWrap = styled.div`
  margin-bottom: 32px;
  @media (min-width: 768px) {
    width: 230px;
    flex-shrink: 0;
  }
`

const CourseName = styled(Link)`
  font-size: 18px;
  color: #00bcd4;
  text-decoration: none;
`

const RightWrap = styled.div`
  @media (min-width: 768px) {
    margin-left: 32px;
    width: calc(100% - 262px);
  }
`

const VideoTitle = styled.div`
  padding: 8px 16px;
  background-color: #00bcd4;
  color: #ffffff;
  font-size: 14px;
`
