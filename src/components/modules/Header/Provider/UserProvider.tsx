"use client";
import { useEffect, useState } from "react";
import useLogoutHook from "@/apis/login/logout/useLogoutHook";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import { getTokenHandler } from "@/apis/common/getTokenHandler";
import HeaderUICompnent from "../UI/component";

type propsType = {
  pathName: string;
};
export default function UserProvider({ pathName }: propsType) {
  const [tokenState, setToken] = useState<boolean | null>(null);
  const { data: user, refetch } = useUserQueryHook();
  const { mutate: logout } = useLogoutHook();

  const fetchToken = async () => {
    const isTokened = await getTokenHandler();
    setToken(isTokened);
  };

  useEffect(() => {
    if ((tokenState && !user) || !user) {
      refetch();
    } else {
      fetchToken();
    }
  }, [tokenState, user, pathName]);

  useEffect(() => {
    if (typeof tokenState === "boolean" && !tokenState && user) {
      logout();
    }
  }, [tokenState, user]);
  return <HeaderUICompnent pathName={pathName} user={user} logout={logout} />;
}
