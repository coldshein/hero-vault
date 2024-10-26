import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "axios";
import classNames from "classnames";
import { setCloseAside } from "../lib/slices/asideSlice";
import { useValidation } from "../hooks/useValidation";
import { createHero } from "../lib/slices/heroSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../utils/hiddenInput";

export const CreateHero = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.aside.isOpen);

  const { values, errors, handleChange, validateAll } = useValidation(
    {
      nickname: "",
      name: "",
      catchPhrase: "",
      description: "",
      superpower: "",
    },
    {
      nickname: { required: true, minLength: 3 },
      name: { required: true, minLength: 3 },
      catchPhrase: { required: true, minLength: 3 },
      description: { required: true },
      superpower: { required: true },
    }
  );

  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/upload",
        formData
      );

      if (data?.urls) {
        setImages((prev) => [...prev, ...data.urls]);
      } else {
        console.warn("No image URLs returned from the server");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const fields = {
      nickname: values.nickname,
      real_name: values.name,
      catch_phrase: values.catchPhrase,
      superpowers: values.superpower.split(","),
      origin_description: values.description,
      images,
    };

    try {
      await dispatch(createHero(fields));
      resetForm();
      dispatch(setCloseAside());
    } catch (error) {
      console.warn("Publication failed!", error);
    }
  };

  const resetForm = () => {
    handleChange("nickname", "");
    handleChange("name", "");
    handleChange("catchPhrase", "");
    handleChange("description", "");
    handleChange("superpower", "");
    setImages([]);
  };

  return (
    <section
      className={classNames(
        "fixed top-0 right-0 h-full w-full md:w-[45%] lg:w-[30%] bg-white-bg px-2 transition-transform ease-in overflow-auto",
        {
          "translate-x-[0%]": isOpen,
          "translate-x-[100%]": !isOpen,
        }
      )}
    >
      <div className="bg-secondary-bg min-h-full px-2 py-4">
        <button
          className="bg-accent p-2 rounded-sm text-white mb-10 mr-auto"
          onClick={() => dispatch(setCloseAside())}
        >
          Close
        </button>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            label="Nickname"
            value={values.nickname}
            error={!!errors.nickname}
            helperText={errors.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
          />
          <TextField
            label="Real name"
            value={values.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Catch phrase"
            value={values.catchPhrase}
            error={!!errors.catchPhrase}
            helperText={errors.catchPhrase}
            onChange={(e) => handleChange("catchPhrase", e.target.value)}
          />
          <TextField
            label="Superpowers"
            value={values.superpower}
            error={!!errors.superpower}
            helperText={errors.superpower}
            onChange={(e) => handleChange("superpower", e.target.value)}
          />
          <TextField
            multiline
            label="Think up a description"
            value={values.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => handleChange("description", e.target.value)}
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

          {images.length > 0 && (
            <div>
              <h3>Uploaded Images:</h3>
              <ul className="flex gap-1 overflow-auto">
                {images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000${imgUrl}`}
                    alt={`Uploaded image ${index}`}
                    className="h-[100px] w-[100px] rounded-sm object-contain"
                  />
                ))}
              </ul>
            </div>
          )}

          <Button type="submit" variant="contained" color="primary">
            Create Hero
          </Button>
        </form>
      </div>
    </section>
  );
};
