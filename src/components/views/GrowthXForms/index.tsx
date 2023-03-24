import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';
import { Form } from '../../organisms';
import { Main } from './styles';

export const GrowthXForms = ({
  data,
}: ApiResponse<OnboardingType, QnaType>) => {
  return (
    <Main>
      <Form payload={data}>
        <Form.Progressbar />
        <Form.Entries>
          <Form.Entries.Onboarding>
            {({ onboarding: ob, handleIncrement }) => {
              const onboarding = ob as OnboardingType;
              return (
                <div>
                  <Form.Entries.Heading fontSize="4">
                    {onboarding.heading}
                  </Form.Entries.Heading>
                  <Form.Entries.Descriptor>
                    {onboarding.description}
                  </Form.Entries.Descriptor>
                  <Form.Entries.Button onClick={handleIncrement}>
                    {onboarding.buttonText}
                  </Form.Entries.Button>
                </div>
              );
            }}
          </Form.Entries.Onboarding>
          <Form.Entries.Panel>Panel</Form.Entries.Panel>
          <Form.Entries.Panel>Panel</Form.Entries.Panel>
        </Form.Entries>
      </Form>
    </Main>
  );
};

/*

OUTPUT DATASTRUCTURE

First Name: Sayantan
Last Name: Samanta
Industry of Company: Primary/Secondary Education
Role: VC
Professional Goal: Connect with like-minded people, Get hired
Email: sssamanta789@gmail.com
Phone: +919163456288

*/

/*
FLAGS

api=https://flagcdn.com/en/codes.json
srcset ="https://flagcdn.com/32x24/za.png 2x,
    https://flagcdn.com/48x36/za.png 3x"
src = https://flagcdn.com/16x12/za.png

*/

/*
COMPANY LIST

companys.txt

*/
