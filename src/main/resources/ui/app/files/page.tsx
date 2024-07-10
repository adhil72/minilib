"use client";

import { fetchDocsController, filterDocsController } from "@/api/docs.controller";
import { createToast } from "@/Components/common/Toast";
import Files from "@/Components/feature/Files/Files";
import { useEffect, useState } from "react";

export default function Page() {
  const [docs, setDocs] = useState<any[]>([]);

  const fetchDocs = async () => {
    fetchDocsController().then((res) => {
      setDocs(res.data);
    })
  }

  const search = (query: string) => {
    filterDocsController({ query }).then((res) => {
      setDocs(res.data);
    }).catch((err) => {
      console.log(err);
      createToast({ message: "An error occurred", type: "error", title: "Error" })
    })
  }

  useEffect(() => {
    fetchDocs();
  }, [])

  return <Files docs={docs} search={search} />;
}
