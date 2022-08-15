import gql from 'graphql-tag';
import { throttle } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { CustomSelect, CustomSelectProps, CustomSelectValue } from './CustomSelect';
import { useApplicantIndividualCompanyRelationsQuery } from './SelectCompanyRelation.generated';

gql`
query applicantIndividualCompanyRelations($name: Mixed) {
  applicantIndividualCompanyRelations(
    where: { column: NAME, operator:LIKE, value: $name }
  ) {
    data {
      id
      name
    }
  }
}
`;

export const SelectCompanyRelation = (props: CustomSelectProps) => {
  const [inputValue, setInputValue] = React.useState('%');
  const [options, setOptions] = React.useState<CustomSelectValue[]>([]);

  const { data, isLoading } = useApplicantIndividualCompanyRelationsQuery({
    name: inputValue
  });
  useEffect(() => {
    if (!isLoading) {
      setOptions(data?.applicantIndividualCompanyRelations?.data ?? []);
    }
  }, [data?.applicantIndividualCompanyRelations?.data, isLoading])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInputValueChange = useCallback(
    throttle((newInputValue: string) => setInputValue(`%${newInputValue}%`), 1000),
    []);

  return <CustomSelect
    placeholder='Select Company Relation'
    multiple={true}
    options={options}
    onInputValueChange={onInputValueChange}
    value={props.value}
    onChange={props.onChange}
    error={props.error}
  />;
}
