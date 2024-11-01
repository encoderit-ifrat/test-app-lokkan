import dynamic from 'next/dynamic'

const OtherInformation = dynamic(
  () => import('@/component/OtherInformation/OtherInformation'),
  {
    ssr: false,
  },
)

export default function OtherInformationPage({ loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language}) {
  return <OtherInformation handleLoginOpen={handleLoginOpen} loginOpen={loginOpen} setLoginOpen={setLoginOpen} handleLoginClose={handleLoginClose} language={language} />
}
