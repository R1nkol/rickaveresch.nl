import Image from "next/image";

export default function ProjectCard({ title, description, imageSrc, link, tags, badge }) {
  return (
    <div className="bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group relative">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        {badge && (
          <div className="cursor-default pointer-events-none absolute top-3 left-3 backdrop-blur-sm bg-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-md shadow-md z-10 border border-white/10">
            {badge}
          </div>
        )}

      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-300 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white"
              >
                {tag}
              </div>
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
