import type { TextNeurodiversityStyles } from "@/model/text_neurodiversity_builder";
import type { ReactElement } from "react";

export function ContentText({
  text,
  textStyles,
}: {
  text: string;
  textStyles: TextNeurodiversityStyles;
}) {
  function splitBoldText(text: string): ReactElement[] {
    const splitted = text.split("*");
    return splitted.map((part, index) => {
      if (index % 2 === 0) {
        console.log("part", part);
        return <span key={index}>{part}</span>;
      } else {
        console.log("bold part", part);
        return (
          <strong
            key={index}
            className={`${textStyles.className}${
              textStyles.shouldUseBold ? " font-bold" : ""
            }`}
          >
            {part}
          </strong>
        );
      }
    });
  }
  return <p className={textStyles?.className}>{splitBoldText(text)}</p>;
}
