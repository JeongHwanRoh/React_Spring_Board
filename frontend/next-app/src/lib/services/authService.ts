import api from "@/lib/axios";

interface LoginRequest {
    email : string ;
    password : string;

}

interface LoginResponse{
    accessToken: string;
    refreshToken : string;
}



interface SignUpReq {
    email : string ;
    password : string;
    name : string;
}

interface SignUpRes {
    accessToken: string;
    refreshToken : string;
}


export async function login(data:LoginRequest): Promise<LoginResponse> { //Promise : 리턴 타입 지정

    const response = await api.post('/api/auth/login', data);
    return response.data;
    
}

export async function signUp(data: SignUpReq) : Promise<SignUpRes>{

    const response = await api.post('/api/auth/signup', data)
    return response.data
}