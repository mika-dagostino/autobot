// components/MarkdownRenderer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ children }) => {
	return <ReactMarkdown>{children}</ReactMarkdown>;
};

export default MarkdownRenderer;
