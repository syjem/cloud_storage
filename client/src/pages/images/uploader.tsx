import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FileRejection, useDropzone } from 'react-dropzone';
import AcceptedFilesPreviewer from '@/pages/images/accepted-files-preview';
import RejectedFilesPreviewer from '@/pages/images/rejected-files-preview';

export const FileUploader = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    // Filter duplicate files
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

    if (onChange) onChange(newFiles);
  };

  const handleRejectedFiles = async (fileRejections: FileRejection[]) => {
    const updatedFiles = await Promise.all(
      fileRejections.map(async (rejection) => {
        const file = rejection.file;

        if ('getFile' in file) {
          const actualFile = await (
            file as { getFile: () => Promise<File> }
          ).getFile();

          Object.assign(file, {
            size: actualFile.size,
            type: actualFile.type,
            lastModified: actualFile.lastModified,
            preview: URL.createObjectURL(actualFile),
          });
        }

        return Object.assign(rejection, {
          file: Object.assign(rejection.file, {
            preview: URL.createObjectURL(rejection.file),
          }),
        });
      })
    );

    // Filter duplicate files
    const filteredRejectedFiles = updatedFiles.filter((newRejection) => {
      return !rejectedFiles.some(
        (rejection) => rejection.file.name === newRejection.file.name
      );
    });

    if (filteredRejectedFiles.length > 0) {
      setRejectedFiles((prevRejections) => [
        ...prevRejections,
        ...filteredRejectedFiles,
      ]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (name: string) => {
    setFiles((prevFiles) => {
      const fileToRemove = prevFiles.find((file) => file.name === name);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter((file) => file.name !== name);
    });
  };

  const removeRejectedFile = (name: string) => {
    setRejectedFiles((prevRejections) => {
      const fileToRemove = prevRejections.find(
        (rejection) => rejection.file.name === name
      );
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.file.preview);
      }
      return prevRejections.filter((rejection) => rejection.file.name !== name);
    });
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    maxSize: 2 * 1024 * 1024,
    maxFiles: 5,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    onDrop: handleFileChange,
    onDropRejected: handleRejectedFiles,
  });

  return (
    <React.Fragment>
      <div
        {...getRootProps({
          className: 'border border-dashed border-secondary',
        })}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden">
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
              Upload file
            </p>
            <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
              Drag 'n' drop your files here or click to upload
            </p>
            <AcceptedFilesPreviewer
              files={files}
              isDragActive={isDragActive}
              removeFile={removeFile}
            />
          </div>
        </motion.div>
      </div>
      <RejectedFilesPreviewer
        rejectedFiles={rejectedFiles}
        removeRejectedFile={removeRejectedFile}
      />
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
