// hooks/useSearchHandler.ts
import { useState } from "react";
import { useSearchStore } from "@/store/searchStore";
import { useRouter } from "next/navigation";

export default function useSearchHandler() {
  const [value, setValue] = useState("");
  const { setSearch: setSearchHandler } = useSearchStore();
  const router = useRouter();

  function goSearch() {
    router.push("/");
    setSearchHandler(value);
  }

  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    }
  }

  return {
    value,
    setValue,
    keydownHandler,
  };
}
