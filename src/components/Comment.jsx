import React, { useEffect, useRef } from 'react';

const Comment = () => {
    const utterance = useRef();

    useEffect(() => {
        if (!utterance.current) return;
        if (utterance.current.childNodes.length > 1) return;
        const script = document.createElement("script");
        const attributes = {
            src: "https://utteranc.es/client.js",
            repo: "tanficial/tanficial.github.io",
            branch: "gh-pages",
            "issue-term": "pathname",
            label: "comment",
            theme: "photon-dark",
            crossorigin: "anonymous",
            acyn: true
        };
        Object.keys(attributes).forEach(key => {
            script.setAttribute(key, attributes[key]);
        })

        utterance.current.appendChild(script);

        return () => {
            script.remove();
        }
    }, []);

    return (
        <div ref={utterance}>
            <h1>Comments</h1>
        </div>
    );
};

export default Comment;