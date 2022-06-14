import type { AppProps } from 'next/app'

import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import Layout from '../components/Layout'
import createEmotionCache from '../utils/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'
import '../styles/globals.css'
import { LocalizationProvider } from '@mui/x-date-pickers'

const clientSideEmotionCache = createEmotionCache()

const App = (props: AppProps & any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
