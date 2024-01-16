// Paolo Bianchessi, 28/10/2023
// This component provides a rich text editor for creating and editing posts

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import "@/styles/editor.module.css";

type EditorProps = { mode: string };

function Editor({ mode }: EditorProps) {
  let [loaded, setLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    switch (mode) {
      case "edit":
        // editing a post so load data from db
        break;
      default:
        // create a new post so no data
        break;
    }

    setLoaded(true);
  }, [mode]); // run on mounting

  if (!loaded) {
    return <h2> Editor is loading </h2>;
  } else {
    return (
      <div className="editor-container">
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            // do something when editor's content changed
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default Editor;
