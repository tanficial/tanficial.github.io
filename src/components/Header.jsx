import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { css } from "styled-components";
import { VscMenu, VscChromeClose } from "react-icons/vsc"
import Headroom from "headroom.js"

const StyledHeader = styled.header`
  position: fixed;
  box-sizing: border-box;
  width: 280px;
  height: 100vh;
  padding: 30px 30px 0;
  background-color: var(--color-bg);
  border-right: 1px solid var(--color-card);
  text-align: center;

  @media screen and (max-width: 1116px) {
    width: 100%;
    height: fit-content;
    padding: 0;
    border: none;
    text-align: left;
    border-bottom: 1px solid var(--color-card);
    transition: transform 300ms ease-in-out;

    &.headroom--unpinned {
      transform: translateY(-100%);
      nav {
        transform: translateY(-100%)!important;
      }
    }
    &.headroom--pinned {
      transform: translateY(0);
    }
  }
`

const Nav = styled.nav`
  height: 0;
  transition: transform 300ms ease-in-out;
  ul {
    width: fit-content;
    margin: 0 auto;
    padding: 0;
    padding-top: 20px;
    font-size: 1.3rem;
  }
  li {
    list-style: none;
    width: fit-content;
    padding: 0;
  }
  @media screen and (max-width: 1116px) {
      position: absolute;
      width: 100%;
      height: fit-content;
      background-color: var(--color-bg);
      border-bottom: 1px solid var(--color-card);
      transform: translateY(-100%);
      z-index: -1;

      display: flex;
      justify-content: flex-end;
      *{
        z-index: -1;
      }

      ul{
        padding: 10px 20px;
        margin: 0;
      }

      ${props => props.isMenuOpened && css`
        transform: translateY(0);
      `}
    }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  background-color: var(--color-bg);
  border-bottom: 2px solid var(--color-card);
  z-index: 1;
  *{
    z-index: 1;
  }
  h1 {
    margin: 0;
  }
  @media screen and (max-width: 1116px) {
    display: flex;
    justify-content: center;
    justify-content: space-between;
    padding: 10px 20px;
    border: none;
    h1{
      font-size: 1.5rem;
    }
  }
`

const ButtonsWrapper = styled.div`
  display: none;
  align-items: center;
  color: white;
  @media screen and (max-width: 1116px) {
    display: flex;
    > * {
      cursor: pointer;
    }
  }
`

const Header = ({ curCategory }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const refHeader = useRef(null);
  const headroom = useRef(null);
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___category], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
  }
  `)

  useEffect(() => {
    headroom.current = new Headroom(refHeader.current);
    headroom.current.init();
    return () => {
      headroom.current.destroy();
    };
  }, []);

  const categories = data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter.category)
    .filter((category, index, categories) => categories.indexOf(category) === index);
  return (
    <StyledHeader ref={refHeader}>
      <HeaderWrapper>
        <h1><Link to="/">Tanficial</Link></h1>
        <ButtonsWrapper>
          {
            isMenuOpened
              ? <VscChromeClose style={{ fontSize: "22px" }} onClick={() => setIsMenuOpened(false)} />
              : <VscMenu style={{ fontSize: "22px" }} onClick={() => setIsMenuOpened(true)} />
          }
        </ButtonsWrapper>
      </HeaderWrapper>
      <Nav isMenuOpened={isMenuOpened}>
        <ul>
          {
            categories.map(category => {
              return (
                <li key={category} >
                  <Link
                    to={`/${category}`}
                    onClick={() => setIsMenuOpened(false)}
                    style={
                      category === curCategory
                        ? { textDecoration: "underline", color: "var(--color-high)", }
                        : {}
                    }
                  >
                    {category}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </Nav>
    </StyledHeader>

  )
};

export default Header;