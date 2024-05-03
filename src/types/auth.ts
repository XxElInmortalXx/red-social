export type Client_AuthRegisterUser = {
  displayName: string;
  email: string;
  password: string;
  gender: string;
};

export type Client_AuthLoginUser = {
  email: string
  password: string
};

export type Client_User = {
  displayName: string;
  email: string;
  gender: string;
  profile_image: string;
  cover_image: string;
  bio: string;
}