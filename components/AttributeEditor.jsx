import React, { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./AttributeEditor.css";

const TOTAL_POINTS = 100;

function AttributeEditor() {
  const [attributes, setAttributes] = useState({
    Strength: 20,
    Dexterity: 20,
    Health: 20,
    Intelligence: 20,
    Charisma: 20,
  });

  const remainingPoints =
    TOTAL_POINTS - Object.values(attributes).reduce((a, b) => a + b, 0);

  const handleSliderChange = (attribute, value) => {
    setAttributes((prev) => {
      const newAttributes = { ...prev, [attribute]: value };
      let totalUsed = Object.values(newAttributes).reduce((a, b) => a + b, 0);

      if (totalUsed > TOTAL_POINTS) {
        let excess = totalUsed - TOTAL_POINTS;
        let attributesToAdjust = Object.keys(newAttributes).filter(
          (key) => key !== attribute
        );

        while (excess > 0) {
          for (let key of attributesToAdjust) {
            if (newAttributes[key] > 0 && excess > 0) {
              newAttributes[key] -= 1;
              excess -= 1;
            }
          }
        }
      }

      window.dispatchEvent(
        new CustomEvent("heroAttributesChange", {
          detail: newAttributes,
          bubbles: true,
          composed: true,
        })
      );

      return newAttributes;
    });
  };

  return (
    <div>
      <div className="total">Total Points Left: {remainingPoints}</div>
      {Object.entries(attributes).map(([attribute, value]) => (
        <div className="attribute" key={attribute}>
          <label htmlFor={attribute}>{attribute}</label>
          <Slider
            value={value}
            min={0}
            max={100}
            onChange={(val) => handleSliderChange(attribute, val)}
          />
        </div>
      ))}
    </div>
  );
}

export default AttributeEditor;
