import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import AcceptedFilesPreviewer from '@/pages/images/accepted-files-preview';
import { UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { fetcher, getApiUrl } from '@/pages/images/upload-file';
import { useLocation } from 'react-router-dom';
import useImages from '@/hooks/use-mutate';

type FileUploaderType = {
  onCloseDialog: () => void;
};

export const FileUploader = ({ onCloseDialog }: FileUploaderType) => {
  const location = useLocation();
  const url = getApiUrl(location.pathname);
  const { mutate } = useImages(url);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (newFiles: File[]) => {
    const filteredFiles = newFiles.filter((newFile) => {
      return !files.some((file) => file.name === newFile.name);
    });

    if (filteredFiles.length > 0) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...newFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    let toastId = null;

    try {
      toastId = toast.loading(`Uploading ${filteredFiles.length} file(s).`);

      const formData = new FormData();
      filteredFiles.forEach((file) => formData.append('files', file));

      await fetcher(url, formData);

      if (toastId) toast.dismiss(toastId);
      toast.success(`${filteredFiles.length} file(s) uploaded successfully.`);

      filteredFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

      setFiles([]);
      onCloseDialog();
      mutate();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload files. Please try again.');
    } finally {
      if (toastId) toast.dismiss(toastId);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const acceptedFiles: File[] = [];

    selectedFiles.forEach((file) => {
      if (
        ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) &&
        file.size <= 4 * 1024 * 1024
      ) {
        acceptedFiles.push(file);
      }
    });

    if (acceptedFiles.length > 0) handleFileChange(acceptedFiles);

    e.target.value = '';
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    maxSize: 4 * 1024 * 1024,
    maxFiles: 5,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    onDrop: handleFileChange,
  });

  return (
    <React.Fragment>
      <div
        {...getRootProps({
          className: 'border border-dashed border-sky-500 h-56',
        })}>
        <motion.div
          onClick={() => fileInputRef.current?.click()}
          whileHover="animate"
          className="p-4 group/file block rounded-lg cursor-pointer w-full h-full relative overflow-hidden">
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            className="hidden"
            onChange={onChangeHandler}
            multiple
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <UploadIcon className="size-14 shrink-0 border border-dashed border-sky-500 p-4 rounded-full z-50" />
            {isDragActive ? (
              <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                Drag file here ...
              </p>
            ) : (
              <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                Drag 'n' drop your files here or click to upload
              </p>
            )}
          </div>
        </motion.div>
      </div>
      <AcceptedFilesPreviewer files={files} />
    </React.Fragment>
  );
};

function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-gray-50 dark:bg-neutral-950'
                  : 'bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]'
              }`}
            />
          );
        })
      )}
    </div>
  );
}
