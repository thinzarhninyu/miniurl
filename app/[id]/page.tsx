import { redirect } from "next/navigation";
import { getUrlByCode } from "@/data/url";

const RedrectPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const data = await getUrlByCode(params.id);
  if (!data) {
    redirect("/");
  }
  redirect(data.url);
};

export default RedrectPage;
