import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import TNote from "./types/Note";
import CreateNoteModal from "./components/CreateNoteModal";
import NavBar from "./components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ViewNoteModal from "./components/ViewNoteModal";

function App() {
  const [notes, setNotes] = useState<TNote[]>([
    {
      title: "Test Note",
      content: "This is a test note",
      id: 0,
    },
    {
      title: "Test Note",
      content: "This is a test note",
      id: 1,
    },
    {
      title: "Test Note",
      content: "This is a test note",
      id: 2,
    },
    {
      title: "Test Note",
      content: "This is a test note",
      id: 3,
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<TNote>();
  const [selectedEditNote, setSelectedEditNote] = useState<TNote>();
  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeCheck = () => {
      if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      }
    };
    themeCheck();
    console.log(userTheme);
    console.log(systemTheme);
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-slate-900 h-full min-h-screen">
      <NavBar
        setShowModal={setShowModal}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 w-full mt-14">
        {notes.map((note, id) => (
          <Note
            note={note}
            key={id}
            setNote={setSelectedNote}
            setEditNote={setSelectedEditNote}
            setShowModal={setShowModal}
          />
        ))}
      </div>
      <div
        className={`fixed inset-0 bg-gray-600 dark:bg-gray-950 dark:bg-opacity-50 bg-opacity-50 overflow-y-auto h-full w-full ${
          showModal || selectedNote ? "" : "hidden"
        }`}
        onClick={() => {
          setShowModal(false);
          setSelectedNote(undefined);
        }}
      ></div>
      <CreateNoteModal
        notesLength={notes.length}
        setNotes={setNotes}
        showModal={showModal}
        setShowModal={setShowModal}
        setEditNote={setSelectedEditNote}
        editNote={selectedEditNote}
      />
      {selectedNote && (
        <ViewNoteModal note={selectedNote} setNote={setSelectedNote} />
      )}
    </div>
  );
}

function Note(props: {
  note: TNote;
  setNote: React.Dispatch<SetStateAction<TNote | undefined>>;
  setEditNote: React.Dispatch<SetStateAction<TNote | undefined>>;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  function view() {
    props.setNote(props.note);
  }
  function edit() {
    props.setEditNote(props.note);
    props.setShowModal(true);
  }
  return (
    <div className="bg-sky-100 flex flex-col rounded-sm p-3 gap-1 h-40 min-h-full dark:bg-slate-800 shadow-sm">
      <div className="flex flex-row align-middle justify-between">
        <span
          className="font-medium text-lg text-zinc-700 dark:text-zinc-300 grow cursor-pointer"
          onClick={view}
        >
          {props.note.title}
        </span>
        <div className="flex flex-row align-middle gap-2">
          <button>
            <FontAwesomeIcon
              icon={faEdit}
              className="text-gray-500 dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-500"
              onClick={edit}
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-gray-500 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-700"
            />
          </button>
        </div>
      </div>
      <span
        className="font-regular ml-1 text-md text-zinc-600 dark:text-zinc-400 text-ellipsis overflow-hidden grow cursor-pointer"
        onClick={view}
      >
        {props.note.content}
      </span>
    </div>
  );
}

export default App;
