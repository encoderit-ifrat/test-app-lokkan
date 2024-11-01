// import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import React, { useState } from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { Box, Stack, Typography } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'

const VideoCarousel = ({ videoLinks, ratio = '1 / 1' }) => {
  console.log('🟥 ~ VideoCarousel ~ VideoCarousel:', videoLinks)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // const { width } = useWindowDimensions();

  const onVideoEnd = () => {
    // Go to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length)
  }

  return (
    <div
      className="video-carousel-container"
      style={{
        position: 'relative',
      }}
    >
      {videoLinks?.length > 0 && (
        <Box
          // className="nav-icons"
          style={{
            position: 'absolute',
            bottom: '70px',
            right: '20px',
            display: 'flex',
            zIndex: 10,
          }}
        >
          {/* Navigation buttons */}
          <button
            style={{
              background: '#F2F5F6',
              borderRadius: '1111px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() =>
              setCurrentVideoIndex(
                (prevIndex) =>
                  (prevIndex - 1 + videoLinks.length) % videoLinks.length,
              )
            }
          >
            <ArrowBackIosOutlinedIcon
              sx={{
                color: 'grey',
                fontSize: '16px',
              }}
            />
          </button>
          <button
            style={{
              background: '#0362F0',
              borderRadius: '1111px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              cursor: 'pointer',
              border: 'none',
              marginLeft: '10px',
            }}
            onClick={() =>
              setCurrentVideoIndex(
                (prevIndex) => (prevIndex + 1) % videoLinks.length,
              )
            }
          >
            <ArrowForwardIosOutlinedIcon
              sx={{
                color: '#ffffff',
                fontSize: '16px',
              }}
            />
          </button>
        </Box>
      )}

      {/* Embedded YouTube iframe */}
      {videoLinks.length > 0 ? (
        <iframe
          title="YouTube Video"
          style={{
            aspectRatio: ratio,

            width: '100%',
            // height: height,
          }}
          src={`https://www.youtube.com/embed/${videoLinks[currentVideoIndex]}?autoplay=1`}
          frameborder="0"
          allowfullscreen
          onEnd={onVideoEnd}
        ></iframe>
      ) : (
        <Box
          sx={{
            background: '#f1f1f1',
            aspectRatio: ratio,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: ' #7450F0',
              fontWeight: '600',
              fontSize: '20px',
            }}
          >
            Nenhum vídeo encontrado
          </Typography>
        </Box>
      )}
    </div>
  )
}

export default VideoCarousel
