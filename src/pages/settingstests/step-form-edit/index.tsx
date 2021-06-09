import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect,FormattedMessage } from 'umi';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
  console.log("in");

const { Step } = Steps;

interface StepFormProps {
  current: StateType['current'];
}

const getCurrentStepAndComponent = (current?: string) => {
  console.log(current);
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

  let done = localStorage.getItem('stepEditQues');
  //console.log(done);

  if(done == 'done'){
  //console.log(currentStep);
  console.log("test first");
    let current = 'info';
       useEffect(() => {
          const { step, component } = getCurrentStepAndComponent(current);
          setCurrentStep(step);
          setStepComponent(component);
        }, [current]);
    //setCurrentStep(step);
  }else{
    useEffect(() => {
      const { step, component } = getCurrentStepAndComponent(current);
      setCurrentStep(step);
      setStepComponent(component);
    }, [current]);

 }

  // if(current == 'result'){
  //   //currentStep = 0;
  //   setCurrentStep(0);
  // }
  //let done = localStorage.getItem('done');
  // if(done){
  //   setCurrentStep(0);
  // }

  
  return (
    <PageContainer content="" onBack={() => window.history.back()}  title={<FormattedMessage id="que.step1.main.title" defaultMessage="Edit Question "/>}>
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
             <Step title={<FormattedMessage id="que.step1.msg" defaultMessage="Question type"/>} />
            <Step title={<FormattedMessage id="que.step2.msg" defaultMessage="Question Details"/> }/>
            <Step title={<FormattedMessage id="que.step3.msg" defaultMessage="Summary" />} />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageContainer>
  );
};

export default connect(({ questionEditFormAndstepForm }: { questionEditFormAndstepForm: StateType }) => ({
  current: questionEditFormAndstepForm.current,
}))(StepForm);
