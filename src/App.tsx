import { SetStateAction, useState } from "react";
import "./App.css";
import { Resolver, useForm } from "react-hook-form";

type TNote = {
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<TNote[]>([
    {
      title: "Test Note",
      content: "This is a test note",
    },
    {
      title: "Test Note",
      content: "This is a test note",
    },
    {
      title: "Test Note",
      content: "This is a test note",
    },
    {
      title: "Test Note",
      content: "This is a test note",
    },
  ]);
  return (
    <div className="flex flex-col">
      <NoteForm setNotes={setNotes} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 w-full">
        {notes.map((note, id) => (
          <Note note={note} key={id} />
        ))}
      </div>
    </div>
  );
}

const resolver: Resolver<TNote> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "This is required",
          },
        }
      : {},
  };
};

function NoteForm(props: {
  setNotes: React.Dispatch<SetStateAction<TNote[]>>;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TNote>({ resolver });
  const onSubmit = (data: TNote) => {
    props.setNotes((prev) => [...prev, data]);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-teal-50"
          {...register("title")}
          placeholder="title"
        />
        {errors.title && <span>{errors.title.message}</span>}
        <textarea {...register("content")} placeholder="This is my note." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function Note(props: { note: TNote }) {
  return (
    <div className="bg-sky-100 flex flex-col">
      <span className="">{props.note.title}</span>
      <span>{props.note.content}</span>
    </div>
  );
}

export default App;
