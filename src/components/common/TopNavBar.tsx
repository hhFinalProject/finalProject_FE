import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import cal_left_arrow_icon from '../../assets/cal_left_arrow_icon.svg';
import logo from '../../assets/logo.svg';
import plus_icon from '../../assets/plus_icon.svg';
import profile_icon from '../../assets/profile_icon.svg';
import { removeItem } from '../../services/storage';
import { LeftBox, RightBox, TopBar, TopNavBarWrap } from '../../styles/TopNavBarStyle';
import Categories from './Categories';
import SearchForm from './SearchForm';
import SortbyCategories from './SortbyCategories';

export default function TopNavBar({ name }: { name: string }) {
  const { id } = useParams();

  const handleClickBack = () => {
    history.back();
    removeItem('currPost');
  };

  return name === 'home' ? (
    <TopNavBarWrap>
      <TopBar>
        <Link to="/main">
          <img src={logo} />
        </Link>
        <RightBox>
          <Link to="/post">
            <img src={plus_icon} />
          </Link>
          <Link to="#">
            <img src={profile_icon} />
          </Link>
        </RightBox>
      </TopBar>
      <SortbyCategories />
      <SearchForm />
      <Categories />
    </TopNavBarWrap>
  ) : (
    <TopNavBarWrap>
      <LeftBox>
        <button type="button" onClick={() => handleClickBack()}>
          <img src={cal_left_arrow_icon} />
        </button>
        <p>{id ? '모임 수정하기' : '모임 생성하기'}</p>
      </LeftBox>
    </TopNavBarWrap>
  );
}
