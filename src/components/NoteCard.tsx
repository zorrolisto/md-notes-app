import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "../utils/api";

type NoteCardProps = {
  note: RouterOutputs["note"]["getAll"][number];
  onDelete: () => void;
};

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-gary-200 card mt-5 border bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="jusitfy-end card-actions mx-2 flex">
          <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
