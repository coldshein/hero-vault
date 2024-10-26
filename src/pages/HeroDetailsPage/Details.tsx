import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { getHeroById } from "../../lib/slices/heroSlice";
import classNames from "classnames";

export const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getHeroById(id));
    }
  }, [id, dispatch]);

  const { item, isLoading } = useAppSelector((state) => state.heroList.hero);

  useEffect(() => {
    if (item?.images.length) {
      setMainImage(`http://localhost:4000${item.images[0]}`);
    }
  }, [item]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(`http://localhost:4000${image}`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section className="flex flex-col lg:flex-row w-full">
      <div className="flex flex-col items-center flex-1 mb-8 lg:mb-0">
        <div className="max-w-[500px] mb-4 ">
          {mainImage && (
            <img
              src={mainImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <ul className="flex gap-2 justify-center flex-wrap">
          {item?.images.map((image, index) => (
            <li
              key={image + index}
              className={classNames("h-[100px] w-[100px]", {
                "border-2 border-accent":
                  `http://localhost:4000${image}` === mainImage,
              })}
            >
              <img
                src={`http://localhost:4000${image}`}
                alt=""
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => handleThumbnailClick(image)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-2xl sm:text-4xl mb-5">
          {item?.nickname}
        </h2>
        <p className="text-sm md:text-lg ">
          Real name:{" "}
          <span className="font-semibold text-main-text ">
            {item?.real_name}
          </span>
        </p>
        <div className="flex gap-1 items-center ">
          Super power:{" "}
          <ul className="flex gap-1 text-sm">
            {item?.superpowers.map((superpower) => (
              <li
                key={superpower}
                className="p-1 bg-accent text-white rounded-sm"
              >
                {superpower}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm md:text-lg ">
          Catch phrase:{" "}
          <span className="font-semibold text-main-text ">
            "<i>{item?.catch_phrase}</i>"
          </span>
        </p>
        <p className="text-sm md:text-lg ">
          Description:{" "}
          <span className="font-semibold text-main-text ">
            {item?.origin_description}
          </span>
        </p>
      </div>
    </section>
  );
};
