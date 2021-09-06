import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"

const StyledCard = styled.article`
    margin-bottom: 20px;
    background-color: var(--color-card);
    border-radius: 8px;
    padding: 10px 30px;
    transition: transform 100ms ease-in-out;
    h2 {
        font-size: 1.5rem;
        color: var(--color-high);
    }
    :hover {
        transform: scale(1.02);
    }

    @media screen and (max-width: 1240px) {
        padding: 10px 10px;
    }
`

const PostCard = ({ slug, frontmatter }) => {
    return (
        <StyledCard>
            <Link to={slug}>
                <div>
                    <h2>{frontmatter.title}</h2>
                    <span>{frontmatter.date}</span>
                    <p>{frontmatter.description}</p>
                </div>
            </Link>
        </StyledCard>
    )
}

const PostList = ({ data, category }) => {
    return (
        <div>
            <h1 style={{ paddingLeft: "16px" }}>{category ? category : "전체 포스팅"}</h1>
            {
                data.map(edge => <PostCard key={edge.node.id} slug={edge.node.fields.slug} frontmatter={edge.node.frontmatter} />)
            }
        </div>
    )
}

export default PostList