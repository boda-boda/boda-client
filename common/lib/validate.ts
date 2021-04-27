import CreateCareGiverRequest from '../../components/care-giver-edit/model/create-care-giver-request';
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

export const validateBirthday = (birthDay: string) => {
  if (!birthDay) return;

  if (birthDay.length !== 8) return '생년월일은 숫자(0~9) 8자리를 입력해주세요.';

  if (!isStringOnlyDigit(birthDay)) return '생년월일은 숫자(0~9)만 입력하실 수 있습니다.';
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

  if (validateBirthday(birthDay)) {
    alert(validateBirthday(birthDay));
    return false;
  }

  if (validateLicenseDate(licenseDate)) {
    alert(validateLicenseDate(licenseDate));
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
