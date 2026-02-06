// Interface representing the payload of a JWT token 
export interface JwtUserPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
  }
  