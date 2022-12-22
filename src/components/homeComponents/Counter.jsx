import React from "react";
import { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const Counter = (props) => {
  const [focus, setFocus] = useState(false);
  return (
    <>
      <CountUp
        start={focus ? 0 : null}
        end={props.end}
        duration={2}
        redraw={true}
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
            <VisibilitySensor
              onChange={(isVisible) => {
                if (isVisible) {
                  setFocus(true);
                }
              }}
            >
              <span>+</span>
            </VisibilitySensor>
          </div>
        )}
      </CountUp>
    </>
  );
};

export default Counter;
