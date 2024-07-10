import { backendURL } from "./config";

export const unauthPost =async (route , body , value , setValue)=> {   
    const response  = await fetch( backendURL + route , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formatResponse = await response.json();
    return formatResponse;

}