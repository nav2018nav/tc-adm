import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect,FormattedMessage } from 'umi';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

interface StepFormProps {
  current: StateType['current'];
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 1, component: <Step2 /> };
    case 'result':
      return { step: 2, component: <Step3 /> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const StepForm: React.FC<StepFormProps> = ({ current }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  let done = localStorage.getItem('stepTest');

  if(done == 'firstTest'){
  //console.log(currentStep);
  console.log("test first");
    let current = 'info';
        useEffect(() => {
          const { step, component } = getCurrentStepAndComponent(current);
          setCurrentStep(step);
          setStepComponent(component);
        }, [current]);
  }else{
     useEffect(() => {
        const { step, component } = getCurrentStepAndComponent(current);
        setCurrentStep(step);
        setStepComponent(component);
      }, [current]);
  }


  // useEffect(() => {
  //   const { step, component } = getCurrentStepAndComponent(current);
  //   setCurrentStep(step);
  //   setStepComponent(component);
  // }, [current]);

  return (
    <PageContainer content=""  onBack={() => window.history.back()} title={<FormattedMessage id="stepForm.step1.msg.main.title" defaultMessage=" "/>}>
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title={<FormattedMessage id="stepForm.step1.msg" defaultMessage="Basic information"/>} />
            <Step title={<FormattedMessage id="stepForm.step2.msg" defaultMessage="Test scope"/>} />
            <Step title={<FormattedMessage id="stepForm.step3.msg" defaultMessage="Summary"/>} />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageContainer>
  );
};

export default connect(({ testFormAndstepForm }: { testFormAndstepForm: StateType }) => ({
  current: testFormAndstepForm.current,
}))(StepForm);
