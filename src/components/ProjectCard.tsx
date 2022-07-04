import { FC, useState } from "react";
import ProjectModal from "./ProjectModal";
import type { Project } from "../projects";

const ProjectCard: FC<Project> = ({
  image,
  title,
  description,
  longDescription,
  tags,
  externals,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full md:w-1/3 p-1 rounded-md hover:scale-105 transition-all">
        <div className="p-5 rounded-md bg-black flex flex-col justify-between items-start gap-10 h-full">
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="mt-3">{description}</p>
          </div>

          <button onClick={() => setIsOpen((prev) => !prev)}>View</button>
        </div>
      </div>

      {isOpen && (
        <ProjectModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          image={image}
          title={title}
          description={description}
          longDescription={longDescription}
          tags={tags}
          externals={externals}
        />
      )}
    </>
  );
};

export default ProjectCard;
