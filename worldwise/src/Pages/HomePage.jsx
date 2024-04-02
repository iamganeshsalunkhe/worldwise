import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import {NavLink} from "react-router-dom";

export default function HomePage() {
return (
    <main className={styles.homepage}>
      <PageNav/>
      <section>
        
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <NavLink to="/App" className='cta'>Start Tracking Now</NavLink>
        
      </section>
    </main>
  );
}