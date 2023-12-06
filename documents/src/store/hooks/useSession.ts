import Cookies from "universal-cookie";

export function useSession() {
    const cookies = new Cookies()

    const session_id = cookies.get("session_id");


    const setSessionId = (value: any) => {
        cookies.set("session_id", value,)
    }

    const resetSessionId = () => {
        cookies.remove("session_id")
        // cookies.set("session_id", undefined)
    }

    return {
        session_id,
        setSessionId,
        resetSessionId,
    };
}