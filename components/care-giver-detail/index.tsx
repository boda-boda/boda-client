import Link from 'next/link';
import React from 'react';
import * as S from './styles';

export default function CareGiveDetail() {
  return (
    <>
      <S.CareGiverDetail>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.StyledLink href="0/edit">
              <S.EditButton>세부정보 수정</S.EditButton>
            </S.StyledLink>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={3} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="infovalue">김요양</td>
                  <th>나이</th>
                  <td className="infovalue">55세</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">여자</td>
                  <th>연락처</th>
                  <td className="infovalue">010-0000-0000</td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>서울특별시 양천구 목동남로</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>메모</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="memo">센터가 작성</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>활동 지역</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="area">서울특별시 양천구 목2동</td>
                  <td className="area">서울특별시 양천구 목2동</td>
                  <td className="area right">서울특별시 양천구 목2동</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>가능 조건</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="personality">
                    <S.PersonalityInfoList>
                      <S.PersonalityInfoItem>석션</S.PersonalityInfoItem>
                      <S.PersonalityInfoItem>입주</S.PersonalityInfoItem>
                      <S.PersonalityInfoItem>휠체어</S.PersonalityInfoItem>
                      <S.PersonalityInfoItem>기저귀</S.PersonalityInfoItem>
                    </S.PersonalityInfoList>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>요양보호사 스케줄</S.SectionTitle>
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
                  <th className="career long">근무지</th>
                  <th className="career">수급자</th>
                  <th className="career right">기간</th>
                </tr>
                <tr>
                  <td className="career long">성북구 제빵왕 재가센터</td>
                  <td className="career">윤시윤</td>
                  <td className="career right">2015.07~</td>
                </tr>
                <tr>
                  <td className="career long">동대문구 의형제 재가센터</td>
                  <td className="career">강동원</td>
                  <td className="career right">2013.07~2014.11</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
        </S.InnerContent>
      </S.CareGiverDetail>
    </>
  );
}
