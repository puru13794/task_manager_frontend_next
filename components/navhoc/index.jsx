import styles from "./styles.module.scss";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const navhoc = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    auth.logout();
    router.push("/login");
  };
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Image
              width={30}
              height={30}
              src="/taskmanager.png"
              alt="task maker logo"
            />
          </li>
          <li className={styles.navItem} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default navhoc;
