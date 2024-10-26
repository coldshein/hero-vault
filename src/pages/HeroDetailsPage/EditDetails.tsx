import {
  Button,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { setIsNoEditing } from "../../lib/slices/editingSlice";
import { useNavigate } from "react-router-dom";
import { updateHero } from "../../lib/slices/heroSlice";
import { useValidation } from "../../hooks/useValidation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { VisuallyHiddenInput } from "../../utils/hiddenInput";

export const EditDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item } = useAppSelector((state) => state.heroList.hero);
  const existingImages = item?.images || [];

  const initialValues = {
    nickname: item?.nickname || "",
    realName: item?.real_name || "",
    catchPhrase: item?.catch_phrase || "",
    superpowers: item?.superpowers.join(",") || "",
    originDescription: item?.origin_description || "",
  };

  const validationRules = {
    nickname: { required: true, minLength: 3 },
    realName: { required: true, maxLength: 50 },
    catchPhrase: { required: true },
    superpowers: { required: true },
    originDescription: { required: true },
  };

  const { values, errors, handleChange, validateAll } = useValidation(
    initialValues,
    validationRules
  );

  const [deleteImg, setDeleteImg] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

  const toggleDeleteImage = (img: string) => {
    setDeleteImg((prev) =>
      prev.includes(img)
        ? prev.filter((image) => image !== img)
        : [...prev, img]
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        formData.append("images", file);
      } else {
        console.warn("Not an image file:", file.name);
      }
    });

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/upload",
        formData
      );
      if (data?.urls) {
        setNewImages((prev) => [...prev, ...data.urls]);
      } else {
        console.warn("No image URLs returned from the server");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const isDeleting = (img: string) => deleteImg.includes(img);

  const updateHeroDetails = async () => {
    if (!validateAll()) {
      return;
    }
    if (!item?._id) {
      console.error("Hero ID is missing.");
      return;
    }

    try {
      const updatedFields = {
        nickname: values.nickname,
        real_name: values.realName,
        catch_phrase: values.catchPhrase,
        superpowers: values.superpowers.split(","),
        origin_description: values.originDescription,
        images: [
          ...existingImages.filter((img) => !deleteImg.includes(img)),
          ...newImages,
        ],
      };

      await dispatch(updateHero({ id: item._id, updatedFields }));

      dispatch(setIsNoEditing());
      navigate(`/${item._id}`);
    } catch (error) {
      console.error("Failed to update hero:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setIsNoEditing());
    };
  }, [dispatch]);

 

  return (
    <section className="flex flex-col-reverse sm:flex-row gap-5 w-full">
      <div className="overflow-auto sm:w-[50%]">
        <ImageList variant="masonry" cols={3} gap={8}>
          {[...existingImages, ...newImages].map((img) => (
            <ImageListItem key={img} className="relative">
              <button
                className={classNames(
                  "absolute bg-accent text-white rounded-sm p-2",
                  { "bg-secondary-accent": isDeleting(img) }
                )}
                onClick={() => toggleDeleteImage(img)}
              >
                {isDeleting(img) ? "Restore" : "Delete"}
              </button>
              <img
                srcSet={`http://localhost:4000${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`http://localhost:4000${img}?w=248&fit=crop&auto=format`}
                alt={img}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <div className="sm:w-[50%]">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            label="Nickname"
            value={values.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
            error={!!errors.nickname}
            helperText={errors.nickname}
          />
          <TextField
            label="Real name"
            value={values.realName}
            onChange={(e) => handleChange("realName", e.target.value)}
            error={!!errors.realName}
            helperText={errors.realName}
          />
          <TextField
            label="Catch phrase"
            value={values.catchPhrase}
            onChange={(e) => handleChange("catchPhrase", e.target.value)}
            error={!!errors.catchPhrase}
            helperText={errors.catchPhrase}
          />
          <TextField
            label="Superpowers"
            value={values.superpowers}
            onChange={(e) => handleChange("superpowers", e.target.value)}
            error={!!errors.superpowers}
            helperText={errors.superpowers}
          />
          <TextField
            multiline
            label="Think up a description"
            value={values.originDescription}
            onChange={(e) => handleChange("originDescription", e.target.value)}
            error={!!errors.originDescription}
            helperText={errors.originDescription}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="mt-3"
            />
          </Button>
        </form>

        <div className="flex mt-3 gap-2">
          <button
            className="bg-secondary-accent text-white p-2 rounded-sm flex gap-2 text-center"
            onClick={updateHeroDetails}
          >
            Save editing
          </button>
          <button
            className="bg-accent text-white p-2 rounded-sm flex items-center gap-2 justify-center"
            onClick={() => dispatch(setIsNoEditing())}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};
