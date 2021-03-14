import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import SlideLeftButtonSVG from '../../svgs/slide-left-button-svg';
import SlideRightButtonSVG from '../../svgs/slide-right-button-svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import CenterUpdateRequest from './model/center-update-request';
import { useCareCenter } from '../../context/care-center';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function MyCenterView() {
  const router = useRouter();
  const careCenter = useCareCenter();

  const centerImage = [
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg',
    'https://icatcare.org/app/uploads/2018/06/Layer-1704-1200x630.jpg',
    'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/kitten-440379.jpg',
  ];

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const [centerUpdateRequest, setCenterUpdateRequest] = useState(
    new CenterUpdateRequest(careCenter.careCenter)
  );

  const handleInputChange = useCallback(
    (key: keyof CenterUpdateRequest) => (e: any) => {
      setCenterUpdateRequest({
        ...centerUpdateRequest,
        [key]: e.target.value,
      });
    },
    [centerUpdateRequest]
  );

  useEffect(() => {
    if (!careCenter.careCenter) return;

    setCenterUpdateRequest(new CenterUpdateRequest(careCenter.careCenter));
  }, [careCenter]);

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
        setCenterUpdateRequest({
          ...centerUpdateRequest,
          zipCode: data.zonecode,
          address: data.roadAddress,
        });
      },
    }).open();
  };

  const [imageIndex, setImageIndex] = useState(0);

  const onChangeImage = async (e: any) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const axiosInstance = axios.create({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axiosInstance.post('/api/care-worker/profile', formData);
      setCenterUpdateRequest({
        ...centerUpdateRequest,
        profile: response.data.Location,
      });
    } catch {
      alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm('수정하시겠습니까?')) return;

    try {
      await axios.put('/api/care-center/', centerUpdateRequest);
      alert('수정이 완료되었습니다.');
      window.location.replace('/mycenter');
    } catch (e) {
      alert('사용자 정보 업데이트에 실패했습니다.');
    }
  };

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
                        <label htmlFor="profile">
                          <S.ProfileImage src={centerUpdateRequest.profile}>
                            <S.ImageIconContainer isHover={centerUpdateRequest.profile !== ''}>
                              <ImageDefaultSVG />
                            </S.ImageIconContainer>
                          </S.ProfileImage>
                        </label>
                        <input
                          id="profile"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={onChangeImage}
                        />
                      </S.ProfileImageContainer>
                    </td>
                    <th className="">이름</th>
                    <td className="infovalue">
                      <S.TextInput
                        value={centerUpdateRequest.username}
                        onChange={handleInputChange('username')}
                        type="text"
                      />
                    </td>
                    <th>전화</th>
                    <td className="infovalue">
                      <S.TextInput
                        value={centerUpdateRequest.phoneNumber}
                        onChange={handleInputChange('phoneNumber')}
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td className="infovalue">
                      <S.TextInput
                        value={centerUpdateRequest.email}
                        onChange={handleInputChange('email')}
                        type="text"
                      />
                    </td>
                    <th>홈페이지</th>
                    <td className="infovalue">
                      <S.TextInput
                        value={centerUpdateRequest.homePage}
                        onChange={handleInputChange('homePage')}
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>위치</th>
                    <td colSpan={3}>
                      <S.TextInput
                        type="text"
                        value={centerUpdateRequest.zipCode}
                        readOnly
                        onClick={openAddressModal}
                      />
                      <S.AddressButton onClick={openAddressModal}>주소 검색</S.AddressButton>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <S.TextInput type="text" value={centerUpdateRequest.address} long readOnly />
                    </td>
                    <td colSpan={2}>
                      <S.TextInput
                        type="text"
                        value={centerUpdateRequest.detailAddress}
                        readOnly={centerUpdateRequest.address === ''}
                        long
                        placeholder="상세주소 입력"
                        onChange={handleInputChange('detailAddress')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>센터 소개</th>
                    <td colSpan={3}>
                      <S.TextArea
                        ref={memoRef}
                        value={centerUpdateRequest.description}
                        onChange={(e) => {
                          handleInputChange('description')(e), setMemo(e.target.value);
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
            <S.FinishButton onClick={handleSubmit}>수정 완료</S.FinishButton>
          </S.FinishButtonContainer>
        </S.InnerContent>
      </>
    </Layout>
  );
}
