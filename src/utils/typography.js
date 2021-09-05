import Typography from "typography"
import githubTheme from 'typography-theme-github'
//"-apple-system, Roboto, sans-serif, serif"
githubTheme.headerFontFamily = ['-apple-system', 'Roboto', 'sans-serif', 'serif'];
githubTheme.bodyFontFamily = ['-apple-system', 'Roboto', 'sans-serif', 'serif'];
const typography = new Typography(githubTheme)

// const typography = new Typography({
//     baseFontSize: "18px",
//     baseLineHeight: 1.666,
//     headerFontFamily: [
//         "Avenir Next",
//         "Helvetica Neue",
//         "Segoe UI",
//         "Helvetica",
//         "Arial",
//         "sans-serif",
//     ],
//     bodyFontFamily: ["Georgia", "serif"],
// })

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
    typography.injectStyles()
}

export default typography
