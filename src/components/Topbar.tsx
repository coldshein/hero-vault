import { useAppDispatch } from "../hooks";
import { setOpenAside } from "../lib/slices/asideSlice";

export const Topbar = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col justify-between md:items-center mb-4 sm:flex-row">
      <h1 className="text-3xl font-semibold text-main-text mb-3">
        List of SuperHeroes
      </h1>
      <button
        className="p-2 bg-secondary-accent rounded-sm text-white flex items-center gap-2 justify-center"
        onClick={() => dispatch(setOpenAside())}
      >
        Add The Hero
        <img src="/add.svg" alt="" className="w-[25px] h-[25px]" />
      </button>
    </div>
  );
};
