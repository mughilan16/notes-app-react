import { SetStateAction } from "react";

function NavBar(props: {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setDarkMode: React.Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
}) {
  const clickHandler = () => {
    props.setShowModal(true);
  };
  const switchTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      props.setDarkMode(false);
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    props.setDarkMode(true);
  };

  return (
    <div className="flex flex-row items-center align-middle justify-between pl-2 md:pl-4 bg-zinc-100 fixed top-0 left-0 right-0 dark:bg-slate-900 dark:text-zinc-300 border-b dark:border-slate-800">
      <div className="flex flex-row items-center align-middle p-2  gap-2">
        <img
          src={props.darkMode ? "/logo-dark.png" : "/logo.png"}
          className="w-9"
        />
        <span className="font-medium text-lg text-zinc-700 dark:text-zinc-300">
          Notes App
        </span>
      </div>
      <div className="flex flex-row align-middle">
        <button
          className="h-14 w-14 p-2 flex align-middle items-center"
          onClick={switchTheme}
        >
          <img
            src={props.darkMode ? "/moon.png" : "/sun.png"}
            className={props.darkMode ? "h-8 ml-1" : "h-10"}
          />
        </button>
        <button
          className="bg-sky-200 p-4 text-lg font-medium hover:bg-sky-300 hover:text-zinc-600 text-zinc-700 dark:bg-sky-950 dark:text-zinc-300"
          id="model-open-btn"
          onClick={clickHandler}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}

export default NavBar;
