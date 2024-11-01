import Head from "next/head";
import dynamic from "next/dynamic";
const Authenticate = dynamic(() => import("@/component/providerAuth/Authenticate"), {
  ssr: false,
});

export default function facebook() {
  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
      <Authenticate provider={"facebook"}/>
      </main>
    </div>
  );
}

