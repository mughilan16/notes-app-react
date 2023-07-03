import { SetStateAction } from "react";
import TNote from "../types/Note";

const DeleteNoteModal = (props: {
  note: TNote;
  setNote: React.Dispatch<SetStateAction<TNote[]>>;
  setDeleteNote: React.Dispatch<SetStateAction<TNote | undefined>>;
}) => {
  const close = () => {
    props.setDeleteNote(undefined);
  };
  const deleteNote = () => {
    props.setNote((prev) => prev.filter((i) => i.id !== props?.note.id));
    props.setDeleteNote(undefined);
  };
  return (
    <div className="fixed top-48 h-fit w-full p-2 md:h-fit left-0 md:left-1/3 md:mx-auto pt-5 md:p-4 md:pt-5 border sm:w-screen md:w-1/3 shadow-md md:shadow-lg rounded-md bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="p-1">
        <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400 overflow-hidden overflow-ellipsis">
          Do you want to delete note '{props.note.title}' ?
        </span>
        <div className="flex justify-end gap-3 text-lg font-medium mt-3">
          <button
            className="bg-zinc-100 text-zinc-700 rounded-sm p-2 hover:bg-red-400 hover:text-zinc-200 dark:bg-slate-800 dark:text-zinc-400 dark:hover:bg-red-600 dark:hover:text-zinc-100"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="bg-sky-200 text-zinc-700 rounded-sm p-2 hover:bg-sky-400 hover:text-zinc-200 dark:bg-blue-900 dark:text-zinc-300 dark:hover:bg-blue-700 dark:hover:text-zinc-100"
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
