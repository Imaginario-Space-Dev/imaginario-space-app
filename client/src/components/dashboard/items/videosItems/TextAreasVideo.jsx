import React from 'react'
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextAreasVideo = ({text, inputId, newPost, editorData, setEditorData, getPost, disable, change, editor, blogIndex}) => {
  return (
    <Wrapper>
    <div className="input-group my-2 border text-black" >
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          {inputId === 'tags' || editor === false ? 
          <textarea className="form-control" id={inputId} value={newPost ? newPost[inputId] : ''} onChange={(e) => getPost(e, blogIndex)} disabled={disable}/> 
          : disable ? <div className="form-control div-desc"  dangerouslySetInnerHTML={{ __html: newPost ? newPost[inputId] : '' }}  disabled={disable}></div> :
          <div className="editorr w-100">
{/* id={inputId} value={newPost ? newPost[inputId] : ''} */}
          <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          toolbar: [
            'undo', 
            'redo', 
            'bold', 
            'italic', 
            'underline', 
            // 'link', 
            'bulletedList', 
            'numberedList', 
            // 'imageUpload', 
            // 'insertTable', 
            'blockQuote', 
            'alignment',
            'specialCharacters',
            'codeBlock'
        ],
      }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data); // Capture the editor data
        }}
        onReady={(editor) => {
          // Editor is ready to use
          // console.log('Editor is ready to use!', editor);
        }}
        onBlur={(event, editor) => {
          // console.log('Editor lost focus');
        }}
        onFocus={(event, editor) => {
          // console.log('Editor is focused');
        }}
      />
      </div>
      }
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{

   .input-group-prepend{
     display: flex;
     flex-direction: column;
     span{
       background-color: transparent !important;
       border: none;
       border-top-right-radius: 0rem;
     }
   }
   textarea{
     width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     height: 5rem;
   }

   .div-desc{
    width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     /* height: 5rem; */
   }
   .editorr{
    .ck-editor__editable {
    color: black; /* Set text color to black */
    background-color: white; /* Set background color to white */
}
   }
 }

 .ck-editor__editable {
    color: black; /* Set text color to black */
    background-color: white; /* Set background color to white */
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default TextAreasVideo

