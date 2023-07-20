import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export const HasPermission = (role: String) => {
    const { permission } = useContext(AuthContext);


    if (role === "pro" && (permission === "admin" || permission === "pro")) {

        return true;
    }

    else if (role === permission) {

        return true;
    }

    return false;
}
