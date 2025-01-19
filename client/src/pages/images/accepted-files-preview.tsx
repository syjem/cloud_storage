import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type AcceptedFilesType = {
  files: File[];
  removeFile: (name: string) => void;
};

const AcceptedFilesPreviewer = ({ files, removeFile }: AcceptedFilesType) => {
  return (
    <div className="relative w-full mx-auto">
      {files.length > 0 && (
        <ScrollArea className="absolute w-[103%] h-52 pr-4">
          {files.length > 0 &&
            files.map((file, idx) => (
              <motion.div
                key={'file' + idx}
                layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                className={cn(
                  'group relative z-40 bg-white dark:bg-neutral-900 gap-4 flex items-center justify-start md:h-24 p-4 my-2 w-full rounded-md',
                  'shadow-sm'
                )}>
                <Button
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                  className="w-6 h-6 rounded-full absolute -top-2 right-0 invisible group-hover:visible">
                  <X />
                </Button>
                <img
                  src={file.preview}
                  width={50}
                  height={50}
                  alt="file preview"
                />
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
                </div>
              </motion.div>
            ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default AcceptedFilesPreviewer;
