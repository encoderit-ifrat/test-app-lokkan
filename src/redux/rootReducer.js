import { combineReducers } from "redux";
import StateReducer from "./state/reducer";
import PropertyTypeReducer from "./propertyType/reducer";
import FeatureReducer from "./features/reducer";
import ProjectReducer from "./projects/reducer";
import PhotoTypeReducer from "./photo/reducer";
import PropertyReducer from "./property/reducer";
import ProjectPropertyReducer from "./projectProperty/reducer";
import PropertyStatusReducer from "./propertyStatus/reducer";
import singlePropertyReducer from "./singleProperty/reducer";
import ButtonReducer from "./featureWithoutGroup/reducer";
import PropertyAcceptReducer from "./proposalAccept/reducer";
import ProposalRefuseReducer from "./proposalRefuse/reducer";
import CertificateReducer from "./certificates/reducer";
import ContractDetailsReducer from "./contractDetails/reducer";
import RequireCertificateReducer from "./requireCertificate/reducer";
import UploadCertificateReducer from "./uploadCertificate/reducer";
import ScheduleReducer from "./schedules/reducer";
import BrokerReducer from "./broker/reducer";
import ViewCertificateReducer from "./viewCertificate/reducer";
import FinalSubmittedDataReducer from "./finalData/reducer";
import CountReducer from "./proposalCount/reducer";
import BrokerCountReducer from "./brokerCount/reducer";
import NotificationReducer from "./all-notification/reducer";
import NotificationCountReducer from "./notificationCount/reducer";
import VideoTypeReducer from "./video/reducer";
import PropertyCountReducer from "./propertyCount/reducer";

const RootReducer = combineReducers({
  state: StateReducer,
  propertyType: PropertyTypeReducer,
  feature: FeatureReducer,
  project: ProjectReducer,
  photoType: PhotoTypeReducer,
  videoType: VideoTypeReducer,
  property: PropertyReducer,
  propertyStatus: PropertyStatusReducer,
  singleProperty: singlePropertyReducer,
  featureButton: ButtonReducer,
  propertyAccept: PropertyAcceptReducer,
  proposalRefuse: ProposalRefuseReducer,
  certificate: CertificateReducer,
  contractDetails: ContractDetailsReducer,
  requireCertificate: RequireCertificateReducer,
  uploadCertificate: UploadCertificateReducer,
  schedule: ScheduleReducer,
  broker: BrokerReducer,
  viewCertificate: ViewCertificateReducer,
  finalSubmit: FinalSubmittedDataReducer,
  count: CountReducer,
  propertyCount: PropertyCountReducer,
  brokerCount: BrokerCountReducer,
  notification: NotificationReducer,
  notificationCount: NotificationCountReducer,
});

export default RootReducer;
