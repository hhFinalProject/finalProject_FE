import { useMutation, useQueryClient } from '@tanstack/react-query';

import search_icon from '../../assets/search_icon.svg';
import useChangeInputField from '../../hooks/useChangeInputField';
import { getSortbyMeetings } from '../../services/api';
import { saveItem } from '../../services/storage';
import { InputField, SearchFormWrap } from '../../styles/SearchFormStyle';

export default function SearchForm() {
  const { inputField, handleChangeInputField, handleClearInputField } = useChangeInputField();

  const queryClient = useQueryClient();

  const searchMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      variables && saveItem('keyword', variables);
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  const handleClickSearch = (keyword: string) => {
    if (keyword) {
      searchMeetings.mutate(keyword);
    } else {
      alert('검색어를 입력해주세요.');
    }
    handleClearInputField();
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>, keyword: string) => {
    if (event.keyCode == 13) {
      searchMeetings.mutate(keyword);
      handleClearInputField();
    }
  };

  return (
    <SearchFormWrap>
      <InputField>
        <button type="button" onClick={() => handleClickSearch(inputField)}>
          <img src={search_icon} />
        </button>
        <input
          type="text"
          placeholder="Search"
          onKeyUp={(e) => handleEnterKey(e, inputField)}
          value={inputField ? inputField : ''}
          onChange={(e) => handleChangeInputField(e)}
        />
      </InputField>
    </SearchFormWrap>
  );
}
