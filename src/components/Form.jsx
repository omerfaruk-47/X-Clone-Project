import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  //Tweetler kolleksiyonun referansını
  const tweetsCol = collection(db, "tweets");

  //dosya resim ise , resmi storage yükle ve resmin url sini fonksiyonun çağrıldığı yere döndürür
  const uploadImage = async (file) => {
    //1) dosya resim değilse fonksiyonu durdur
    if (!file || !file.type || !file.type.startsWith("image")) return null;

    //2)dosyanın yükleneceği konumun referansını alma
    const fileRef = ref(storage, v4() + file.name);

    //3) referansını oluşturduğumuz konuma dosya yükle
    await uploadBytes(fileRef, file);

    //4)yüklenen dosyanın url sine eriş ve döndür
    return await getDownloadURL(fileRef);
  };

  //Form gönderildiğinde
  const hanleSubmit = async (e) => {
    e.preventDefault();

    //1)inputlardakki verilere erişmek
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //2) yazı ve resim içeriği yoksa uyarı ver
    if (!textContent && !imageContent) {
      return toast.info("Lütfen içerik giriniz");
    }

    //yüklenme state true çek
    setIsLoading(true);

    try {
      // 3)resmi storage yükle
      const url = await uploadImage(imageContent);

      //4) Yeni tweet dökümanını kolleksiyona ekle
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
    }

    //yüklenme state ini false çek
    setIsLoading(false);

    //5)formu temizle
    e.target.reset();
  };

  return (
    <form onSubmit={hanleSubmit} className="border-b border-zinc-600 p-4">
      <img
        className="rounded-full h-[35px] md:h-[45px ] mt-1"
        src={user?.photoURL}
        alt={user?.displayName}
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image" type="file" />

          <button
            type="submit"
            className="bg-blue-600  flex items-center justify-center px-4 py-2 min-w-[85px ] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? (
              <>
                <Loader styles={`!text-white`} />
                <span className="text-[10px] ms-2">Loading</span>
              </>
            ) : (
              "Tweetle"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
