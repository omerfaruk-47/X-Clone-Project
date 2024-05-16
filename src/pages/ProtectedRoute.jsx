import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  //kullanıcı yetkisi var mı? statei
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    //onAuthStateChanged > kullanıcı oturum değişimini izler(açma - kapama)
    const unsub = onAuthStateChanged(auth, (user) => {
      //Eğer oturum açtıysa yetkiyi true kapattıysa false çek
      setIsAuth(user ? true : false);
    });

    return () => unsub();
  }, []);

  // Eğer yetkisi yoksa logine yönlendir
  if (isAuth === false) {
    // useNavigate kullanınca bileşen tam yüklenemeden yönlendirme yapmamızdan kaynakalı react uyarı veriyordu bizde useNavigate yerine Navigate bileşeni kullandık. Bunu kullanınca browser router bileşenin yüklenem işlemini tamamlmış gibi algılıyor ve "to" propu olarak tanımladığımız sayfaya yönlendiriyor
    return <Navigate to={"/"} />;
  }

  //Kapsayıcı bir routeden alt route çağırma
  return <Outlet />;
};

export default ProtectedRoute;
