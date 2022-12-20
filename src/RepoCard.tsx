import React from "react";

interface RepoCardProps {
  name: string;
  description: string;
  ownerName: string;
  img: string;
  language: string;
  forks: number;
}

const RepoCard = ({
  name,
  description,
  ownerName,
  img,
  language,
  forks,
}: RepoCardProps) => {
  return (
    <div className="flex justify-between gap-x-8 items-center p-2">
      <div className="flex flex-col w-4/5">
        <h1 className="text-2xl font-semibold text-black">{name}</h1>
        <span className="flex flex-row gap-x-2 text-sm">
          <span className="text-gray-500 font-semibold">Owner:</span>
          <span className="text-gray-500">{ownerName}</span>
        </span>

        <span className="text-gray-500 font-semibold text-sm">
          Description:
          <span className="text-gray-500 font-normal ml-2">{description}</span>
        </span>
      </div>
      <div className="flex flex-row gap-x-2">
        <div className="w-14 h-14 m-auto rounded-xl">
          <img src={img} alt={ownerName} className="rounded-xl" />
        </div>
        <span className="flex flex-col gap-y-1">
          <span className="flex flex-col">
            <span className="text-gray-800 text-sm font-semibold">
              Language
            </span>
            <span className="text-gray-800 text-sm">{language}</span>
          </span>
          <span className="flex flex-col">
            <span className="text-gray-800 text-sm font-semibold">
              Fork
            </span>
            <span className="text-gray-800 text-sm">{forks}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
