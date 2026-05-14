import { useState } from "react";
import "@styles/components/searchbar.css";

export default function SearchBar({ tools, setFilteredTools }) {
  // local state for the input text
  const [query, setQuery] = useState("");

  function handleSearch(value) {
    // update the input value as the user types
    setQuery(value);

    // look through tools to find matches
    const filtered = tools.filter((tool) => {
      return (
        // check if name matches search
        tool.name.toLowerCase().includes(value.toLowerCase()) ||
        // check if description matches search
        tool.description.toLowerCase().includes(value.toLowerCase()) ||
        // check if any of the tags match search
        tool.tags.some((tag) => tag.includes(value.toLowerCase()))
      );
    });

    // update the parent state with the results
    setFilteredTools(filtered);
  }

  return (
    <input
      type="text"
      value={query}
      placeholder="Search tools..."
      // trigger search function on every keystroke
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full rounded-2xl bg-zinc-900 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-violet-500"
    />
  );
}
