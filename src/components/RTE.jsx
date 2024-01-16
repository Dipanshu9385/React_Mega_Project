import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controler } from 'react-hook-form'
export default function RTE({ name, control, label, defaultValues = "" }) {
  return (
    <div className='w-full'>
      {
        label && <label className='inline-block mb-1 pl-1'>{label}</label>
      }
      <Controler
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValues}
            init={{
              initialValue: defaultValues,
              height: 500,
              menubar: true,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}


