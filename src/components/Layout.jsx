import * as React from "react"
import styled from "styled-components"

import Header from "./Header"
import Footer from "./Footer"

const StyledLayout = styled.div`
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);

  header {
    float: left;
    z-index: 1;
  }
  
  > div {
    float: right;
    width: calc(100% - 280px);
    min-height: calc(100vh - 100px);
    box-sizing: border-box;
    padding: 30px 50px;
  }

  main {
    max-width: 720px;
    width:100%;
    margin: 0 auto;
  }

  footer {
    clear: both;
    position: relative;
    z-index: 2;
  }

  @media screen and (max-width: 1116px) {
    header {
      clear: both;
    }
    > div {
      clear: both;
      width: 100%;
      margin-top: 60px;
      min-height: calc(100vh - 195px);
      padding: 0 20px;
    }
  }
`

const Layout = ({ children, category }) => {
  return (
    <StyledLayout>
      <Header curCategory={category} />
      <div>
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </StyledLayout>
  )
}

export default Layout