// File: components/CodeEditor/CollaborativeEditor.tsx

"use client";
import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";

import { getYjsProviderForRoom } from "@liveblocks/yjs";
// Update the import path to match the new config file
import { useRoom } from "@/liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { CODE_TEMPLATES } from "@/constants/code-editor-data";
// Removed: import { Awareness } from "y-protocols/awareness";
// We will use the type provided by the provider or safely cast.

export default function CollaborativeEditor({
  language = "typescript",
}: {
  language?: string;
}) {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const room = useRoom();
  const yProvider = getYjsProviderForRoom(room);

  const [codeByLang, setCodeByLang] =
    useState<Record<string, string>>(CODE_TEMPLATES);

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let binding: MonacoBinding;

    if (editorRef) {
      const yDoc = yProvider.getYDoc();
      const yText = yDoc.getText("monaco");

      // Attach Yjs to Monaco
      // FIX: Cast yProvider.awareness to 'any' to resolve the type conflict
      // if using different versions of y-protocols/awareness packages.
      binding = new MonacoBinding(
        yText,
        editorRef.getModel() as editor.ITextModel,
        new Set([editorRef]),
        yProvider.awareness as any // Cast to 'any' to force the binding
      );
    }

    return () => {
      binding?.destroy();
    };
    // FIX: Added yProvider to dependencies for correctness.
  }, [editorRef, room, yProvider]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  return (
    <Editor
      onMount={handleOnMount}
      height="89vh" // FIX: Changed from '100vh' to '100%'
      width="100%" // FIX: Changed from '100hw' to '100%'
      theme="vs-dark" // Optional: Dark theme is better for code
      // defaultLanguage="typescript"
      // defaultValue="// Start coding here...(Javascript and TypeScript only)"
      language={language}
      defaultValue={`// Start coding here (${language})`}
      value={codeByLang[language]}
      onChange={(value) =>
        setCodeByLang((prev) => ({ ...prev, [language]: value || "" }))
      }
      options={{
        tabSize: 2,
        minimap: { enabled: false },
      }}
    />
  );
}
