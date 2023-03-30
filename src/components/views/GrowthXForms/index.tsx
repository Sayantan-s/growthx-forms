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
        <Form.Overlay />
        <Form.Entries>
          {({
            onboarding,
            questions: content,
            handleIncrement,
            error,
            formState,
            step,
            handleSubmit,
            formSubmitState,
          }) => (
            <Form.Entries.Panels>
              <Form.Entries.Onboarding>
                <Form.Entries.Heading>
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
                    <Form.Entries.Heading>
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
                                  <Form.Entries.SubmitButton
                                    type="submit"
                                    disabled={formSubmitState === 'loading'}
                                    isLoading={formSubmitState === 'loading'}
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </Form.Entries.SubmitButton>
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
              <Form.Entries.Submission>
                All done! Thanks for your time.
              </Form.Entries.Submission>
            </Form.Entries.Panels>
          )}
        </Form.Entries>
      </Form>
    </Main>
  );
};
