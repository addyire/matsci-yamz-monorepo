"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const { data } = trpc.search.useQuery({ query, limit: 10 }, {
    placeholderData: (old) => old,
  });

  return (
    <main className="max-w-4xl w-full mx-auto p-4 space-y-4">
      <section className="relative h-[36px]">
        <SearchIcon className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
        <Input
          className="absolute inset-0 pl-8"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>
      <section className="flex flex-col gap-2">
        {data?.map((result) => (
          <Card
            key={result.definitions.id}
            className="p-2 !gap-0">
            <h1 className="font-medium text-lg">{result.terms.term}</h1>
            <p>{result.definitions.definition}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
