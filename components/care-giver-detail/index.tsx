import React from 'react';
import * as S from './styles';

export default function CareGiveDetail() {
  return (
    <>
      <S.CareGiverDetail>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={3} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td>김요양</td>
                  <th>나이</th>
                  <td>55세</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>여자</td>
                  <th>연락처</th>
                  <td>010-0000-0000</td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>서울특별시 양천구 목동남로</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>요양 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <th>석션</th>
                  <td>경험 1년</td>
                  <th>기저귀</th>
                  <td>경험 1년</td>
                </tr>
                <tr>
                  <th>휠체어</th>
                  <td>경험 1년</td>
                  <th>목욕</th>
                  <td>경험 1년</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>성격 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="personality">
                    <S.PersonalityInfoList>
                      <S.PersonalityInfoItem>조용함</S.PersonalityInfoItem>
                      <S.PersonalityInfoItem>활발함</S.PersonalityInfoItem>
                      <S.PersonalityInfoItem>긍정적임</S.PersonalityInfoItem>
                    </S.PersonalityInfoList>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>돌봄 가능 시간</S.SectionTitle>
            <S.TimeTable>
              <tbody>
                <tr>
                  <th></th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th className="saturday">토</th>
                  <th className="sunday right">일</th>
                </tr>
                {[...Array(10)].map((time, index) => {
                  return (
                    <tr>
                      <td>
                        {index < 1 ? 0 : ''}
                        {index + 9}:00
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="right"></td>
                    </tr>
                  );
                })}
              </tbody>
              <S.TimeContainer day={0} startTime={9} endTime={13}>
                <S.TimeItem>
                  09:00
                  <br />~<br />
                  13:00
                </S.TimeItem>
              </S.TimeContainer>
              <S.TimeContainer day={2} startTime={9} endTime={13}>
                <S.TimeItem>
                  09:00
                  <br />~<br />
                  13:00
                </S.TimeItem>
              </S.TimeContainer>
            </S.TimeTable>
          </S.Section>
          <S.Section>
            <S.SectionTitle>경력</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <th className="career">근무지</th>
                  <th className="career right">기간</th>
                </tr>
                <tr>
                  <td className="career">성북구 S재가센터</td>
                  <td className="career right">2015.07~</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.MatchingButtonContainer>
            <S.MatchingButton>매칭 제안서 작성하기</S.MatchingButton>
          </S.MatchingButtonContainer>
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
