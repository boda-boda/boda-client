import CreateCareGiverRequest from '../../components/care-giver-edit/model/create-care-giver-request';
import CreateMatchingProposalRequest from '../../components/matching-proposal-new/model/create-matching-proposal-request';
import CreateRecipientRequest from '../../components/recipients-edit/model/create-recipient-request';
import CenterUpdateRequest from '../../views/my-center-edit-view/model/center-update-request';

export const isStringOnlyDigit = (str: string) => {
  return str.match(/^[0-9]*$/);
};

export const validatePhoneNumber = (number: string) => {
  if (!number) return;

  if (number.length < 9 || number.length > 11)
    return '전화번호는 9~11자의 숫자만 입력하실 수 있습니다.';

  if (!isStringOnlyDigit(number)) return '전화번호는 숫자(0~9)만 입력하실 수 있습니다.';
};

export const validate8DigitDate = (birthDay: string) => {
  if (!birthDay) return;

  if (birthDay.length !== 8) return '숫자(0~9) 8자리를 입력해주세요.';

  if (!isStringOnlyDigit(birthDay)) return '숫자(0~9)만 입력하실 수 있습니다.';
};

export const validateLicenseDate = (licenseDate: string) => {
  if (!licenseDate) return;

  if (licenseDate.length !== 8) return '자격증 취득일은 숫자(0~9) 8자리를 입력해주세요.';

  if (!isStringOnlyDigit(licenseDate)) return '자격증 취득일은 숫자(0~9)만 입력하실 수 있습니다.';
};

export const validateEmail = (email: string) => {
  if (!email) return;

  // https://www.edureka.co/blog/javascript-email-validation/
  if (!email.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/))
    return '올바른 이메일 양식을 입력해주세요.';
};

export const validateCareWorker = (createCareGiverRequest: CreateCareGiverRequest) => {
  const { name, birthDay, phoneNumber, licenseDate } = createCareGiverRequest;

  if (!name) {
    alert('이름을 입력해 주세요.');
    return false;
  }

  if (validatePhoneNumber(phoneNumber)) {
    alert(validatePhoneNumber(phoneNumber));
    return false;
  }

  if (validate8DigitDate(birthDay)) {
    alert(validate8DigitDate(birthDay));
    return false;
  }

  if (validateLicenseDate(licenseDate)) {
    alert(validateLicenseDate(licenseDate));
    return false;
  }

  return true;
};

export const validateRecipient = (createRecipientRequest: CreateRecipientRequest) => {
  const { name, age } = createRecipientRequest;

  if (!name) {
    alert('이름을 입력해 주세요.');
    return false;
  }

  if (!age || age >= 150) {
    alert('올바른 나이를 입력해주세요');
    return false;
  }

  return true;
};

export const validateCareCenter = (createCareCenterRequest: CenterUpdateRequest) => {
  const { username, phoneNumber } = createCareCenterRequest;

  if (!username) {
    alert('이름을 입력해 주세요.');
    return false;
  }

  if (validatePhoneNumber(phoneNumber)) {
    alert(validatePhoneNumber(phoneNumber));
    return false;
  }

  return true;
};

export const validateMatchingProposal = (matchingProposal: CreateMatchingProposalRequest) => {
  const { recipientId, hourlyWage } = matchingProposal;

  if (!recipientId) {
    alert('수급자를 선택해 주세요.');
    return false;
  }

  if (hourlyWage !== 0 && !hourlyWage) {
    alert('시급을 입력해 주세요.');
    return false;
  }

  if (hourlyWage <= -1) {
    alert('올바른 시급을 입력해 주세요.');
    return false;
  }

  return true;
};
