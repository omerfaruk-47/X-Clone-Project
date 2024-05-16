import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setİsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      //eğer kaydolma modundaysa
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınız Oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error(err.message));
    } else {
      //eğer giriş yapma modundaysa
      signInWithEmailAndPassword(auth, pass, email)
        .then(() => {
          toast.info("Hesabınıza Giriş Yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message);
          setIsError(true);
        });
    }
  };

  //şifre sıfırlama maili göndermek
  const sendEmail = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Şifre sıfırlama bağlantısı gönderildi!");
    });
  };

  //Google ile gir

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      toast.success("Hesabınıza giriş yapıldı");
      navigate("/home");
    });
  };

  return (
    <section className="h-screen grid place-items-center ">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="x" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter 'a Giriş Yap</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="google" />
          <span className="text-black whitespace-nowrap">
            Google ile Giriş Yap
          </span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow[gray]"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow[gray]"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p onClick={() => setİsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>

        {!isSignUp && isError && (
          <button
            onClick={sendEmail}
            className="text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi unuttunuz?
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
