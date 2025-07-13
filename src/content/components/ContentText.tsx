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
    const splitted_open_tag = text.split("<strong>");
    const splitted_close_tag = splitted_open_tag.flatMap((part) =>
      part.split("</strong>")
    );
    return splitted_close_tag.map((part, index) => {
      if (index % 2 === 0) {
        console.log("part", part);
        return (
          <span key={index} className={`whitespace-pre-line`}>
            {part}
          </span>
        );
      } else {
        console.log("bold part", part);
        return (
          <strong
            key={index}
            className={`${
              textStyles.shouldUseBold ? " font-bold" : ""
            } whitespace-pre-line`}
          >
            {part}
          </strong>
        );
      }
    });
  }
  return (
    <p
      style={{
        fontSize: textStyles.style.fontSize,
        letterSpacing: textStyles.style.letterSpacing,
        lineHeight: textStyles.style.lineHeight,
        wordSpacing: textStyles.style.wordSpacing,
        ...textStyles.style,
      }}
    >
      {splitBoldText(text)}
    </p>
  );
}
