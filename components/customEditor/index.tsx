import Editor from "@/ckeditor5/build/ckeditor";
import { useWakeUploader } from "@/hooks/media";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

interface MyCKEditorProps {
  initialData: string;
  setData: (value: string) => void;
}

export default function MyCKEditor(props: MyCKEditorProps): React.ReactElement {
  useWakeUploader();

  return (
    <div className="">
      <div className="prose">
        <CKEditor
          editor={Editor}
          data={props.initialData}
          onChange={(_event, editor) => {
            const data = editor.getData();
            props.setData(data);
          }}
        />
      </div>
    </div>
  );
}
