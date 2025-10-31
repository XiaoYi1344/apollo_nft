import { Stack } from '@mui/material'
import React from 'react'
import TopSection from './Top/TopSection'
import MarqueeCreators from './carousel/marquee'

const Hero = () => {
  return (
    <Stack>
        <TopSection />
        <MarqueeCreators />
    </Stack>
  )
}

export default Hero