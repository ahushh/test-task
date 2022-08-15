import gql from 'graphql-tag';
import React, { useCallback, useEffect } from 'react';
import { CustomSelect, CustomSelectProps, CustomSelectValue } from './CustomSelect';
import { useApplicantIndividualCompanyPositionsQuery } from './SelectCompanyPosition.generated';
import { throttle } from 'lodash';

gql`
query ApplicantIndividualCompanyPositions($name: Mixed) {
  applicantIndividualCompanyPositions(
    where: { column: NAME, operator:LIKE, value: $name }
  ) {
    data {
      id
      name
    }
  }
}
`;

export const SelectCompanyPositions = (props: CustomSelectProps) => {
  const [inputValue, setInputValue] = React.useState('%');
  const [options, setOptions] = React.useState<CustomSelectValue[]>([]);

  const { data, isLoading } = useApplicantIndividualCompanyPositionsQuery({
    name: inputValue
  });
  useEffect(() => {
    if (!isLoading) {
      setOptions(data?.applicantIndividualCompanyPositions?.data ?? []);
    }
  }, [data?.applicantIndividualCompanyPositions?.data, isLoading])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInputValueChange = useCallback(
    throttle((newInputValue: string) => setInputValue(`%${newInputValue}%`), 1000),
    []);

  return <CustomSelect
    placeholder='Select Company Position'
    options={options}
    onInputValueChange={onInputValueChange}
    value={props.value}
    onChange={props.onChange}
    error={props.error}
  />;
}