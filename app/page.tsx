import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import CardInput from "./_components/card-input";
import { getUrlsByUserId } from "@/data/user";
import CardDialog from "./_components/card-dialog";
import CopyButton from "./_components/copy-button";

const Home: React.FC = async () => {
  const user = await currentUser();

  const data = await getUrlsByUserId(user?.id!);

  const urls = data?.map((d) => d.urls)[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
          {urls &&
            urls.map((url) => (
              <>
                <p>My URLs</p>
                <Card key={url.id}>
                  <CardContent>
                    <p>{url.url}</p>
                    <p>
                      {process.env.NEXT_PUBLIC_URL}/{url.id}
                    </p>
                    <CopyButton
                      url={`${process.env.NEXT_PUBLIC_URL}/${url.id}`}
                    />
                  </CardContent>
                </Card>
                <CardDialog />
              </>
            ))}
        </div>
      ) : (
        <CardInput />
      )}
    </main>
  );
};

export default Home;
