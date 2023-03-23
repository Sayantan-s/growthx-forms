import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';

export const GrowthXForms = ({
  data,
}: ApiResponse<OnboardingType, QnaType>) => {
  return <div>{JSON.stringify(data)}</div>;
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
