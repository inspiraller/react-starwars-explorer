import useGetAllPeople from '@/context/Tanstack/usePeople/useGetAllPeople';
import { usePeopleStore } from '@/store/zustand/people/people';

import Autocomplete, {
  SetValues,
} from '@/components/Autocomplete/Autocomplete';

export const PeopleAutocomplete = ({ nameValue, setNameValue }: SetValues) => {
  const { isFetching, error, isSuccess } = useGetAllPeople();
  const { peopleNames } = usePeopleStore();

  return (
    <>
      <Autocomplete
        type='Person'
        nameValue={nameValue}
        setNameValue={setNameValue}
        isFetching={isFetching}
        error={error}
        isSuccess={isSuccess}
        names={peopleNames}
      />
    </>
  );
};
