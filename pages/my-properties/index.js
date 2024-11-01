import dynamic from "next/dynamic";

const MyProperties = dynamic(
  () => import("@/component/myProperties/MyProperties"),
  {
    ssr: false,
  }
);

export default function OtherInformationPage() {
  return <MyProperties />;
}
