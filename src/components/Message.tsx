import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
      className="flex gap-4 px-4 py-6 animate-slide-up-fade"
    >
      <div className="flex-shrink-0">
        {role === 'user' ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-md">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-muted shadow-sm">
            <Bot className="h-5 w-5 text-secondary-foreground" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {role === 'user' ? (
          <div className="inline-block glass-card px-4 py-3 rounded-2xl max-w-[85%]">
            <p className="text-foreground whitespace-pre-wrap">{content}</p>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  
                  return !inline && match ? (
                    <div className="relative group my-4 rounded-xl overflow-hidden glass-card">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-background/80 z-10"
                        onClick={() => handleCopy(codeString)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <SyntaxHighlighter
                        style={oneLight}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.75rem',
                          background: 'rgba(248, 250, 252, 0.5)',
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="bg-secondary/60 px-1.5 py-0.5 rounded text-sm font-medium" {...props}>
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
