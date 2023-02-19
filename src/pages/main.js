import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

function Main() {
    const [search,setSearch] = useState("");
    const[ourProd, setOurProd] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProductAPI = async (search) => {
      setLoading(true);
      try {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}`
          )
          .then((res) => {
            setOurProd(res.data.items);
            setLoading(false);
          });
      } catch (error) {
        console.log("error");
        setLoading(false);
      }
    };

    const addToWishlist = async (title, author, link) => {
      try {
        const data= {
            title: title,
            author: author,
            link: link,
          }
        await apiClient.post(`/`,data)
        .then((res)=>{
            console.log(res);
        })
        alert(`Buku ${title} berhasil ditambah ke Wishlist!`);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
    }, []);

    const searchBook=(evt)=>{
        if(evt.key==="Enter"){
            getProductAPI(search);
        }
    }

    const dataProduk = ourProd.map((items) => (
      <div className="border-2 rounded-t-lg">
        <div className="flex flex-col justify-between h-full">
          <img
            className="object-fill w-full rounded-t-md"
            src={items.volumeInfo.imageLinks.thumbnail}
          />
          <div className="flex flex-col justify-between px-3">
            <h3 className="text-xl font-semibold my-4  text-darkBlue">
              {items.volumeInfo.title}
            </h3>
            <div>By</div>
            <div className="text-xl mb-4 text-blue-700">
              {items.volumeInfo.authors}
            </div>
            <div className="flex justify-between">
              <ReactStars size={35} />
              <button
                onClick={()=>{
                    addToWishlist(
                      items.volumeInfo.title,
                      items.volumeInfo.authors,
                      items.volumeInfo.infoLink
                    );
                }}
                className="border border-4 m-4 p-2 rounded-lg font-semibold border-blue-300 bg-blue-500 text-white"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <>
        <div className="w-full h-auto">
          <div className="container">
            <div className="flex justify-center ">
              <img
                src="https://9to5google.com/wp-content/uploads/sites/4/2015/10/google-books.png"
                className="w-1/3"
              />
            </div>
            <div className="text-4xl font-bold text-center text-blue-600">
              Find Your Book!
            </div>
            <div className="flex justify-center my-5">
              <input
                type="text"
                placeholder="Enter Your Book Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={searchBook}
                className="border border-gray-400 border-2 rounded-4xl text-center"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-auto">
          <div className="container">
            {loading ? (
              <div className=""></div>
            ) : (
              <div className="grid grid-cols-3 gap-5 justify between">
                {dataProduk}
              </div>
            )}
          </div>
        </div>
      </>
    );
    
}
export default Main;