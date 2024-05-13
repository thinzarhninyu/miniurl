import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import CardInput from "./_components/card-input";
import { getUrlsByUserId } from "@/data/user";
import CardDialog from "./_components/card-dialog";
import CopyButton from "./_components/copy-button";
import Link from "next/link";

const Home: React.FC = async () => {
  const user = await currentUser();

  const data = await getUrlsByUserId(user?.id!);

  const urls = data?.map((d) => d.urls)[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
          <div className="flex flex-row justify-between mb-5">
            <p>My URLs</p>
            <CardDialog />
          </div>
          <div className="flex flex-col gap-y-5 max-w-2xl">
            {urls &&
              urls.map((url) => (
                <>
                  <Card key={url.id} className="pt-5">
                    <CardContent className="flex flex-col gap-y-3">
                      <div>
                        <p>Original URL:</p>
                        <Link href={url.url}>{url.url}</Link>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}/${url.code}`}
                        >
                          {process.env.NEXT_PUBLIC_URL}/{url.code}
                        </Link>
                        <CopyButton
                          url={`${process.env.NEXT_PUBLIC_URL}/${url.code}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ))}
          </div>
        </div>
      ) : (
        <CardInput />
      )}
    </main>
  );
};

export default Home;
