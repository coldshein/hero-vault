import { Link } from "react-router-dom";

type PropsType = {
  id: string;
  nickname: string;
  img: string[];
};

export const HeroCard: React.FC<PropsType> = ({ id, nickname, img }) => {
  return (
    <Link to={`/${id}`}>
      <section className="flex w-full flex-col items-center bg-secondary-bg rounded-sm h-[400px]">
        {img ? (
          <div
            className="h-full w-full rounded-sm"
            style={{
              backgroundImage: `url('http://localhost:4000${img[0]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <>no img</>
        )}
        <div className="p-2 flex flex-col items-center">
          <span className="text-sm ">Pseudoname</span>
          <h3 className="font-semibold text-lg text-main-text ">{nickname}</h3>
        </div>
      </section>
    </Link>
  );
};
