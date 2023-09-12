'use client'

import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from '@mui/material'
import React, { useEffect, useRef, useState } from "react";
import { Roboto } from 'next/font/google'
import { SnackbarProvider } from "notistack";
import useSettings from "@/stores/settings";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";
import { useServerInsertedHTML } from "next/navigation";

const font = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
})

const blackBase = '#27272a';
const blackMain = alpha(blackBase, 0.7);

const whiteBase = '#fff';
const whiteMain = alpha(whiteBase, 0.7);

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // @ts-ignore
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    white: {
      main: whiteMain,
      light: alpha(whiteBase, 0.5),
      dark: alpha(whiteBase, 0.9),
      contrastText: getContrastRatio(whiteMain, '#fff') > 4.5 ? '#fff' : '#111',
    }
  },
  typography: {
    fontFamily: ''
    // fontFamily: font.style.fontFamily
  }
})

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    black: true,
    white: true,
  }

  interface IconButtonPropsColorOverrides {
    black: true,
    white: true,
  }
}

const MuiProvider: React.FC<{
  children: React.ReactNode
  settings: any[]
}> = ({children, settings}) => {

  const willMount = useRef(true)
  const { setSettings } = useSettings()

  useEffect(() => {
    if (!willMount.current) {
      setSettings(settings)
    }
  }, [settings])


  if (willMount.current && settings) {
    setSettings(settings)
    willMount.current = false
  }

  useEffect(() => {
    import("@lottiefiles/lottie-player")
  },[])

  return (
    <ThemeProvider theme={lightTheme}>
      {/* <style global jsx>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style> */}
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        {/* <StyledJsxRegistry>{children}</StyledJsxRegistry> */}
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())
 
  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })
 
  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}

export default MuiProvider