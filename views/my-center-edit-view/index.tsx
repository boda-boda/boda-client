import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import SlideLeftButtonSVG from '../../svgs/slide-left-button-svg';
import SlideRightButtonSVG from '../../svgs/slide-right-button-svg';
import { useEffect, useRef, useState } from 'react';
import ImageDefaultSVG from '../../svgs/image-default-svg';

export default function MyCenterView() {
  const centerImage = [
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1200x630.jpg',
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg',
  ];
  const [memo, setMemo] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);
  const openAddressModal = () => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setRoadAddress(data.roadAddress);
        setZonecode(data.zonecode);
      },
    }).open();
  };
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <Layout>
      <>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={2}
          title="나의 센터 정보"
          subtitle="우리 센터 정보를 등록할 수 있습니다."
        />
        <Category list={['홈', '나의 센터 정보']} />
        <S.InnerContent>
          <S.MyCenterPage>
            <S.Section>
              <S.SectionTitle>센터 정보</S.SectionTitle>
              <S.Table>
                <tbody>
                  <tr>
                    <td rowSpan={5} className="profile">
                      <S.ProfileImageContainer>
                        <S.ProfileImage src={profileImage}>
                          <S.ImageIconContainer isHover={profileImage !== null}>
                            <ImageDefaultSVG />
                          </S.ImageIconContainer>
                        </S.ProfileImage>
                      </S.ProfileImageContainer>
                    </td>
                    <th className="">이름</th>
                    <td className="infovalue">
                      <S.TextInput type="text" />
                    </td>
                    <th>전화</th>
                    <td className="infovalue">
                      <S.TextInput type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td className="infovalue">
                      <S.TextInput type="text" />
                    </td>
                    <th>홈페이지</th>
                    <td className="infovalue">
                      <S.TextInput type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>위치</th>
                    <td colSpan={3}>
                      <S.TextInput
                        type="text"
                        value={zonecode}
                        readOnly
                        onClick={openAddressModal}
                      />
                      <S.AddressButton onClick={openAddressModal}>주소 검색</S.AddressButton>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <S.TextInput type="text" value={roadAddress} long readOnly />
                    </td>
                    <td colSpan={2}>
                      <S.TextInput
                        type="text"
                        value={extraAddress}
                        readOnly={roadAddress === ''}
                        long
                        placeholder="상세주소 입력"
                        onChange={(e) => {
                          setExtraAddress(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>센터 소개</th>
                    <td colSpan={3}>
                      <S.TextArea
                        ref={memoRef}
                        value={memo}
                        onChange={(e) => {
                          setMemo(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </S.Table>
            </S.Section>
            <S.Section>
              <S.SectionTitle>센터 이미지</S.SectionTitle>
              <S.CenterImageContainer>
                <S.CenterImage src={centerImage[imageIndex]} />
                <S.ButtonContainer>
                  <S.ButtonDiv
                    onClick={() =>
                      setImageIndex((imageIndex + centerImage.length - 1) % centerImage.length)
                    }
                  >
                    <SlideLeftButtonSVG />
                  </S.ButtonDiv>
                  <S.ButtonDiv onClick={() => setImageIndex((imageIndex + 1) % centerImage.length)}>
                    <SlideRightButtonSVG />
                  </S.ButtonDiv>
                </S.ButtonContainer>
              </S.CenterImageContainer>
            </S.Section>
          </S.MyCenterPage>
          <S.FinishButtonContainer>
            <S.FinishButton>수정 완료</S.FinishButton>
          </S.FinishButtonContainer>
        </S.InnerContent>
      </>
    </Layout>
  );
}
