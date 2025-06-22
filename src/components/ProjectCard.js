// src/components/ProjectCard.js
import Image from "next/image";
import PropTypes from "prop-types";

export default function ProjectCard({ title, description, imageSrc, link, tags, badge }) {
  return (
    <div className="flex flex-col md:flex-row bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group relative">
      {/* Image Section */}
      <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        {badge && (
          <div className="absolute top-3 left-3 backdrop-blur-sm bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-md shadow-md z-10 border border-white/10 pointer-events-none">
            {badge}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300 mt-2">{description}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-purple-500 text-purple-400 px-2 py-1 rounded text-sm transition hover:bg-purple-500 hover:text-white cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={link}
            className="text-purple-400 text-sm transition hover:underline hover:text-purple-300"
          >
            Meer info →
          </a>
        </div>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  title:        PropTypes.string.isRequired,
  description:  PropTypes.string.isRequired,
  imageSrc:     PropTypes.string.isRequired,
  link:         PropTypes.string.isRequired,
  tags:         PropTypes.arrayOf(PropTypes.string).isRequired,
  badge:        PropTypes.string,
};

ProjectCard.defaultProps = {
  badge: null,
};
