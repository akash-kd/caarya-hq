import { SearchIcon } from "@heroicons/react/outline";

function SearchBox({ setSearchbool, placeholder, search, setSearch }) {
  return (
    <div className="w-full flex flex-row items-center justify-start space-x-2 px-4 py-2 bg-white border border-primary-gray-200 rounded-full">
      <SearchIcon className="text-primary-gray-300 h-5" />
      <input
        placeholder={placeholder}
        value={search?.searchText}
        name="search"
        className="text-xs font-lato bg-transparent placeholder:text-primary-gray-250 w-11/12 focus:outline-none border-0 border-primary-gray-250"
        onChange={(e) => {
          e.target.value = e.target.value.trimStart();
          setSearch({
            ...search,
            searchText: e.target.value,
            isSearch: e.target.value !== "",
          });
          setSearchbool && setSearchbool(true);
        }}
      ></input>
    </div>
  );
}

export default SearchBox;
