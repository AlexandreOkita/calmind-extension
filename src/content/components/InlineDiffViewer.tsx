import { diffWords } from "diff";

type Props = {
  oldText: string;
  newText: string;
};

export function InlineDiffViewer({ oldText, newText }: Props) {
  const diffs = diffWords(oldText, newText);

  return (
    <p style={{ fontFamily: "monospace", lineHeight: 1.6 }}>
      {diffs.map((part, i) => {
        let style = {};
        if (part.added) style = { backgroundColor: "#d4fcdc" };
        if (part.removed)
          style = {
            backgroundColor: "#ffdce0",
            textDecoration: "line-through",
          };
        return (
          <span key={i} style={style}>
            {part.value}
          </span>
        );
      })}
    </p>
  );
}
