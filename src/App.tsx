import "./App.css";
import { Octokit } from "@octokit/rest";
import RepoCard from "./RepoCard";
import { useEffect, useState } from "react";

function App() {
  const [data, setData]: any = useState([]);
  const per_page = 5;
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>();
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const octokit = new Octokit({
    auth: "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",
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await octokit.request(
        `GET /search/repositories?q=${
          searchText ? searchText : "a"
        }&per_page=5&page=${page}`,
        {}
      );
      const items = res.data.items;
      setTotalPages(Math.ceil(res.data?.total_count / per_page));
      setData(items);
      setIsLoading(false);
    })();
  }, [page, searchText]);

  const searchHandler = (event: any) => {
    event.preventDefault();
    setPage(1);
    setSearchText(event.target[0].value);
  };

  const buttonHandler = (pageNo: number) => {
    if ((totalPages && page < totalPages) || page > 1) {
      setPage(pageNo);
    }
  };

  return (
    <div className="flex flex-col justify-between h-auto w-4/5 xl:w-2/5 bg-white mx-auto mt-6 p-10">
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Github Repo</h1>
        {/* search section */}
        <form className="flex flex-row gap-4" onSubmit={searchHandler}>
          <input
            type="text"
            className="w-full border-2 rounded h-12 pl-4"
            placeholder="Search for github repo"
            onChange={(e) => {}}
          />
          <button
            className="bg-black text-white w-40 rounded btn-md btn-search"
            type="submit"
            placeholder="search"
          >
            Search
          </button>
        </form>
      </div>

      {/* list section */}
      <div className="flex flex-col">
        {isLoading ? 
        <div className="m-auto mt-6 w-12 h-12 rounded-full animate-spin border-8 border-solid border-black border-t-transparent"></div> : 
        data?.map((repo: any, index:number) => {
          return (
            <RepoCard
              key={index}
              name={repo.name}
              description={repo.description}
              ownerName={repo.owner.login}
              img={repo.owner.avatar_url}
              language={repo.language}
              forks={repo.forks_count}
            />
          );
        })}
      </div>
      {/* pagination section */}
      <div className="w-full flex justify-end mt-10">
        <div className="btn-group gap-x-2 ">
          <button
            disabled={page === 1}
            onClick={() => buttonHandler(page - 1)}
            className="btn btn-sm rounded-none btn-prev"
          >
            PREV
          </button>

          {page > 2 && (
            <button
              onClick={() => buttonHandler(page - 2)}
              className="btn btn-sm rounded-none"
            >
              {page - 2}
            </button>
          )}
          {page > 1 && (
            <button
              onClick={() => buttonHandler(page - 1)}
              className="btn btn-sm rounded-none"
            >
              {page - 1}
            </button>
          )}
          <button
            onClick={() => buttonHandler(page)}
            className="btn btn-sm btn-active rounded-none"
          >
            {page}
          </button>
          {totalPages && totalPages - page > 1 && (
            <button
              onClick={() => buttonHandler(page + 1)}
              className="btn btn-sm rounded-none"
            >
              {page + 1}
            </button>
          )}
          {totalPages && totalPages - page > 2 && (
            <button
              onClick={() => buttonHandler(page + 2)}
              className="btn btn-sm rounded-none"
            >
              {page + 2}
            </button>
          )}

          <button
            disabled={totalPages === page}
            onClick={() => buttonHandler(page + 1)}
            className="btn btn-sm rounded-none btn-next"
          >
            NEXT
          </button>
        </div>
      </div>
      <div>
      <h1 className="text-1xl font-bold text-gray-800 mt-4">Created by: sergio Lio (applicant)</h1>
      </div>
    </div>
  );
}

export default App;
