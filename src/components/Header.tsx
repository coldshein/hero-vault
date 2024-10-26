import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-secondary-bg px-3 h-[60px] flex items-center mb-12 justify-between">
      <div className="">
        <NavLink to="/" className="text-accent flex gap-2 items-center">
          <span className="bg-accent p-3 rounded-sm text-white font-semibold">
            HeroVault
          </span>
          <p className="text-accent text-sm md:text-lg border-l-[1px] border-accent px-[5px]">
            Preserve the power of your heroes!
          </p>
        </NavLink>
      </div>
    </header>
  );
};
