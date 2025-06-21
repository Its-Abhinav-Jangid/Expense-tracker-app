"use client";

import { FaHome, FaChartLine, FaEllipsisV, FaHistory } from "react-icons/fa";

import styles from "./NavBar.module.css";
import { AddButton } from "../AddButton/AddButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navBar}>
      <Link
        href={"/app"}
        className={`${styles.navItem} ${
          pathname === "/app" ? styles.active : ""
        }`}
      >
        <FaHome className={styles.navIcon} />
        <span className={styles.navText}>Home</span>
      </Link>

      <Link
        href={"/app/stats"}
        className={`${styles.navItem} ${
          pathname === "/app/stats" ? styles.active : ""
        }`}
      >
        <FaChartLine className={styles.navIcon} />
        <span className={styles.navText}>Stats</span>
      </Link>

      <div className={styles.centerItem}>
        <div className={styles.addButtonWrapper}>
          <AddButton />
        </div>
      </div>
      <Link
        href={"/app/history"}
        className={`${styles.navItem} ${
          pathname === "/app/history" ? styles.active : ""
        }`}
      >
        <FaHistory className={styles.navIcon} />
        <span className={styles.navText}>History</span>
      </Link>
      <Link
        href={"/app/more"}
        className={`${styles.navItem} ${
          pathname === "/app/more" ? styles.active : ""
        }`}
      >
        <FaEllipsisV className={styles.navIcon} />
        <span className={styles.navText}>More</span>
      </Link>
    </nav>
  );
}

export default NavBar;
