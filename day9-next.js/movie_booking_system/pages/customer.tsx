import { useEffect, useState } from "react";

const User = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        // if (!response.ok) {
        //   throw new Error("Network response was not ok " + response.statusText);
        // }
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css"
        rel="stylesheet"
      />
      <h1>Customer_detail</h1>
      <div className="bg-black-300 w-500 border-green-500 border-4 p-12 m-5">
        {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : null}
      </div>
    </>
  );
};

export default User;
