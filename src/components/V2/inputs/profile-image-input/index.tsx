import { EditIcon, Image } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";

interface ProfileImageInputProps {
  id: string;
  onChange: (file: File) => void;
  value: File | null;
  error?: FieldError;
}

export const ProfileImageInput = ({
  id,
  onChange,
  value,
  error,
}: ProfileImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      onChange(file);
    }
  };

  const openInputFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (value) {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col items-center">
      <label
        htmlFor={id}
        className={`cursor-pointer border ${error ? "border-destructive" : ""} w-[98px] h-[98px] flex justify-center items-center rounded-[10px] ${preview ? "" : "bg-base300"} relative text-base-content/40 block bg-cover bg-center`}
        style={{ backgroundImage: `url("${preview}")` }}
      >
        {preview ? <></> : <Image />}
        <button
          onClick={openInputFile}
          type="button"
          className={`cursor-pointer bg-background border ${error ? "border-destructive" : ""} absolute right-[-10px] bottom-[-10px] w-[30px] h-[30px] rounded-[5px] flex justify-center items-center`}
        >
          <EditIcon size={16} />
        </button>
      </label>
      <input
        ref={inputRef}
        id={id}
        className="invisible"
        onChange={handleFileInput}
        type="file"
      ></input>
      <p className="text-destructive text-end">{error?.message}</p>
    </div>
  );
};
