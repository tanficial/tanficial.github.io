import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { css } from "styled-components";
import { VscMenu, VscChromeClose } from "react-icons/vsc"

const StyledHeader = styled.header`
  padding: 30px 30px;
  text-align: center;
  width: 280px;
  box-sizing: border-box;
  border-right: 1px solid var(--color-card);
  background-color: var(--color-bg);
  position: fixed;
  height: 100vh;

  @media screen and (max-width: 1240px) {
    width: 100%;
    height: fit-content;
    text-align: right;
    padding-bottom: 5px;
    border: none;
  }
`

const Nav = styled.nav`
  height: 0;
  ul {
    padding: 0;
    font-size: 1.3rem;
    border-top: 2px solid var(--color-card);
    transition: opacity 300ms ease-in-out;
    text-align: left;
    padding-left: 30px;
    padding-top: 20px;
  }
  li {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1240px) {
      width: 100%;
      height: fit-content;
      border-bottom: 1px solid var(--color-card);
      ul {
        text-align: right;
        opacity: 0;
        height: 0;
        margin: 0;
        padding: 0;
        border: none;
      }
      li {
        visibility: hidden;
      }
      ${props => props.isMenuOpened && css`
      ul {
        opacity: 1;
        height: fit-content;
      }
      li {
        visibility: visible;
        margin: 10px 0;
      }
    `}
    }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  
  h1 {
    margin: 0;
  }
  @media screen and (max-width: 1240px) {
    display: flex;
    justify-content: center;
  justify-content: space-between;
  }
`

const ButtonsWrapper = styled.div`
  display: none;
  align-items: center;
  color: white;
  @media screen and (max-width: 1240px) {
    display: flex;
    > * {
      cursor: pointer;
    }
  }
`

const Header = ({ curCategory }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark {
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
  const categories = data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter.category)
    .filter((category, index, categories) => categories.indexOf(category) === index);
  return (
    <StyledHeader>
      <HeaderWrapper>
        <h1><Link to="/">Tanficial</Link></h1>
        <ButtonsWrapper>
          {
            isMenuOpened
              ? <VscChromeClose onClick={() => setIsMenuOpened(false)} />
              : <VscMenu onClick={() => setIsMenuOpened(true)} />
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