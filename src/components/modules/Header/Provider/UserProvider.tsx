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

  useEffect(() => {
    const fetchToken = async () => {
      const isTokened = await getTokenHandler();
      setToken(isTokened);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (typeof tokenState === "boolean" && !tokenState && user) {
      logout();
    } else if (tokenState && !user) {
      refetch();
    }
  }, [tokenState, user]);

  useEffect(() => {
    refetch();
  }, [pathName]);

  return <HeaderUICompnent pathName={pathName} user={user} logout={logout} />;
}
