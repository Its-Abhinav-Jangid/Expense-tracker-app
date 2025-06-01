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
        href={"/"}
        className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
      >
        <FaHome className={styles.navIcon} />
        <span className={styles.navText}>Home</span>
      </Link>

      <Link
        href={"/stats"}
        className={`${styles.navItem} ${
          pathname === "/stats" ? styles.active : ""
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
        href={"/history"}
        className={`${styles.navItem} ${
          pathname === "/history" ? styles.active : ""
        }`}
      >
        <FaHistory className={styles.navIcon} />
        <span className={styles.navText}>History</span>
      </Link>
      <Link
        href={"/more"}
        className={`${styles.navItem} ${
          pathname === "/more" ? styles.active : ""
        }`}
      >
        <FaEllipsisV className={styles.navIcon} />
        <span className={styles.navText}>More</span>
      </Link>
    </nav>
  );
}

export default NavBar;
