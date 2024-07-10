"use client";

import { fetchDocsController } from "@/api/docs.controller";
import Home from "@/Components/feature/Home/Home";
import { useEffect, useState } from "react";

export default function Page() {
  const [docs, setDocs] = useState<any[]>([]);

  const fetchDocs = async () => {
    fetchDocsController().then((res) => {
      setDocs(res.data);
    })
  }

  useEffect(() => {
    fetchDocs();
  }, [])

  return <Home docs={docs} />;
}
