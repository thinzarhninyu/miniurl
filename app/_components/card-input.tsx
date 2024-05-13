"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { startTransition, useState } from "react";
import { CreateUrl } from "@/actions/create-url";
import CopyButton from "./copy-button";

const CardInput = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onGenerate = async () => {
    startTransition(() => {
      CreateUrl({
        url,
      })
        .then((data) => {
          setError(data.error ?? "");
          setSuccess(data.success ?? "");
          if (data.success) {
            setShortUrl(`${process.env.NEXT_PUBLIC_URL}/${data.code}`);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <Card>
      <CardHeader>Generate a new URL</CardHeader>
      <CardContent>
        <Label>URL</Label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)}></Input>
        <Button className="mt-5" onClick={onGenerate}>
          Generate
        </Button>
      </CardContent>
      <CardFooter>
        <Input value={shortUrl} placeholder="Mini URL" disabled />
        <CopyButton url={shortUrl} />
      </CardFooter>
    </Card>
  );
};

export default CardInput;
