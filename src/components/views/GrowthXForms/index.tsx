import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';
import { Indicator } from '@/components/organisms/Form/Entries/Indicator';
import React from 'react';
import { Form } from '../../organisms';
import { Main } from './styles';

export const GrowthXForms = ({
  data,
}: ApiResponse<OnboardingType, QnaType>) => {
  return (
    <Main>
      <Form payload={data} persist>
        <Form.Progressbar />
        <Form.Header />
        <Form.Entries>
          {({
            onboarding,
            questions: content,
            handleIncrement,
            error,
            formState,
            step,
          }) => (
            <Form.Entries.Panels>
              <Form.Entries.Onboarding>
                <Form.Entries.Heading fontSize="4">
                  {onboarding.heading}
                </Form.Entries.Heading>
                <Form.Entries.Descriptor>
                  {onboarding.description}
                </Form.Entries.Descriptor>
                <Form.Entries.Controls>
                  <Form.Entries.Button onClick={handleIncrement}>
                    {onboarding.buttonText}
                  </Form.Entries.Button>
                  <Indicator indicate="Enter↵" />
                </Form.Entries.Controls>
              </Form.Entries.Onboarding>
              <Form.Entries.DataInput>
                {content.map((formContent, index) => (
                  <Form.Entries.Panel key={formContent.id} step={index}>
                    <Form.Entries.Heading fontSize="4">
                      {formContent.question}
                    </Form.Entries.Heading>
                    <Form.Entries.Descriptor>
                      {formContent.caption}
                    </Form.Entries.Descriptor>
                    <Form.Entries.InputField {...formContent.userinput} />
                    <Form.Entries.Controls>
                      {error[formContent.userinput.inputConfig.name] ? (
                        <Form.Entries.Error>
                          {error[formContent.userinput.inputConfig.name]}
                        </Form.Entries.Error>
                      ) : (
                        <React.Fragment>
                          {formContent.userinput.block_next &&
                          !formState[
                            formContent.userinput.inputConfig.name
                          ] ? null : (
                            <React.Fragment>
                              {data.questions.length === step + 1 ? (
                                <React.Fragment>
                                  <Form.Entries.Button type="submit">
                                    Submit
                                  </Form.Entries.Button>
                                  <Form.Entries.Indicator indicate="Cmd ⌘ + Enter ↵" />
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Form.Entries.Button
                                    onClick={handleIncrement}
                                  >
                                    OK
                                    <svg height={13} width={16}>
                                      <path d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z" />
                                    </svg>
                                  </Form.Entries.Button>
                                  <Form.Entries.Indicator indicate="Enter ↵" />
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
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
