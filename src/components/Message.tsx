import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const Message = ({ role, content }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-4 px-4 py-6 ${
        role === 'user' ? 'bg-muted/50' : 'bg-background'
      }`}
    >
      <div className="flex-shrink-0">
        {role === 'user' ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Bot className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {role === 'user' ? (
          <p className="text-foreground whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  
                  return !inline && match ? (
                    <div className="relative group">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(codeString)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
