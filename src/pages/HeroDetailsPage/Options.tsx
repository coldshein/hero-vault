import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setIsEditing } from "../../lib/slices/editingSlice";
import { deleteHero } from "../../lib/slices/heroSlice";

export const Options = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state.heroList.hero);
  const isEditing = useAppSelector((state) => state.editing.isEditing);

  const removeHero = async (id: string) => {
    if (!id) {
      console.warn("No ID provided");
      return;
    }

    try {
      await dispatch(deleteHero(id));
      navigate("/");
    } catch (error) {
      console.error("Error removing hero", error);
    }
  };

  return (
    <div className="flex gap-2 shrink-0 flex-col">
      {isEditing ? (
        <>
          <button
            className="bg-accent text-white p-2 rounded-sm flex items-center gap-2 justify-center"
            onClick={() => removeHero(item?._id!)}
          >
            Remove
            <img src="/remove.svg" alt="" className="h-[25px] w-[25px]" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(setIsEditing())}
            className="bg-secondary-accent text-white p-2 rounded-sm flex items-center justify-center gap-2"
          >
            Edit
            <img src="/edit.svg" alt="" className="h-[25px] w-[25px]" />
          </button>
        </>
      )}
    </div>
  );
};
