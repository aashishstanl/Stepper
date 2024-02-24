import { useEffect, useState, useRef } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIscomplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);
  useEffect(() => {
    if (stepRef.current.length > 0) {
      setMargins({
        marginLeft: stepRef.current[0].offsetWidth / 2,
        marginRight:
          stepRef.current[stepsConfig.length - 1].offsetWidth / 2 || 0,
      });
    }
  }, [stepRef, stepsConfig.length]);

  //handling next button
  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIscomplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return Math.round((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  //displaying the component content
  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  if (!stepsConfig.length) {
    return <></>;
  }
  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? " active" : ""}`}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />
      <br />

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepsConfig.length ? "Finish" : " NEXT"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;
