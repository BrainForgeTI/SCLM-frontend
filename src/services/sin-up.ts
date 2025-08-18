import { apiAuth } from "@/lib/api-manager";
import { SignUpType } from "@/schemas/sign-up-schema";

export const signUp = async (data: SignUpType) => {
  const validationCode = data.fourthStep.code.split("");

  const formData = new FormData();
  formData.append("firstName", data.firstStep.firstName);
  formData.append("lastName", data.firstStep.lastName);
  formData.append("userName", data.firstStep.userName);
  formData.append("profileImage", data.secondStep.image);
  formData.append("dateOfBirth", data.secondStep.birthDate.toISOString().split("T")[0]);
  formData.append("gender", data.secondStep.gender);
  formData.append("email", data.thirdStep.email);
  formData.append("password", data.thirdStep.password);
  formData.append("confirmPassword", data.thirdStep.confirmPassword);
  formData.append("terms", String(data.thirdStep.acceptedTerms));
  formData.append("code1", validationCode[0]);
  formData.append("code2", validationCode[1]);
  formData.append("code3", validationCode[2]);
  formData.append("code4", validationCode[3]);

  return await apiAuth.post("/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
