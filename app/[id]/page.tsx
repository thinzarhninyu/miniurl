import { redirect } from "next/navigation";
import { getUrlById } from "@/data/url";

const RedrectPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const data = await getUrlById(params.id);
  if (!data) {
    redirect("/");
  }
  redirect(data.url);
};

export default RedrectPage;
