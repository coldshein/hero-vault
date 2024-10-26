import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { Options } from "./Options";
import { Details } from "./Details";
import { EditDetails } from "./EditDetails";

export const HeroesDetailsPage = () => {
  const navigate = useNavigate();
  const isEditing = useAppSelector((state) => state.editing.isEditing);
  

  return (
    <section className="pb-4">
      <button
        className="bg-accent text-white p-2 rounded-sm mb-5"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <div className="bg-secondary-bg p-3 rounded-sm">
        <div className="flex flex-col items-start lg:flex-row sm:items-start gap-2">
          {isEditing ? <EditDetails /> : <Details />}
          <Options />
        </div>
      </div>
    </section>
  );
};
