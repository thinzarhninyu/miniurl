"use client";

import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const CopyButton: React.FC<{ url: string }> = ({ url }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(url ?? "");
    setCopied(true);

    toast({
      title: "Copied",
      description: "Mini URL copied to clipboard",
    });

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Button onClick={onCopy} disabled={url === ""}>
      {copied ? <CopyCheck /> : <Copy />}
    </Button>
  );
};

export default CopyButton;
