export interface UserRequest {
    user_id: string;
  }
  
  export interface CreateUserRequest {
    username: string;
    password: string;
  }
  
  export interface UserResponse {
    user_id: string;
    username: string;
    password: string;
  }
  