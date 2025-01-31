import { apiUrl } from "@/static/common";
import ClientComponent from "./Client";

export default async function NicknameServerComponent() {
  try {
    const response = await fetch(`${apiUrl}/api/auth`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const { data } = await response.json();
    return <ClientComponent nicknameData={data} />;
  } catch (error) {
    return <ClientComponent nicknameData={[]} />;
  }
}
