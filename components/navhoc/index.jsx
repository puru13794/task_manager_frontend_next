import styles from "./styles.module.scss";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const navhoc = ({ children }) => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/profile">Profile</Link>
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
