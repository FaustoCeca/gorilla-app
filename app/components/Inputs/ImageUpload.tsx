import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({value, onChange}: ImageUploadProps) => {

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);
  
  return (
    <CldUploadWidget 
      onUpload={handleUpload}
      uploadPreset="gorila-app"
      options={{
        maxFiles: 1,
      }}
    >
      {({open}) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative p-20 border-neutral-300 flex flex-col text-neutral-600 items-center border-dashed border-2 rounded-md cursor-pointer hover:opacity-70"
          > 
            <TbPhotoPlus size={50} />
            <p className="text-lg font-semibold">Click or drag image to this area to upload</p>
            {
              value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={value} alt="uploaded-image" fill style={{ objectFit: 'cover'}} />
                </div>
              )
            }
          </div>
        )
      }}
    </CldUploadWidget>
    )
}

export default ImageUpload;