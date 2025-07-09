// components/MarkdownDisplay.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface Props {
  content: string;
}

const MarkdownDisplay: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none p-4 overflow-y-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;

