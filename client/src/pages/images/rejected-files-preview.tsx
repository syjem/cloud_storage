import { FileRejection } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type RejectedFilesType = {
  rejectedFiles: FileRejection[];
  removeRejectedFile: (name: string) => void;
};

const RejectedFilesPreviewer = ({
  rejectedFiles,
  removeRejectedFile,
}: RejectedFilesType) => {
  return (
    <div>
      {rejectedFiles.length > 0 && (
        <h3 className="text-center text-primary font-semibold text-lg">
          Rejected File(s)
        </h3>
      )}

      <div className="relative w-full mt-10 max-w-xl mx-auto">
        {rejectedFiles.map(({ file, errors }, idx) => (
          <motion.div
            key={'file' + idx}
            className={cn(
              'group relative z-40 bg-white dark:bg-neutral-900 gap-4 flex items-center justify-start p-4 mt-4 w-full mx-auto rounded-md border border-dashed border-primary',
              'shadow-sm'
            )}>
            <Button
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeRejectedFile(file.name);
              }}
              className="w-6 h-6 rounded-full absolute -top-2 right-0 invisible group-hover:visible">
              <X />
            </Button>
            <img src={file.preview} width={50} height={50} alt="file preview" />
            <div className="w-full">
              <div className="flex justify-between w-full items-center gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                  {file.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </motion.p>
              </div>
              <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 ">
                  {file.type}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout>
                  last modified{' '}
                  {new Date(file.lastModified).toLocaleDateString()}
                </motion.p>
              </div>
              <div className="mt-4">
                {errors.map((e) => (
                  <motion.p
                    key={e.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-1 py-0.5 rounded-md text-primary text-sm">
                    {e.code === 'file-too-large' ? (
                      <span>
                        File is larger than{' '}
                        {(2097152 / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    ) : (
                      e.message
                    )}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RejectedFilesPreviewer;
