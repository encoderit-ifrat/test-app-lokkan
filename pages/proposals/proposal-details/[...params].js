
import dynamic from 'next/dynamic'
const ProposalDetails = dynamic(() => import("@/component/proposalDetails/ProposalDetails"), {
  ssr: false,
});


export default function IncludeProposal({ language }) {
  return (
    <ProposalDetails language={language}/>
  )
}
