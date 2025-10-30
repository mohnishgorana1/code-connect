"use client";
import * as monaco from "monaco-editor";
import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRoom } from "@/liveblocks.config";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { MonacoBinding } from "y-monaco";
import { CODE_TEMPLATES } from "@/constants/code-editor-data";

const CollaborativeEditor = forwardRef(
  ({ language = "typescript" }: { language?: string }, ref) => {
    const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
    const room = useRoom();
    const yProvider = getYjsProviderForRoom(room);
    const [codeByLang, setCodeByLang] =
      useState<Record<string, string>>(CODE_TEMPLATES);

    // Yjs binding
    useEffect(() => {
      let binding: MonacoBinding;
      if (editorRef) {
        const yDoc = yProvider.getYDoc();
        const yText = yDoc.getText("monaco");
        binding = new MonacoBinding(
          yText,
          editorRef.getModel() as editor.ITextModel,
          new Set([editorRef]),
          yProvider.awareness as any
        );
      }
      return () => binding?.destroy();
    }, [editorRef, room, yProvider]);

    const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
      setEditorRef(e);
    }, []);

    // 👇 Expose getValue() to parent
    useImperativeHandle(ref, () => ({
      getValue: () => editorRef?.getValue() || "",
    }));

    return (
      <Editor
        onMount={handleOnMount}
        height="89vh"
        width="100%"
        theme="vs-dark"
        language={language}
        value={codeByLang[language]}
        onChange={(value) =>
          setCodeByLang((prev) => ({ ...prev, [language]: value || "" }))
        }
        options={{
          tabSize: 2,
          minimap: { enabled: true },
        }}
      />
    );
  }
);

CollaborativeEditor.displayName = "CollaborativeEditor";
export default CollaborativeEditor;