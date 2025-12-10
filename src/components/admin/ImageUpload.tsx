"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useCallback } from "react";
import Image from "next/image";
import { Trash, ImagePlus } from "lucide-react";

// ...

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    onRemove,
    disabled
}) => {
    const onUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            onChange((result.info as any).secure_url);
        }
    }, [onChange]);

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-black/20 border border-amber-900/20">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={onRemove}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                disabled={disabled}
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                )}
            </div>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_unsafe"}
                onSuccess={onUpload}
                options={{
                    maxFiles: 1
                }}
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                            className="flex items-center gap-2 bg-amber-900/20 text-amber-500 hover:text-amber-400 hover:bg-amber-900/30 px-4 py-2 rounded-md transition border border-amber-900/30"
                        >
                            <ImagePlus className="w-4 h-4" />
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
