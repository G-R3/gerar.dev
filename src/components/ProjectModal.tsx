import { Dispatch, FC, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import type { Project } from "../projects";

interface Props extends Project {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  image,
  title,
  description,
  longDescription,
  tags,
  externals,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="bg-black inset-0 fixed bg-opacity-80 py-5 sm:py-10 sm:px-5">
        <Dialog.Panel className="bg-neutral-900 rounded-md max-w-2xl mx-auto flex flex-col gap-3 p-5 sm:max-h-[600px]">
          <div className="w-full min-h-[300px] relative">
            <Image
              src={`/images/${image}`}
              alt={title}
              width="100%"
              height="100%"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-10 mt-2">
            <div className="">
              <div className="flex items-center justify-between flex-wrap mb-6">
                <Dialog.Title as="h5" className="text-lg sm:text-xl font-bold">
                  {title}
                </Dialog.Title>

                <div className="flex gap-2 bg-neutral-800 rounded-md py-px px-1 mt-1 sm:mt-0">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs rounded-md p-1 text-gray-400 hover:text-white hover:bg-neutral-900 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Dialog.Description className="text-gray-400 text-sm sm:text-base">
                {longDescription}
              </Dialog.Description>
            </div>

            <div className="flex justify-end gap-2">
              {!!externals.github && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="self-end p-1 w-20"
                >
                  Source
                </button>
              )}
              {!!externals.demo && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="self-end p-1 w-20"
                >
                  Demo
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end p-1 w-20"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProjectModal;
