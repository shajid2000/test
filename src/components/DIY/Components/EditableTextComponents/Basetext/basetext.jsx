import React, { useEffect, useState } from "react";
import * as MaterialUI from "@material-ui/core";
import ContentEditable from "react-contenteditable";

import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

import TextareaAutosize from "react-textarea-autosize";

const useStyles = MaterialUI.makeStyles((theme) => {
  return {
    text: {
      outline: "none",
      display: "inline-block",
      fontSize: (props) => props.fontSize,
      fontFamily: (props) => props.fontFamily,
      fontWeight: (props) => props.fontWeight,
      fontStyle: (props) => props.fontStyle,
      textDecoration: (props) => props.textDecoration,
      textAlign: (props) => props.textAlign,
      color: (props) => props.color,
      cursor: "text",
      border: "none",
      resize: "none",
      background: "transparent",
    },
  };
});

const BaseText = React.forwardRef((props, ref) => {
  const { textData, className, onClick, edit, headerLanguage } = props;
  const classes = useStyles(textData);
  const [stateTwo, setStateTwo] = useState({
    html: `${textData.text}`,
    editable: true,
  });
  const handleChange = (evt) => {
    setStateTwo({ html: evt.target.value, editable: true });
  };

  useEffect(() => {
    // setStateTwo({ html: textData });
    const handleChange = (evt) => {
      setStateTwo({ html: evt.target.value || textData.text, editable: true });
    };
    // document.addEventListener("click", handleChange);
  }, [textData]);
  // function auto_grow(element) {
  //   element.style.height = "5px";
  //   element.style.height = element.scrollHeight + "px";
  // }
  const zIndex = edit === true ? "100" : "0";
  //console.log("textData0", textData);
  return (
    <ReactTransliterate
      ref={ref}
      id="text-draggable"
      onClick={onClick}
      className={`${textData.id} ${classes.text} ${className || ""}`}
      contentEditable={edit}
      suppressContentEditableWarning={true}
      lang={headerLanguage}
      renderComponent={(props) => (
        <TextareaAutosize
          style={{ zIndex: `${zIndex}`, fontWeight: `${textData.fontWeight}` }}
          {...props}
        />
      )}
      onChange={handleChange}
      // oninput={auto_grow(this)}
      value={stateTwo.html}
    >
      {/* {textData.text} */}
    </ReactTransliterate>

    // <div>
    // <ReactTransliterate
    //   renderComponent={(props) => <textarea className="abc" {...props} />}
    //   value={stateTwo.html}
    //   onChange={handleChange}
    //   lang="hi"
    //   className={`editable`}
    //   tagName="pre"
    //   // html={stateTwo.html} // innerHTML of the editable div
    //   // disabled={!stateTwo.editable} // use true to disable edition
    //   // handle innerHTML change
    //   // onBlur={sanitize}
    //   // innerRef={(elt) => setRaf((innerRef.current = elt))}
    //   ref={ref}
    //   id="text-draggable"
    //   onClick={onClick}
    //   className={`${textData.id} ${classes.text} ${className || ""}`}
    //   contentEditable={edit}
    //   suppressContentEditableWarning={true}
    // />
    //

    // <ContentEditable
    //   className={`editable`}
    //   tagName="pre"
    //   html={stateTwo.html} // innerHTML of the editable div
    //   // disabled={!stateTwo.editable} // use true to disable edition
    //   onChange={handleChange} // handle innerHTML change
    //   // onBlur={sanitize}
    //   // innerRef={(elt) => setRaf((innerRef.current = elt))}
    //   ref={ref}
    //   id="text-draggable"
    //   onClick={onClick}
    //   className={`${textData.id} ${classes.text} ${className || ""}`}
    //   contentEditable={edit}
    //   suppressContentEditableWarning={true}
    // />

    //
    // </div>
  );
});

export default BaseText;
