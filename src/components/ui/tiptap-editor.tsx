'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapUnderline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Textarea } from './textarea';
import { useState, useEffect } from 'react';

const ToolbarButton = ({
  onClick,
  children,
  'aria-label': ariaLabel,
  isActive = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
  isActive?: boolean;
}) => (
  <Button
    type="button"
    variant={isActive ? 'secondary' : 'ghost'}
    size="icon"
    className="h-8 w-8"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </Button>
);

const EditorToolbar = ({ editor, isHtmlMode, onToggleHtmlMode }: { editor: Editor, isHtmlMode: boolean, onToggleHtmlMode: () => void }) => {
  return (
      <div className="flex flex-wrap items-center gap-1 border-b border-input p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          aria-label="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          aria-label="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          aria-label="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          aria-label="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={onToggleHtmlMode} isActive={isHtmlMode} aria-label="Toggle HTML">
          <Code className="h-4 w-4" />
        </ToolbarButton>
      </div>
  );
};

interface TiptapEditorProps {
  content: string;
  onChange: (richText: string) => void;
  disabled?: boolean;
}

export const TiptapEditor = ({ content, onChange, disabled }: TiptapEditorProps) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-5',
          },
        },
      }),
      TiptapUnderline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      if (!isHtmlMode) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base min-h-[250px] w-full bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    editable: !disabled,
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.isDestroyed) return;

    if (content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);
  
  const toggleHtmlMode = () => {
    if(!editor) return;
    if (isHtmlMode) {
      // from html mode to visual mode
      editor.commands.setContent(htmlContent, false);
      onChange(htmlContent);
    } else {
      // from visual mode to html mode
      setHtmlContent(editor.getHTML());
    }
    setIsHtmlMode(!isHtmlMode);
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
    onChange(e.target.value);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-md border border-input bg-transparent ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <EditorToolbar 
          editor={editor}
          isHtmlMode={isHtmlMode}
          onToggleHtmlMode={toggleHtmlMode}
      />
      {isHtmlMode ? (
        <Textarea
          value={htmlContent}
          onChange={handleHtmlChange}
          className="min-h-[250px] resize-y border-0 rounded-t-none focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="HTML Source Editor"
          disabled={disabled}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
};
