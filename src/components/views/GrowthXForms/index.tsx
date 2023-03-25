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
          {({ onboarding, questions: content, handleIncrement }) => (
            <Form.Entries.Panels>
              <Form.Entries.Onboarding>
                <Form.Entries.Heading fontSize="3">
                  {onboarding.heading}
                </Form.Entries.Heading>
                <Form.Entries.Descriptor>
                  {onboarding.description}
                </Form.Entries.Descriptor>
                <Form.Entries.Button onClick={handleIncrement}>
                  {onboarding.buttonText}
                </Form.Entries.Button>
              </Form.Entries.Onboarding>
              <Form.Entries.DataInput>
                {content.map((formContent, index) => (
                  <Form.Entries.Panel key={formContent.id} step={index}>
                    <Form.Entries.Heading fontSize="3">
                      {formContent.question}
                    </Form.Entries.Heading>
                    <Form.Entries.Descriptor>
                      {formContent.caption}
                    </Form.Entries.Descriptor>
                    <Form.Entries.InputField {...formContent.userinput} />
                    <Form.Entries.Controls>
                      <Form.Entries.Button onClick={handleIncrement}>
                        OK
                        <svg height={13} width={16}>
                          <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z" />
                        </svg>
                      </Form.Entries.Button>
                      <Form.Entries.Indicator indicate="Enter↵" />
                    </Form.Entries.Controls>
                  </Form.Entries.Panel>
                ))}
              </Form.Entries.DataInput>
            </Form.Entries.Panels>
          )}
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
