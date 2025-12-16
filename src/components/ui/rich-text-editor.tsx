'use client';

import React, { useRef, type FC } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
} from 'lucide-react';
import { Button } from './button';
import { Textarea, type TextareaProps } from './textarea';
import { cn } from '@/lib/utils';

interface RichTextEditorProps extends TextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type Tag = 'h1' | 'h2' | 'h3' | 'strong' | 'em' | 'u' | 'blockquote' | 'ul' | 'ol';

const ToolbarButton: FC<{
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
}> = ({ onClick, children, 'aria-label': ariaLabel }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </Button>
);

export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapText = (tag: Tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let wrappedText;

    if (tag === 'ul' || tag === 'ol') {
        const listItems = selectedText.split('\n').map(line => `  <li>${line}</li>`).join('\n');
        wrappedText = `<${tag}>\n${listItems}\n</${tag}>`;
    } else {
        wrappedText = `<${tag}>${selectedText}</${tag}>`;
    }
    
    const newValue =
      value.substring(0, start) + wrappedText + value.substring(end);

    // This is a simplified way to trigger the onChange event
    // In a real app, you'd want to use the event from the props if possible
    const event = {
      target: { ...textarea, value: newValue },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    onChange(event);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 border-input bg-background p-2">
        <ToolbarButton onClick={() => wrapText('h1')} aria-label="Heading 1"><Heading1 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('h2')} aria-label="Heading 2"><Heading2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('h3')} aria-label="Heading 3"><Heading3 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('strong')} aria-label="Bold"><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('em')} aria-label="Italic"><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('u')} aria-label="Underline"><Underline className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('blockquote')} aria-label="Blockquote"><Quote className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('ul')} aria-label="Unordered List"><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('ol')} aria-label="Ordered List"><ListOrdered className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton onClick={() => wrapText('strong')} aria-label="Code"><Code className="h-4 w-4" /></ToolbarButton>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={cn('rounded-t-none focus-visible:ring-0', className)}
        {...props}
      />
    </div>
  );
};
