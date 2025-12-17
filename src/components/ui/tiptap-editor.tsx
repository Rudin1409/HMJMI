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
  Link2,
} from 'lucide-react';
import { mergeAttributes, Node } from '@tiptap/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapUnderline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Textarea } from './textarea';
import { useState, useEffect } from 'react';

const LinkButtonExtension = Node.create({
  name: 'linkButton',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      href: { default: '#' },
      label: { default: 'Button' },
      width: { default: 'w-fit' },
    }
  },

  parseHTML() {
    return [{ tag: 'a[data-type="link-button"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const widthClass = HTMLAttributes.width || 'w-fit';
    return ['a', mergeAttributes(HTMLAttributes, {
      'data-type': 'link-button',
      target: '_blank',
      rel: 'noopener noreferrer',
      class: `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary !text-primary-foreground hover:bg-primary/90 no-underline mx-1 cursor-pointer ${widthClass}`,
    }), HTMLAttributes.label]
  },
});

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

const EditorToolbar = ({ editor, isHtmlMode, onToggleHtmlMode, onAddLinkButton }: { editor: Editor, isHtmlMode: boolean, onToggleHtmlMode: () => void, onAddLinkButton: () => void }) => {
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
      <ToolbarButton onClick={onAddLinkButton} aria-label="Add Button">
        <Link2 className="h-4 w-4" />
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
  const [isLinkButtonDialogOpen, setIsLinkButtonDialogOpen] = useState(false);
  const [linkButtonData, setLinkButtonData] = useState({ label: '', href: '', width: 'w-fit' });

  const insertLinkButton = () => {
    if (editor && linkButtonData.label && linkButtonData.href) {
      editor.chain().focus().insertContent({
        type: 'linkButton',
        attrs: {
          label: linkButtonData.label,
          href: linkButtonData.href,
          width: linkButtonData.width
        }
      }).run();
      setIsLinkButtonDialogOpen(false);
      setLinkButtonData({ label: '', href: '', width: 'w-fit' });
    }
  };

  const editor = useEditor({
    extensions: [
      LinkButtonExtension,
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
    if (!editor) return;
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
        onAddLinkButton={() => setIsLinkButtonDialogOpen(true)}
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
      <Dialog open={isLinkButtonDialogOpen} onOpenChange={setIsLinkButtonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Tombol Tautan</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="btn-label" className="text-right">Label</Label>
              <Input
                id="btn-label"
                value={linkButtonData.label}
                onChange={(e) => setLinkButtonData({ ...linkButtonData, label: e.target.value })}
                className="col-span-3"
                placeholder="Contoh: Baca Selengkapnya"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="btn-href" className="text-right">URL</Label>
              <Input
                id="btn-href"
                value={linkButtonData.href}
                onChange={(e) => setLinkButtonData({ ...linkButtonData, href: e.target.value })}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="btn-width" className="text-right">Ukuran</Label>
              <Select
                value={linkButtonData.width}
                onValueChange={(val) => setLinkButtonData({ ...linkButtonData, width: val })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih ukuran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="w-fit">Otomatis (Sesuai Teks)</SelectItem>
                  <SelectItem value="w-full">Penuh (100%)</SelectItem>
                  <SelectItem value="w-1/2">Setengah (50%)</SelectItem>
                  <SelectItem value="w-1/3">Sepertiga (33%)</SelectItem>
                  <SelectItem value="w-1/4">Seperempat (25%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={insertLinkButton}>Sisipkan Tombol</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
