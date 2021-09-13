import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TocWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin-left: 50px;
  height: calc(100% - 140px);
  width: 250px;
  right: -300px;
  h3 {
      text-align: center;
      margin-top: 0;
  }
  > div {
    position: sticky;
    top: 90px;
    padding: 20px;
    background-color: #fff1;
    font-size: 0.95rem;
  }
  div > ul {
    margin: 0;
  }
  li {
    list-style: none;
  }

  a {
  display: block;
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #0000;
  }

  a:hover {
    border-bottom: 1px solid var(--color-text);
  }
  a.active:hover {
    border-bottom: 1px solid var(--color-high);
  }

  a.active {
    color: var(--color-high);
  }

  @media screen and (max-width: 1616px) {
    display: none;
  }
`

const TableOfContents = ({ tocHtml }) => {
    const toc = useRef();

    const tocScrolllHandler = () => {
        if (toc.current == null) {
            return;
        }
        const currentOffsetY = window.scrollY;
        const HEADER_OFFSET_Y = 50;
        const headerLinks = document.querySelectorAll('.anchor-header');
        let curTocLink = null;

        headerLinks.forEach(headerLink => {
            const { top } = headerLink.getBoundingClientRect();
            const headerTop = top + currentOffsetY;
            const tocLink = toc.current.querySelector(`a[href="${headerLink.hash}"]`);
            if (currentOffsetY > headerTop - HEADER_OFFSET_Y) {
                curTocLink = tocLink;
            }
        });

        toc.current.querySelectorAll('a').forEach(elem => elem.classList.remove("active"));
        curTocLink && curTocLink.classList.add('active');
    }

    useEffect(() => {
        window.addEventListener("scroll", tocScrolllHandler);
        return () => {
            window.removeEventListener("scroll", tocScrolllHandler);
        }
    }, []);

    return (
        <TocWrapper >
            <div>
                <h3>Tabel of Contents</h3>
                <div ref={toc} dangerouslySetInnerHTML={{ __html: tocHtml }} />
            </div>
        </TocWrapper>
    )
}

export default TableOfContents;