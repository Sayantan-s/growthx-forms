import { fetchCountryData } from '@/api';
import { Button, Text, TextField, View } from '@/components/atoms';
import { CountryData } from '@/pages/api/countrydata';
import { PersistenceManager } from '@/utils';
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from '../..';

interface FlagType {
  data: CountryData;
}

interface PeristedData {
  countryCode: string;
  countryDialCode: string;
}

interface Props {
  onGetDialCode: (dialCode: string) => void;
}

const FlagSearch: FC<Props> = ({ onGetDialCode }) => {
  const persistCode = useRef(new PersistenceManager<PeristedData>('country'));
  const [flags, setFlags] = useState<CountryData>({});
  const [code, setCode] = useState(
    () => persistCode.current.get()?.countryCode || 'in'
  );
  const [search, setSearch] = useState('');
  const [dialCode, setDialCode] = useState(
    () => persistCode.current.get()?.countryDialCode || ''
  );
  const { persist } = useFormContext();

  const [showFlags, setShowFlags] = useState(false);

  useEffect(() => {
    async function fetchFlags() {
      const data: FlagType = await fetchCountryData();
      setFlags(data.data);
      const defaultCode = data.data[code].dial_code;
      setDialCode(defaultCode);
    }
    fetchFlags();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (eve) =>
    setSearch(eve.target.value);
  const handleShow = () => setShowFlags(true);

  const filterOptions = useMemo(() => {
    const options = Object.entries(flags);
    return options.filter(([_, country]) =>
      country.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [flags, search]);

  useEffect(() => {
    onGetDialCode(dialCode);
  }, [dialCode]);

  const manipulateInnerHTML = (
    str: string // highlight the presence of current value in input
  ) =>
    search
      ? str.replace(
          new RegExp(search, 'gi'),
          (match) => `<b class="marked">${match}</b>`
        )
      : str;

  const handleSelect = (countryCode: string, countryDialCode: string) => {
    setCode(countryCode);
    setShowFlags(false);
    setDialCode(countryDialCode);
    if (persist) {
      persistCode.current.set({ countryCode, countryDialCode });
    }
  };

  return (
    <Container>
      <Panel onClick={handleShow}>
        <Picture>
          <source
            type="image/webp"
            srcSet={`https://flagcdn.com/32x24/${code}.webp, https://flagcdn.com/64x48/${code}.webp 2x, https://flagcdn.com/96x72/${code}.webp 3x`}
          />
          <source
            type="image/png"
            srcSet={`https://flagcdn.com/32x24/${code}.png, https://flagcdn.com/64x48/${code}.png 2x, https://flagcdn.com/96x72/${code}.png 3x`}
          />
          <Image
            src={`https://flagcdn.com/32x24/${code}.png`}
            width="32"
            height="24"
            alt="South Africa"
          />
        </Picture>
        <svg height={9} width={14} fill="white">
          <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z" />
        </svg>
      </Panel>
      <AnimatePresence>
        {showFlags ? (
          <SearchResults>
            <StyledTextField
              name="search"
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search countries"
            />
            <List>
              {filterOptions.map(([code, country]) => (
                <ListItem
                  key={code}
                  as="li"
                  type="stack"
                  gap="2"
                  onClick={() => handleSelect(code, country.dial_code)}
                >
                  <ListItemContent>
                    <Picture>
                      <source
                        type="image/webp"
                        srcSet={`https://flagcdn.com/32x24/${code}.webp, https://flagcdn.com/64x48/${code}.webp 2x, https://flagcdn.com/96x72/${code}.webp 3x`}
                      />
                      <source
                        type="image/png"
                        srcSet={`https://flagcdn.com/32x24/${code}.png, https://flagcdn.com/64x48/${code}.png 2x, https://flagcdn.com/96x72/${code}.png 3x`}
                      />
                      <Image
                        src={`https://flagcdn.com/32x24/${code}.png`}
                        width="32"
                        height="24"
                        alt="South Africa"
                      />
                    </Picture>
                    <StyledText
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          manipulateInnerHTML(country.name)
                        ),
                      }}
                    />
                  </ListItemContent>
                  <Text>{country.dial_code}</Text>
                </ListItem>
              ))}
            </List>
          </SearchResults>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default FlagSearch;

const Panel = styled(Button)`
  background-color: transparent;
  box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  padding: ${({ theme }) => `${theme.spacing['2']} 0`};
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2']};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.colors.black[100]} 0px 2px`};
  }
`;

const Container = styled(View)`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
`;

const SearchResults = styled(View)`
  position: absolute;
  width: 100%;
  overflow: hidden;
  border: 1.5px solid ${({ theme }) => theme.colors.black[50]};
  border-radius: 1rem;
  padding: ${({ theme }) => `0 ${theme.spacing['4']}`};
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.black[900]};
  height: 30rem;
  overflow: scroll;
`;

const ListItemContent = styled(View)`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ListItem = styled(View)<Parameters<typeof View>[0]>`
  list-style: none;
  padding: ${({ theme }) => `0 ${theme.spacing['3']}`};
  border: 1px solid ${({ theme }) => theme.colors.black[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}40`};
  }
`;

const List = styled(View)`
  & > *:not(:first-child) {
    margin-top: ${({ theme }) => theme.spacing['2']};
  }
`;

const Picture = styled.picture`
  display: flex;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSize['3']};
  padding: ${({ theme }) => `${theme.spacing['3']} 0`};
  color: ${({ theme }) => theme.colors.black[50]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const StyledText = styled(Text)`
  .marked {
    font-weight: ${({ theme }) => theme.fontWeights.heading};
  }
`;
