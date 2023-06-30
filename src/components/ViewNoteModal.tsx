import { SetStateAction } from "react";
import TNote from "../types/Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ViewNoteModal = (props: {
  note: TNote;
  setNote: React.Dispatch<SetStateAction<TNote | undefined>>;
}) => {
  const close = () => {
    props.setNote(undefined);
  };
  return (
    <div
      className={`absolute top-24 h-fit w-full p-2 md:h-fit left-0 md:left-1/4 md:mx-auto pt-5 md:p-4 md:pt-5 border sm:w-screen md:w-1/2 shadow-md md:shadow-lg rounded-md bg-white dark:bg-slate-900 dark:border-slate-800 ${
        props.note ? "" : "hidden"
      }`}
    >
      <div className="flex flex-row justify-between p-1">
        <span className="text-xl font-medium dark:text-zinc-300">{props.note.title}</span>
        <button onClick={close}>
          <FontAwesomeIcon
            icon={faClose}
            className="font-light text-zinc-500 text-xl h-6 dark:text-zinc-400"
          />
        </button>
      </div>
      <div className="text-lg p-1 dark:text-zinc-400">{props.note.content}</div>
    </div>
  );
};

export default ViewNoteModal;
