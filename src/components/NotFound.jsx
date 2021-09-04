import * as React from "react";
import { Link } from "gatsby";

// styles
const pageStyles = {
    color: "var(--color-text)",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const paragraphStyles = {
    marginBottom: 48,
}
const codeStyles = {
    color: "var(--color-text)",
    padding: 8,
    marginRight: 2,
    backgroundColor: "var(--color-card)",
    fontSize: "1.25rem",
    borderRadius: 4,
}

// markup
const NotFound = () => {
    return (
        <div style={pageStyles}>
            <title>Not found</title>
            <h1 style={headingStyles}>Page not found</h1>
            <p style={paragraphStyles}>
                Sorry{" "}
                <span role="img" aria-label="Pensive emoji">
                    😔
                </span>{" "}
                we couldn’t find what you were looking for.
                <br />
                {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        Try creating a page in <code style={codeStyles}>src/pages/</code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link to="/">Go home</Link>.
            </p>
        </div>
    )
}

export default NotFound
