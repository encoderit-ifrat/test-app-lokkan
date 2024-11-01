import { Box, Button, Grid, TextareaAutosize, Typography } from "@mui/material";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import ProposalStep from "../proposalStep/ProposalStep";
import BuyerStep from "../BuyerStep/BuyerStep";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import BaseStepper from "../../reuseable/baseStepper/BaseStepper";
import en from "locales/en";
import pt from "locales/pt";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";

function ProposalModal({
  handleProposalClose,
  singlePropertyId,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;

  const steps = [t["proposal values"]];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "50%", xl: "50%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    maxHeight: "70vh",
    overflowY: "scroll",
    px: 3,
    py: 2,
  };
  return (
    <Box sx={style}>
      <Box sx={{ width: "100%" }}>
        {activeStep === 0 && (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#002152",
              }}
            >
              {t["Proposal"]}
            </Typography>

            <BaseCloseButton handleClose={handleProposalClose} />
          </Grid>
        )}

        {/* <Stepper activeStep={activeStep} sx={{ marginTop: 2 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
        {activeStep === 0 && (
          <BaseStepper
            steps={steps}
            activeStep={activeStep}
            isStepSkipped={isStepSkipped}
            setActiveStep={setActiveStep}
            marginTop={"2vh"}
          />
        )}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Image src={submitProposal} alt="submit" />
              </Box>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#1A1859",
                  lineHeight: "32px",
                }}
              >
                proposta enviada com sucesso
                {/* {t["proposal sent"]} */}
              </Typography>
            </Grid>
            <Button
              fullWidth
              sx={{
                mt: 1,
                py: 1,
                background: "#DBE1E5",
                color: "#1A1859",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
              onClick={handleProposalClose}
            >
              {t["Close"]}
            </Button>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <ProposalStep
                skipped={skipped}
                setSkipped={setSkipped}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                singlePropertyId={singlePropertyId}
                languageName={languageName}
              />
            )}
            <Grid
              container
              direction="row"
              justifyContent={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-end",
                xl: "flex-end",
              }}
              alignItems="center"
              sx={{
                // display: "flex",
                // flexDirection: "row",

                pt: 2,
              }}
            >
              {/* <Button
                color="inherit"
                // disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  border: "1px solid #002152",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                }}
              >
                Come back
              </Button> */}

              {/* {isStepOptional(activeStep) && (
                <Button
                  sx={{
                    mr: 1,
                    border: "1px solid #002152",
                    borderRadius: "4px",
                    px: 2,
                    py: 1,
                    color: "#002152",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    textTransform: "none",
                  }}
                  color="inherit"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )} */}

              {/* <Button
                onClick={handleNext}
                sx={{
                  background: "#7450F0",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "4px",
                    px: 2,
                    py: 1,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    textTransform: "none",
                    boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                  },
                }}
              >
                {activeStep === steps.length - 1 ? "Submit Proposal" : "Submit"}
              </Button> */}
            </Grid>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default ProposalModal;
