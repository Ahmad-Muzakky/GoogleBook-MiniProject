import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import ReactStars from "react-rating-stars-component";

export default function BookCard() {
  const [ourProd, setOurProd] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductAPI = async () => {
    setLoading(true);
    try {
      apiClient.get(`/volumes?q=spring`).then((res) => {
        setOurProd(res.data.items);
        setLoading(false);
      });
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductAPI();
    console.log(ourProd);
  }, []);

  const dataProduk = ourProd.map((items) => (
    <div className="border-2 rounded-t-lg">
      <div className="flex flex-col justify-between h-full">
        <img
          className="object-fill w-full rounded-t-md"
          src={items.volumeInfo.imageLinks.smallThumbnail}
        />
        <div className="flex flex-col justify-between px-3">
          <h3 className="text-xl font-semibold my-4  text-darkBlue">
            {items.volumeInfo.title}
          </h3>
          <div className="text-xl font-bold mb-4">
            {items.volumeInfo.authors}
          </div>
          <ReactStars size={50}/>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-6 gap-5 justify between"></div>
      ) : (
        <div className="grid grid-cols-6 gap-5 justify between">
          {dataProduk}
        </div>
      )}
    </>
  );
}
