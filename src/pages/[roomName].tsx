import { Layout } from "@/components/layout/layout";
import { Room } from "@/components/Room";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  if (typeof router?.query?.roomName !== "string") {
    return <Layout>{null}</Layout>;
  }

  

  return (
    <Layout>
      <Room roomName={router.query.roomName} />
    </Layout>
  );
}
